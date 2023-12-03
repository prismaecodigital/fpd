<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdditionalLimitResource;
use App\Models\AdditionalLimit;
use App\Models\Bu;
use App\Models\Account;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AdditionalLimitApiController extends Controller
{
    public function index(Request $request)
    {

        return new AdditionalLimitResource(
            AdditionalLimit::with('coa')
                           ->whereHas('coa', function($query) use ($request) {
                               $query->where('bu_id', $request->bu_id);
                           })
                           ->advancedFilter()
                           ->paginate(request('limit', 10))
        );
    }

    public function store(Request $request)
    {
        $additionalLimit = AdditionalLimit::create($request->all());

        return (new AdditionalLimitResource($additionalLimit))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create(Request $request)
    {
        abort_if(Gate::denies('bu_dept_site_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [
                'coa' => Account::where('bu_id', $request->bu_id)->get(['id', 'code', 'name']),
            ],
        ]);
    }

    public function show(AdditionalLimit $additionalLimit)
    {
        abort_if(Gate::denies('bu_dept_site_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new AdditionalLimitResource($additionalLimit);
    }

    // Not updated

    public function update(Request $request, AdditionalLimit $additionalLimit)
    {
        $additionalLimit->update($request->all());

        return (new AdditionalLimitResource($additionalLimit))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(AdditionalLimit $additionalLimit)
    {
        abort_if(Gate::denies('bu_dept_site_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new AdditionalLimitResource($additionalLimit),
            'meta' => [
                'coa' => Account::get(['id', 'code' ,'name']),
            ],
        ]);
    }

    public function destroy(AdditionalLimit $additionalLimit)
    {
        abort_if(Gate::denies('bu_dept_site_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $additionalLimit->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}