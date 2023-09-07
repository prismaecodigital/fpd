<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFpdItemRequest;
use App\Http\Requests\UpdateFpdItemRequest;
use App\Http\Resources\Admin\FpdItemResource;
use App\Models\FpdItem;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FpdItemApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('fpd_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new FpdItemResource(FpdItem::advancedFilter()->paginate(request('limit', 10)));
    }

    public function store(StoreFpdItemRequest $request)
    {
        $item = FpdItem::create($request->validated());

        return (new FpdItemResource($item))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        abort_if(Gate::denies('fpd_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [],
        ]);
    }

    public function show(FpdItem $item)
    {
        abort_if(Gate::denies('fpd_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new FpdItemResource($item);
    }

    public function update(UpdateFpdItemRequest $request, FpdItem $item)
    {
        $item->update($request->validated());

        return (new FpdItemResource($item))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(FpdItem $item)
    {
        abort_if(Gate::denies('fpd_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new FpdItemResource($item),
            'meta' => [],
        ]);
    }

    public function destroy(FpdItem $item)
    {
        abort_if(Gate::denies('fpd_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $item->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}