<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\DompetResource;
use App\Models\Dompet;
use App\Models\Bu;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DompetApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('bu_dept_site_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new DompetResource(Dompet::with('bu')->advancedFilter()->whereIn('bu_id', auth()->user()->bus->pluck('id'))->paginate(request('limit', 10)));
    }

    public function store(Request $request)
    {
        $dompet = Dompet::create($request->all());

        return (new DompetResource($dompet))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        abort_if(Gate::denies('bu_dept_site_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [
                'bu' => Bu::whereIn('id', auth()->user()->bus->pluck('id'))->get(['id', 'name']),
            ],
        ]);
    }

    public function show(Dompet $dompet)
    {
        abort_if(Gate::denies('bu_dept_site_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new DompetResource($dompet);
    }

    public function update(Request $request, Dompet $dompet)
    {
        $dompet->update($request->validated());

        return (new DompetResource($dompet))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Dompet $dompet)
    {
        abort_if(Gate::denies('bu_dept_site_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new DompetResource($dompet),
            'meta' => [
                'bu' => Bu::whereIn('id', auth()->user()->bus->pluck('bu_id'))->get(['id', 'name']),
            ],
        ]);
    }

    public function destroy(Dompet $dompet)
    {
        abort_if(Gate::denies('bu_dept_site_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $dompet->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }


}