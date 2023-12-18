<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CashOutProjectionResource;
use App\Http\Requests\StoreCashOutProjectionRequest;
use App\Models\CashOutProjection;
use App\Models\CashIn;
use App\Models\Bu;
use App\Models\FpdItem;
use App\Models\Dept;
use App\Models\Account;
use App\Models\AdditionalLimit;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CashOutProjectionApiController extends Controller
{
    public function index(Request $request)
    {
        
        $startDate = $request->startDate ? Carbon::parse(trim($request->startDate, '"'))->format('Y-m-d') : null;
        $endDate = $request->endDate ? Carbon::parse(trim($request->endDate, '"'))->format('Y-m-d') : null;

        $data = CashOutProjection::where('bu_id', $request->id)->getSummedProjectionAmountByCoa($startDate, $endDate)->with('dept')->paginate(request('limit', 10));
        $data->getCollection()->transform(function ($item) use ($startDate, $endDate) {
            $item->percentage = $item->total_projection_amount != 0 && $item->total_projection_amount != null ? 
                    number_format($item->coa->getTotalCashOutActual($startDate, $endDate) * 100 / $item->total_projection_amount, 2,',','.') . '%' : '-';
            $item->total_anggaran_after_adjustment = ' - ' .number_format( $item->coa->getTotalAmountSourceAdjustment($startDate, $endDate), 0,',','.') .  ' + ' .
                    number_format($item->coa->getTotalAmountDestinationAdjustmentPeriod($startDate, $endDate), 0,',','.') . ' + ' . 
                    number_format($item->coa->getTotalAmountDestinationAdjustmentCoa($startDate, $endDate), 0,',','.');
            $item->total_projection_amount = number_format($item->total_projection_amount, 0, ',', '.');
            $item->total_cash_out_actual = number_format($item->coa->getTotalCashOutActual($startDate, $endDate), 0, ',', '.');
            return $item;
        });

        // // Material Cost
        // $mc = $this->materialCost($request->id, $startDate, $endDate);

        // // Labour Cost
        // $lc = $this->laborCost($request->id, $startDate, $endDate);

        // // Merge

        // if($mc->total_projection_amount !== 0 && $mc->total_cash_out_actual !== 0)
        // {
        //     $data->push($mc);
        // }
        // if($lc->total_projection_amount !== 0 && $lc->total_cash_out_actual !== 0)
        // {
        //     $data->push($lc);
        // }

        return new CashOutProjectionResource($data);
    }

    public function store(StoreCashOutProjectionRequest $request)
    {
        $cash_out_projection = null;

        DB::transaction(function () use ($request) {
            foreach ($request['items'] as $item) {
                $cash_out_projection = CashOutProjection::create([
                    'bu_id' => $request['bu_id'],
                    'coa_id' => $item['coa_id'],
                    'date' => $item['date'],
                    'projection_amount' => $item['projection_amount'],
                    'dept_id' => $item['dept_id'],
                ]);
            }
        });

        return (new CashOutProjectionResource($cash_out_projection))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create(Request $request)
    {
        return response([
            'meta' => [
                'coa' => Account::where('bu_id', $request->bu_id)->get(['id', 'code', 'name']),
                'bu' => Bu::where('id', $request->bu_id)->get(['id', 'code', 'name']),
                'dept' => Dept::where('bu_id', $request->bu_id)->get(['id', 'code', 'name']),
            ],
        ]);
    }

    // Not Done

    public function show(CashOutProjection $cash_out_projection)
    {
        return new CashOutProjectionResource($cash_out_projection);
    }

    public function update(Request $request, CashOutProjection $cash_out_projection)
    {
        $cash_out_projection->update($request->all());

        return (new CashOutProjectionResource($cash_out_projection))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(CashOutProjection $cash_out_projection)
    {
        return response([
            'data' => new CashOutProjectionResource($cash_out_projection),
            'meta' => [
                'bu' => Bu::get(['id', 'name']),
            ],
        ]);
    }

    public function destroy(CashOutProjection $cash_out_projection)
    {
        $cash_out_projection->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    protected function materialCost($buId, $startDate, $endDate)
    {
        $mc = new CashOutProjection();
        $mc->total_projection_amount = CashIn::where('bu_id', $buId)->where('transaction_type',1)->when($startDate && $endDate, function ($q) use ($startDate, $endDate) {
            $q->whereBetween('date', [$startDate, $endDate]);
        })->get()->sum('mc_amount');
        $mc->coa = ['name' => 'Material Cost', 'code' => 'MC'];
        $mc->dept = ['code' => '-'];
        $mc->total_cash_out_actual = FpdItem::whereHas('fpd', function($q) use($buId, $startDate, $endDate) {
            $q->where('klasifikasi', 'COGS-MC')->where('bu_id', $buId)->when($startDate && $endDate, function ($qz) use ($startDate, $endDate) {
                $qz->whereBetween('processed_date', [$startDate, $endDate]);
            });
        })->sum('real_amount');
        $mc->percentage = $mc->total_projection_amount !== 0 ? number_format($mc->total_cash_out_actual / $mc->total_projection_amount * 100, 2,',','.') . '%'  : 0;
        $mc->total_anggaran_after_adjustment = '-';
        $mc->total_projection_amount = number_format($mc->total_projection_amount,0,',','.');
        $mc->total_cash_out_actual = number_format($mc->total_cash_out_actual,0,',','.');

        return $mc;
    }

    protected function laborCost($buId, $startDate, $endDate)
    {
        $lc = new CashOutProjection();
        $lc->total_projection_amount = CashIn::where('bu_id', $buId)->where('transaction_type',1)->when($startDate && $endDate, function ($q) use ($startDate, $endDate) {
            $q->whereBetween('date', [$startDate, $endDate]);
        })->get()->sum('lc_amount');
        $lc->coa = ['name' => 'Labor Cost', 'code' => 'LC'];
        $lc->dept = ['code' => '-'];
        $lc->total_cash_out_actual = FpdItem::whereHas('fpd', function($q) use($buId, $startDate, $endDate) {
            $q->where('klasifikasi', 'COGS-LC')->where('bu_id', $buId)->when($startDate && $endDate, function ($q) use ($startDate, $endDate) {
                $q->whereBetween('processed_date', [$startDate, $endDate]);
            });
        })->sum('real_amount');
        $lc->percentage = $lc->total_projection_amount !== 0 ? 
                    number_format($lc->total_cash_out_actual / $lc->total_projection_amount * 100, 2,',','.') . '%' : 0;
        $lc->total_anggaran_after_adjustment = '-';
        $lc->total_projection_amount = number_format($lc->total_projection_amount,0,',','.');
        $lc->total_cash_out_actual = number_format($lc->total_cash_out_actual,0,',','.');

        return $lc;
    }

    protected function additional($buId, $startDate, $endDate)
    {
        $additional = new CashOutProjection();
        $additional->coa = ['name' => 'Additional', 'code' => 'Add'];
        $additional->dept = ['code' => '-'];
        $additional->total_projection_amount = 0;
        $additional->total_cash_out_actual = AdditionalLimit::where('status', 9)->when($startDate && $endDate, function ($q) use ($startDate, $endDate) {
            $q->whereBetween('date', [$startDate, $endDate]);
        })->whereHas('coa', function($q) use($buId) {
            $q->where('bu_id', $buId);
        })->sum('amount');
        $additional->total_cash_out_actual = number_format($additional->total_cash_out_actual, 0, ',', '.');
        $additional->total_anggaran_after_adjustment = '-';
        $additional->percentage = '0%';

        return $additional;
    }
}