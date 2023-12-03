<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PartnerResource;
use App\Models\Partner;
use App\Models\Bu;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PartnerApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('bu_dept_site_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new PartnerResource(Partner::with('bu')->advancedFilter()->paginate(request('limit', 10)));
    }

    public function store(Request $request)
    {
        $partner = Partner::create($request->all());

        return (new PartnerResource($partner))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        abort_if(Gate::denies('bu_dept_site_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [
                'bu' => Bu::get(['id', 'name']),
                'type' => Partner::TYPE_SELECT,
            ],
        ]);
    }

    public function show(Partner $partner)
    {
        abort_if(Gate::denies('bu_dept_site_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new PartnerResource($partner);
    }

    public function update(Request $request, Partner $partner)
    {
        $partner->update($request->all());

        return (new PartnerResource($partner))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Partner $partner)
    {
        abort_if(Gate::denies('bu_dept_site_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new PartnerResource($partner),
            'meta' => [
                'bu' => Bu::get(['id', 'name']),
                'type' => Partner::TYPE_SELECT,
            ],
        ]);
    }

    public function destroy(Partner $partner)
    {
        abort_if(Gate::denies('bu_dept_site_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $partner->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}