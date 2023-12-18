<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CashInProjectionResource;
use App\Models\CashInProjection;
use App\Models\Bu;
use App\Models\Dept;
use App\Models\CashIn;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Support\CashInType;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CashInProjectionApiController extends Controller
{
    public function index(Request $request)
    {
        // Gate
        $startDate = $request->startDate ? Carbon::parse(trim($request->startDate, '"'))->format('Y-m-d') : null;
        $endDate = $request->endDate ? Carbon::parse(trim($request->endDate, '"'))->format('Y-m-d') : null;

        // $data = CashInProjection::where('bu_id', $request->id)->getSummedProjectionAmountByType($startDate, $endDate)->with('bu')->paginate(request('limit', 10));
        // $data->getCollection()->transform(function ($item) use ($startDate, $endDate) {
        //     $item->total_projection_amount = number_format($item->total_projection_amount, 0, ',', '.');
        //     return $item;
        // });
        $actualAmounts = CashIn::where('bu_id', $request->id)
                ->getSummedActualAmountByType($startDate, $endDate);


        $data = CashInProjection::where('bu_id', $request->id)
                ->getSummedProjectionAmountByType($startDate, $endDate)
                ->with('bu')
                ->paginate(request('limit', 10));

        $data->getCollection()->transform(function ($item) use ($actualAmounts) {
            $item->percentage = $item->total_projection_amount == 0 ? 0 : number_format($item->total_cash_in_actual / $item->total_projection_amount * 100, 2, ',','.') . ' %' ;
            $item->total_projection_amount = number_format($item->total_projection_amount, 0, ',', '.');
            $item->total_cash_in_actual = isset($actualAmounts[$item->cash_in_type]) 
                ? number_format($actualAmounts[$item->cash_in_type], 0, ',','.')
                : 0;
            return $item;
        });

        return new CashInProjectionResource($data);
    }

    public function store(Request $request)
    {
        $cash_in_projection = null;

        DB::transaction(function () use ($request) {
            foreach ($request['items'] as $item) {
                $cash_in_projection = CashInProjection::create([
                    'bu_id' => $request['bu_id'],
                    'cash_in_type' => $item['cash_in_type'],
                    'date' => $item['date'],
                    'projection_amount' => $item['projection_amount'],
                ]);
            }
        });

        return (new CashInProjectionResource($cash_in_projection))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create(Request $request)
    {

        return response([
            'meta' => [
                'bu' => Bu::where('id', $request->bu_id)->get(['id', 'code', 'name']),
                'type' => CashInType::CASH_IN_TYPE_SELECT,
            ],
        ]);
    }

    public function show(CashInProjection $cashInProjection)
    {
        return new CashInProjectionResource($cashInProjection);
    }

    public function update(Request $request, CashInProjection $cashInProjection)
    {
        $cashInProjection->update($request->all());

        return (new CashInProjectionResource($cashInProjection))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(CashInProjection $cashInProjection)
    {
        return response([
            'data' => new CashInProjectionResource($cashInProjection),
            'meta' => [
                'bu' => Bu::get(['id', 'name']),
                'type' => CashInType::CASH_IN_TYPE_SELECT,
            ],
        ]);
    }

    public function destroy(CashInProjection $cashInProjection)
    {
        $cashInProjection->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}