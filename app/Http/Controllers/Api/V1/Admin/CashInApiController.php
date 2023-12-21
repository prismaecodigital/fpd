<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CashInResource;
use App\Http\Requests\StoreCashInRequest;
use App\Models\CashIn;
use App\Models\CashOutProjection;
use App\Support\CashInType;
use App\Models\Bu;
use App\Models\Dept;
use App\Models\Account;
use App\Models\Partner;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CashInApiController extends Controller
{
    public function index(Request $request)
    {
        // Gate
        $buCode = Bu::where('id', $request->id)->first()->code;
        abort_if(Gate::denies($buCode.'-cash_in_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $startDate = $request->startDate ? Carbon::createFromFormat('d-m-Y', $request->startDate)->startOfDay() : null;
        $endDate = $request->endDate ? Carbon::createFromFormat('d-m-Y', $request->endDate)->endOfDay() : null;
        $data = new CashInResource(CashIn::with(['bu', 'cash_in_items', 'partner'])->advancedFilter()
            ->where('bu_id', $request->id)
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                $query->whereBetween('date', [$startDate, $endDate]);
            })->paginate(request('limit', 10)));

        $data->getCollection()->transform(function ($item) {
    
            $item->amount = number_format($item->amount, 0, ',', '.');
            return $item;
        });

        return $data;
    }

    public function store(Request $request)
    {
        $cashIn = null;

        DB::transaction(function () use ($request) {
            $cashIn = CashIn::create($request->all());
            if($cashIn->transaction_type == 1) {
                $coa_mc = Account::firstOrCreate(
                    ['code' => $cashIn->bu->code . '-COGS-MC', 'bu_id' => $cashIn->bu_id],
                    ['name' => 'COGS-Material-Cost', 'projection_lock' => true]
                    
                );
                if ($coa_mc->depts->isEmpty()) {
                    $deptIds = Dept::where('bu_id', $cashIn->bu_id)->pluck('id');
                    $coa_mc->depts()->sync($deptIds);
                }
                $coa_lc = Account::firstOrCreate(
                    ['code' => $cashIn->bu->code . '-COGS-LC', 'bu_id' => $cashIn->bu_id],
                    ['name' => 'COGS-Labor-Cost', 'projection_lock' => true]
                );
                if ($coa_lc->depts->isEmpty()) {
                    $deptIds = Dept::where('bu_id', $cashIn->bu_id)->pluck('id');
                    $coa_lc->depts()->sync($deptIds);
                }
                $projection_mc = CashOutProjection::create([
                        'date'              => $cashIn->date,
                        'projection_amount' => ($cashIn->mc_percentage ?? 0) * $cashIn->amount / 100 ,
                        'coa_id'            => $coa_mc->id,
                        'bu_id'             => $cashIn->bu_id,
                        'cash_in_id'        => $cashIn->id,
                        'dept_id'           => $cashIn->bu->depts->first()->id
                    ]);
                $projection_lc = CashOutProjection::create([
                        'date'              => $cashIn->date,
                        'projection_amount' => ($cashIn->lc_percentage ?? 0) * $cashIn->amount / 100 ,
                        'coa_id'            => $coa_lc->id,
                        'bu_id'             => $cashIn->bu_id,
                        'cash_in_id'        => $cashIn->id,
                        'dept_id'           => $cashIn->bu->depts->first()->id
                    ]);
            }
        });

        return (new CashInResource($cashIn))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create(Request $request)
    {
        $buCode = Bu::where('id', $request->bu_id)->first()->code;
        abort_if(Gate::denies($buCode.'-cash_in_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        return response([
            'meta' => [
                'bu' => Bu::where('id', $request->bu_id)->get(['id', 'name']),
                'partner' => Partner::where('bu_id', $request->bu_id)->get(['id', 'name', 'type']),
                'transaction_type' => CashIn::TRANSACTION_TYPE_SELECT,
                'cash_in_type' => CashInType::CASH_IN_TYPE_SELECT,
            ],
        ]);
    }

    public function show(CashIn $cashIn)
    {
        return new CashInResource($cashIn);
    }

    public function update(Request $request, CashIn $cashIn)
    {

        DB::transaction(function () use ($request, $cashIn) {
            $cashIn->update($request->all());
            $itemIds = collect($request->cash_in_items)->pluck('id')->filter()->all();
            // Delete items that are not in the request
            $cashIn->cash_in_items()->whereNotIn('id', $itemIds)->delete();
            foreach ($request->cash_in_items ?? [] as $itemData) {
                if (isset($itemData['id']) && $itemData['id'] != null) {
                    // Update existing item
                    $cashIn->cash_in_items()->find($itemData['id'])->update($itemData);
                } else {
                    // Create new item
                    $cashIn->cash_in_items()->create($itemData);
                }
            }

            if($cashIn->transaction_type == 1) {
                $projection_mc = CashOutProjection::where('bu_id',$request->bu_id)->where('cash_in_id',$cashIn->id)
                    ->whereHas('coa', function($q) use($cashIn) {
                        $q->where('code',$cashIn->bu->code. '-COGS-MC');
                    })->first();
                $projection_lc = CashOutProjection::where('bu_id',$request->bu_id)->where('cash_in_id',$cashIn->id)
                    ->whereHas('coa', function($q) use($cashIn) {
                        $q->where('code',$cashIn->bu->code. '-COGS-LC');
                    })->first();
                $projection_mc = $projection_mc->update([
                        'date'              => $cashIn->date,
                        'projection_amount' => ($cashIn->mc_percentage ?? 0) * $cashIn->amount / 100 ,
                    ]);
                $projection_lc = $projection_lc->update([
                        'date'              => $cashIn->date,
                        'projection_amount' => ($cashIn->lc_percentage ?? 0) * $cashIn->amount / 100 ,
                    ]);
            }
        });

        return (new CashInResource($cashIn))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(CashIn $cashIn)
    {
        abort_if(Gate::denies('cash_in_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new CashInResource($cashIn->load('cash_in_items')),
            'meta' => [
                'bu' => Bu::get(['id', 'name']),
                'partner' => Partner::where('bu_id', $cashIn->bu_id)->get(['id', 'name','type']),
                'transaction_type' => CashIn::TRANSACTION_TYPE_SELECT,
                'cash_in_type' => CashInType::CASH_IN_TYPE_SELECT,
            ],
        ]);
    }

    public function destroy(CashIn $cashIn)
    {
        abort_if(Gate::denies('cash_in_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        DB::transaction(function () use ($cashIn) {
            if($cashIn->transaction_type == 1) {
                $coa_mc = CashOutProjection::where('bu_id',$cashIn->bu_id)->where('cash_in_id', $cashIn->id)
                    ->whereHas('coa', function($q) use($cashIn) {
                        $q->where('code',$cashIn->bu->code. '-COGS-MC');
                    })->first();
                $coa_lc = CashOutProjection::where('bu_id',$cashIn->bu_id)->where('cash_in_id', $cashIn->id)
                    ->whereHas('coa', function($q) use($cashIn) {
                        $q->where('code',$cashIn->bu->code. '-COGS-LC');
                    })->first();
                    
                $coa_mc->delete();
                $coa_lc->delete();
            }
            
                $cashIn->delete();
        });

        return response(null, Response::HTTP_NO_CONTENT);
    }
}