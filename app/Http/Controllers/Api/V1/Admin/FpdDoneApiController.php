<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFpdRequest;
use App\Http\Requests\UpdateFpdRequest;
use App\Http\Resources\Admin\FpdDoneResource;
use App\Models\Bu;
use App\Models\Dept;
use App\Models\Site;
use App\Models\Fpd;
use App\Models\FpdItem;
use App\Models\Account;
use App\Models\StatusHistory;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Carbon\Carbon;

class FpdDoneApiController extends Controller
{
    public function index()
    {

        return new FpdDoneResource(Fpd::with(['bu', 'dept', 'user'])->advancedFilter()->whereIn('dept_id', auth()->user()->depts->pluck('id'))->where('status', '>=', '9')->paginate(request('limit', 10)));
    }

    public function show(Fpd $fpd)
    {

        return new FpdDoneResource($fpd->load(['items', 'bu', 'dept', 'user', 'statusHistories']));
    }

    public function destroy(Fpd $fpd)
    {
        // Delete associated media items in the 'fpd_lampiran' collection
        $fpd->getMedia('fpd_lampiran')->each(function ($media) {
            $media->delete();
        });

        // Delete associated media items in the 'fpd_bukti_transfer' collection
        $fpd->getMedia('fpd_bukti_transfer')->each(function ($media) {
            $media->delete();
        });

        $fpd->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

}