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
        abort_if(Gate::denies('fpd_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new FpdDoneResource(Fpd::with(['bu', 'dept', 'user'])->advancedFilter()->whereIn('dept_id', auth()->user()->depts->pluck('id'))->where('status', '>=', '8')->paginate(request('limit', 10)));
    }

    public function show(Fpd $fpd)
    {
        abort_if(Gate::denies('fpd_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new FpdDoneResource($fpd->load(['items', 'bu', 'dept', 'user', 'statusHistories']));
    }

}