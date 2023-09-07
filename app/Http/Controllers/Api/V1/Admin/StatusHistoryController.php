<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\StatusHistoryResource;
use App\Models\StatusHistory;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StatusHistoryApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('status_history_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new StatusHistoryResource(StatusHistory::advancedFilter()->paginate(request('limit', 10)));
    }

    public function store(Request $request)
    {
        $statusHistory = StatusHistory::create($request->all());

        return (new StatusHistoryResource($statusHistory))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        abort_if(Gate::denies('status_history_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [],
        ]);
    }

    public function show(StatusHistory $statusHistory)
    {
        abort_if(Gate::denies('status_history_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new StatusHistoryResource($statusHistory);
    }

    public function update(Request $request, StatusHistory $statusHistory)
    {
        $statusHistory->update($request->all());

        return (new StatusHistoryResource($statusHistory))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(StatusHistory $statusHistory)
    {
        abort_if(Gate::denies('status_history_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new StatusHistoryResource($statusHistory),
            'meta' => [],
        ]);
    }

    public function destroy(StatusHistory $statusHistory)
    {
        abort_if(Gate::denies('status_history_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $statusHistory->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}