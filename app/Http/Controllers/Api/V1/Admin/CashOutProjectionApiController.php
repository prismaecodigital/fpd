<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CashOutProjectionResource;
use App\Http\Requests\StoreCashOutProjectionRequest;
use App\Models\CashOutProjection;
use App\Models\Bu;
use App\Models\Dept;
use App\Models\Account;
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
            $item->total_anggaran_after_adjustment = ' - ' . $item->coa->getTotalAmountSourceAdjustment($startDate, $endDate) .  ' + ' .
                    $item->coa->getTotalAmountDestinationAdjustmentPeriod($startDate, $endDate) . ' + ' . $item->coa->getTotalAmountDestinationAdjustmentCoa($startDate, $endDate);
            $item->total_projection_amount = number_format($item->total_projection_amount, 0, ',', '.');
            $item->total_cash_out_actual = number_format($item->coa->getTotalCashOutActual($startDate, $endDate), 0, ',', '.');
            return $item;
        });

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
}