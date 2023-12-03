<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CashInResource;
use App\Http\Requests\StoreCashInRequest;
use App\Models\CashIn;
use App\Support\CashInType;
use App\Models\Bu;
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
        $startDate = $request->startDate ? Carbon::createFromFormat('d-m-Y', $request->startDate)->startOfDay() : null;
        $endDate = $request->endDate ? Carbon::createFromFormat('d-m-Y', $request->endDate)->endOfDay() : null;
        return new CashInResource(CashIn::with(['bu', 'cash_in_items', 'partner'])->advancedFilter()
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                $query->whereBetween('date', [$startDate, $endDate]);
            })->paginate(request('limit', 10)));
    }

    public function store(Request $request)
    {
        $cashIn = null;

        DB::transaction(function () use ($request) {
            $cashIn = CashIn::create($request->all());
        });

        return (new CashInResource($cashIn))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create(Request $request)
    {

        return response([
            'meta' => [
                'bu' => Bu::where('id', $request->bu_id)->get(['id', 'name']),
                'partner' => Partner::get(['id', 'name']),
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
            foreach ($request->cash_in_items as $itemData) {
                if (isset($itemData['id']) && $itemData['id'] != null) {
                    // Update existing item
                    $cashIn->cash_in_items()->find($itemData['id'])->update($itemData);
                } else {
                    // Create new item
                    $cashIn->cash_in_items()->create($itemData);
                }
            }
        });

        return (new CashInResource($cashIn))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(CashIn $cashIn)
    {
        return response([
            'data' => new CashInResource($cashIn->load('cash_in_items')),
            'meta' => [
                'bu' => Bu::get(['id', 'name']),
                'partner' => Partner::get(['id', 'name']),
                'transaction_type' => CashIn::TRANSACTION_TYPE_SELECT,
                'cash_in_type' => CashInType::CASH_IN_TYPE_SELECT,
            ],
        ]);
    }

    public function destroy(CashIn $cashIn)
    {
        $cashIn->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}