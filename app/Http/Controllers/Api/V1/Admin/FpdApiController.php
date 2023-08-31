<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFpdRequest;
use App\Http\Requests\UpdateFpdRequest;
use App\Http\Resources\Admin\FpdResource;
use App\Models\Bu;
use App\Models\Dept;
use App\Models\Fpd;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class FpdApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('fpd_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new FpdResource(Fpd::with(['bu', 'dept', 'user'])->advancedFilter());
    }

    public function store(StoreFpdRequest $request)
    {
        $fpd = Fpd::create($request->validated());

        if ($media = $request->input('lampiran', [])) {
            Media::whereIn('id', data_get($media, '*.id'))
                ->where('model_id', 0)
                ->update(['model_id' => $fpd->id]);
        }

        return (new FpdResource($fpd))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        abort_if(Gate::denies('fpd_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [
                'bu'            => Bu::get(['id', 'name']),
                'dept'          => Dept::get(['id', 'name']),
                'transact_type' => Fpd::TRANSACT_TYPE_SELECT,
                'status'        => Fpd::STATUS_SELECT,
                'klasifikasi'   => Fpd::KLASIFIKASI_SELECT,
            ],
        ]);
    }

    public function show(Fpd $fpd)
    {
        abort_if(Gate::denies('fpd_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new FpdResource($fpd->load(['bu', 'dept', 'user']));
    }

    public function update(UpdateFpdRequest $request, Fpd $fpd)
    {
        $fpd->update($request->validated());

        $fpd->updateMedia($request->input('lampiran', []), 'fpd_lampiran');

        return (new FpdResource($fpd))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Fpd $fpd)
    {
        abort_if(Gate::denies('fpd_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new FpdResource($fpd->load(['bu', 'dept'])),
            'meta' => [
                'bu'            => Bu::get(['id', 'name']),
                'dept'          => Dept::get(['id', 'name']),
                'transact_type' => Fpd::TRANSACT_TYPE_SELECT,
                'status'        => Fpd::STATUS_SELECT,
                'klasifikasi'   => Fpd::KLASIFIKASI_SELECT,
            ],
        ]);
    }

    public function destroy(Fpd $fpd)
    {
        abort_if(Gate::denies('fpd_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $fpd->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function storeMedia(Request $request)
    {
        abort_if(Gate::none(['fpd_create', 'fpd_edit']), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->has('size')) {
            $this->validate($request, [
                'file' => 'max:' . $request->input('size') * 1024,
            ]);
        }

        $model         = new Fpd();
        $model->id     = $request->input('model_id', 0);
        $model->exists = true;
        $media         = $model->addMediaFromRequest('file')->toMediaCollection($request->input('collection_name'));

        return response()->json($media, Response::HTTP_CREATED);
    }
}