<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdjustmentResource;
use App\Models\Adjustment;
use App\Models\Bu;
use App\Models\Account;
use App\Models\StatusAdjustment;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdjustmentApiController extends Controller
{
    public function index(Request $request)
    {
        $buCode = Bu::where('id', $request->bu_id)->first()->code;
        abort_if(Gate::denies($buCode.'-adjustment_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new AdjustmentResource(Adjustment::with(['sourceCoa', 'destinationCoa'])->advancedFilter()->whereHas('sourceCoa', function($query) use ($request) {
            $query->where('bu_id', $request->bu_id);
            })->where('type', $request->type)->paginate(request('limit', 10)));
    }

    public function store(Request $request)
    {
        $adjustment = null;
        
        DB::transaction(function () use ($request, &$adjustment) {
            $adjustment = Adjustment::create($request->all());
            StatusAdjustment::create(['status' => $adjustment->status, 'adjustment_id' => $adjustment->id, 'user_id' => auth()->user()->id]);
        });

        return (new AdjustmentResource($adjustment))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create(Request $request)
    {
        $buCode = Bu::where('id', $request->bu_id)->first()->code;
        abort_if(Gate::denies($buCode.'-adjustment_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [
                'coa' => Account::where('bu_id', $request->bu_id)->whereHas('depts', function($q) {
                    $q->whereIn('dept_id', auth()->user()->depts->pluck('id'));
                })
                ->get(['id', 'code', 'name']),
            ],
        ]);
    }

    public function show(Adjustment $adjustment)
    {
        abort_if(Gate::denies('adjustment_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new AdjustmentResource($adjustment);
    }

    public function update(Request $request, Adjustment $adjustment)
    {
        DB::transaction(function () use ($request, &$adjustment) {
            $adjustment->update($request->all());
            StatusAdjustment::create(['status' => $adjustment->status, 'adjustment_id' => $adjustment->id, 'user_id' => auth()->user()->id]);
        });

        return (new AdjustmentResource($adjustment))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Adjustment $adjustment)
    {
        abort_if(Gate::denies($adjustment->sourceCoa->bu->code.'-adjustment_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new AdjustmentResource($adjustment->load('sourceCoa')),
            'meta' => [
                'coa' => Account::where('bu_id', $adjustment->sourceCoa->bu_id)->get(['id', 'code', 'name']),
                'type' => Adjustment::TYPE_SELECT,
            ],
        ]);
    }

    public function destroy(Adjustment $adjustment)
    {
        abort_if(Gate::denies('adjustment_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $adjustment->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}