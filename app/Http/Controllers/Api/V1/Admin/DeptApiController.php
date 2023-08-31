<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDeptRequest;
use App\Http\Requests\UpdateDeptRequest;
use App\Http\Resources\Admin\DeptResource;
use App\Models\Dept;
use App\Models\Bu;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeptApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('bu_dept_site_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new DeptResource(Dept::with('bu')->advancedFilter());
    }

    public function store(StoreDeptRequest $request)
    {
        $dept = Dept::create($request->validated());

        return (new DeptResource($dept))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        abort_if(Gate::denies('bu_dept_site_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [
                'bu' => Bu::get(['id', 'name']),
            ],
        ]);
    }

    public function show(Dept $dept)
    {
        abort_if(Gate::denies('bu_dept_site_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new DeptResource($dept);
    }

    public function update(UpdateDeptRequest $request, Dept $dept)
    {
        $dept->update($request->validated());

        return (new DeptResource($dept))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Dept $dept)
    {
        abort_if(Gate::denies('bu_dept_site_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new DeptResource($dept),
            'meta' => [
                'bu' => Bu::get(['id', 'name']),
            ],
        ]);
    }

    public function destroy(Dept $dept)
    {
        abort_if(Gate::denies('bu_dept_site_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $dept->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function budept(Request $request)
    {
        $bus = $request->input('bu');
        if(gettype($bus) == 'array') {
            $depts = Dept::whereIn('bu_id', $bus)->whereIn('id', auth()->user()->dept()->pluck('dept_id'))->get();
        }
        if(gettype($bus) == 'string') {
            $depts = Dept::where('bu_id', $bus)->whereIn('id', auth()->user()->dept()->pluck('dept_id'))->get();
        }
        if(!isset($bus)) {
            $depts = [''=> 'Select BU First'];
        }

        return response()->json($depts);
    }

    public function budeptAll(Request $request)
    {
        $bus = $request->input('bu');
        if(gettype($bus) == 'array') {
            $depts = Dept::whereIn('bu_id', $bus)->get();
        }
        if(gettype($bus) == 'string') {
            $depts = Dept::where('bu_id', $bus)->get();
        }
        if(!isset($bus)) {
            $depts = [''=> 'Select BU First'];
        }

        return response()->json($depts);
    }
}