<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFpdRequest;
use App\Http\Requests\UpdateFpdRequest;
use App\Http\Resources\Admin\FpdResource;
use App\Models\Bu;
use App\Models\Dept;
use App\Models\Site;
use App\Models\Fpd;
use App\Models\FpdItem;
use App\Models\Account;
use App\Models\StatusHistory;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Carbon\Carbon;

class FpdApiController extends Controller
{
    public function list()
    {
        abort_if(Gate::denies('fpd_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new BuResource(Bu::has('fpds')->advancedFilter()->paginate(request('limit', 10)));
        
    }

    public function index(Request $request)
    {
        abort_if(Gate::denies('fpd_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new FpdResource(Fpd::with(['bu', 'dept', 'user'])->advancedFilter()->where('bu_id', $request->id)->whereIn('dept_id', auth()->user()->depts->pluck('id'))->where('status', '<', '8')->paginate(request('limit', 10)));
    }

    public function store(StoreFpdRequest $request)
    {
        // Generate Code and Store FPD
        $dept = Dept::findOrFail($request->dept_id);
        $bu = Bu::findOrFail($request->bu_id);

        $data = $request->only([
            'name',
            'req_date',
            'processed_date',
            'bu_id',
            'dept_id',
            'code_voucher',
            'transact_type',
            'klasifikasi'
        ]);
    
        $data['user_id'] = auth()->user()->id;
        $data['created_at'] = Carbon::now();
        if(auth()->user()->hasRole('leader')) {
            $data['status'] = '1';
        }
        else {
            $data['status'] = '0';
        }
        $data['code'] = $this->generateCode($dept->code, $bu->code, $data['created_at']);
    
        $fpd = Fpd::create($data);

        if ($media = $request->input('lampiran', [])) {
            Media::whereIn('id', data_get($media, '*.id'))
                ->where('model_id', 0)
                ->update(['model_id' => $fpd->id]);
        }

        // Store FPDItem    
        foreach ($request->items as $itemData) {
            $item = FpdItem::create([
                'fpd_id' => $fpd->id,
                'account_id' => $itemData['account_id'],
                'amount' => $itemData['amount'],
                'site_id'   => $itemData['site_id'],
                'ket' => $itemData['ket'] ?? '',
            ]);
        }
        
        // Store StatusHistory
        if(auth()->user()->hasRole('leader')) {
            $statusHistory = StatusHistory::create(
                [
                    'fpd_id'    => $fpd->id,
                    'status'    => (string)((int)$fpd->status-1),
                    'user_id'   => $fpd->user_id,
                ]
            );
        }

        $statusHistory = StatusHistory::create(
            [
                'fpd_id'    => $fpd->id,
                'status'    => $fpd->status,
                'user_id'   => $fpd->user_id,
            ]
        );

        return (new FpdResource($fpd))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create(Request $request)
    {
        abort_if(Gate::denies('fpd_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [
                'bu_id'         => $request->bu_id,
                'bu'            => Bu::whereIn('id', auth()->user()->bus->pluck('id'))->get(['id', 'name']),
                'dept'          => Dept::get(['id', 'name']),
                'transact_type' => Fpd::TRANSACT_TYPE_SELECT,
                'status'        => Fpd::STATUS_SELECT,
                'klasifikasi'   => Fpd::KLASIFIKASI_SELECT,
                'accounts'      => Account::get(['id','name']),
                'site'          => Site::get(['id','name'])
            ],
        ]);
    }

    public function show(Fpd $fpd)
    {
        abort_if(Gate::denies('fpd_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new FpdResource($fpd->load(['items', 'bu', 'dept', 'user', 'statusHistories']));
    }

    public function update(UpdateFpdRequest $request, Fpd $fpd)
    {        // Update FPD
        $fpd->update($request->validated());
        if($media = $request->input('lampiran', [])) {
            $fpd->updateMedia($request->input('lampiran', []), 'fpd_lampiran');
            Media::whereIn('id', data_get($media, '*.id'))
            ->where('model_id', 0)
            ->update(['model_id' => $fpd->id]);
        }
        if($media = $request->input('bukti_transfer', [])) {
            $fpd->updateMedia($request->input('bukti_transfer', []), 'fpd_bukti_transfer');
            Media::whereIn('id', data_get($media, '*.id'))
            ->where('model_id', 0)
            ->update(['model_id' => $fpd->id]);
        }

        // Update Status
        if($request->approve !== null) {
            if($request->approve === "1" && (int)$fpd->status < 8) 
            {
                if(($fpd->status === '0' && auth()->user()->hasRole('direktur')) || 
                    ($fpd->status === '4' && auth()->user()->hasRole('leader')) ||                
                    ($fpd->status === '1' && auth()->user()->hasRole('finance')))
                    {
                        $fpd->update(['status' => (string)((int)$fpd->status + 2)]);
                        $statusHistory0 = StatusHistory::create(
                            [
                                'fpd_id'    => $fpd->id,
                                'status'    => (string)((int)$fpd->status - 1),
                                'user_id'   => auth()->user()->id,
                            ]
                        );
                        $statusHistory1 = StatusHistory::create(
                            [
                                'fpd_id'    => $fpd->id,
                                'status'    => $fpd->status,
                                'user_id'   => auth()->user()->id,
                            ]
                        );
                    }
                else {
                    $fpd->update(['status' => (string)((int)$fpd->status + 1)]);
                    $statusHistory = StatusHistory::create(
                        [
                            'fpd_id'    => $fpd->id,
                            'status'    => $fpd->status,
                            'user_id'   => auth()->user()->id,
                        ]
                    );
                }
            }
            if($request->approve === "0" && (int)$fpd->status < 8) 
            {
                $fpd->update(['status' => '99']);
            }
        }

        // Rename media        
        if($fpd->status >= 3) {
            foreach($fpd->getMedia('fpd_lampiran') as $index => $file) {
                $file->file_name = $fpd->code_voucher.'-'.($index+1).substr($file->file_name, -4);
                $file->save();
            }
            foreach($fpd->getMedia('fpd_bukti_transfer') as $index => $file) {
                $file->file_name = $fpd->code_voucher_lrd.'-'.($index+1).substr($file->file_name, -4);
                $file->save();
            }
        }

        // Delete all FPDItem then create new
        foreach($fpd->items as $item) {
            $item->delete();
        }
        foreach ($request->items as $itemData) {
            $item = FpdItem::create([
                'fpd_id' => $fpd->id,
                'account_id' => $itemData['account_id'],
                'amount' => $itemData['amount'],
                'real_amount' => $itemData['real_amount'],
                'site_id'   => $itemData['site_id'],
                'ket' => $itemData['ket'] ?? '',
            ]);
        }

        // Added if request tidak memerlukan realisasi
        if($request->approve === "2") {
            $fpd->update(['status' => '8']);
            $new_fpd = Fpd::where('id',$fpd->id)->first();
            foreach($new_fpd->items as $item) {
                $itemx = FpdItem::where('id', $item->id)->first();
                $itemx->update(['real_amount' => $item->amount]);
            }

            $statusHistory = StatusHistory::create([
                'fpd_id'    => $fpd->id,
                'user_id'   => auth()->user()->id,
                'status'    => $fpd->status,
            ]);
        }

        return (new FpdResource($fpd))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Fpd $fpd)
    {
        abort_if(Gate::denies('fpd_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new FpdResource($fpd->load(['bu', 'dept', 'items','user', 'statusHistories'])),
            'meta' => [
                'bu'            => Bu::get(['id', 'name']),
                'dept'          => Dept::where('bu_id', $fpd->bu_id)->get(['id', 'name']),
                'transact_type' => Fpd::TRANSACT_TYPE_SELECT,
                'status'        => Fpd::STATUS_SELECT,
                'klasifikasi'   => Fpd::KLASIFIKASI_SELECT,
                'accounts'      => Account::where('bu_id', $fpd->bu_id)->get(['id','name']),
                'site'          => Site::where('bu_id', $fpd->bu_id)->orWhere('name','-')->get(['id','name'])
            ],
        ]);
    }

    public function destroy(Fpd $fpd)
    {
        abort_if(Gate::denies('fpd_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $fpd->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function storeMedia(Request $request)
    {
        abort_if(Gate::none(['fpd_create', 'fpd_edit']), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->has('size')) {
            $this->validate($request, [
                'file' => 'max:' . $request->input('size') * 1024,
            ]);
        }

        $model         = new Fpd();
        $model->id     = $request->input('model_id', 0);
        $model->exists = true;
        $media         = $model->addMediaFromRequest('file')->toMediaCollection($request->input('collection_name'));

        return response()->json($media, Response::HTTP_CREATED);
    }

    // protected function generateCode($deptCode, $buCode, $createdAt)
    // {
    //     $count = Fpd::whereYear('created_at', $createdAt)
    //         ->whereMonth('created_at', $createdAt)
    //         ->count();
    
    //     $number = str_pad($count + 1, 3, "0", STR_PAD_LEFT);
    //     $dateCode = substr($createdAt, 2, 2) . substr($createdAt, 5, 2);
    
    //     return $buCode . $deptCode . $dateCode . $number;
    // }

    protected function generateCode($deptCode, $buId, $createdAt)
    {
        $bu = Bu::where('id', $buId)->first();
        $buCode = $bu->code;
        $dateCode = substr($createdAt, 2, 2) . substr($createdAt, 5, 2);
        
        $fpd = Fpd::whereYear('created_at', $createdAt)
            ->whereMonth('created_at', $createdAt)
            ->where('bu_id', $buId);
        $count = $fpd->count();
        $last = $fpd->last();
        $number = str_pad($count + 1, 3, "0", STR_PAD_LEFT);
        
        if(empty($last)) {
            $number = str_pad($count + 1, 3, "0", STR_PAD_LEFT);
            $new_code = $buCode . $deptCode . $dateCode . $number;
            return $new_code;
        }
        
        $code = $last->code;
        $num = intval(substr($code, -3));
        $number = str_pad($num + 1, 3, "0", STR_PAD_LEFT);
        $new_code = $buCode . $deptCode . $dateCode . $number;
        
        return $new_code;
    }

    public function calendar(Request $request)
    {
        // dd($request->all());
        if(empty($request->bu)) {
            $fpds = Fpd::with(['bu','dept','user','items'])->where('status', '<', '8')->whereIn('bu_id', auth()->user()->bus->pluck('id'))
                    ->whereIn('dept_id', auth()->user()->depts->pluck('id'))->get();
        }
        else {
            $fpds = Fpd::with(['bu','dept','user','items'])->where('status', '<', '8')->where('bu_id', $request->bu)
            ->whereIn('dept_id', auth()->user()->depts->pluck('id'))->get();
        }

        return response([
            'data' => new FpdResource($fpds),
            'meta' => [
                'bu'            => Bu::whereIn('id', auth()->user()->bus->pluck('id'))->get(['id', 'name'])->prepend('Semua'),
            ],
        ]);
    }

}