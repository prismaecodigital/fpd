<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFpdRequest;
use App\Http\Requests\UpdateFpdRequest;
use App\Http\Resources\Admin\FpdDoneResource;
use App\Models\Bu;
use App\Models\Integration;
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
    public function list()
    {
        return new BuResource(Bu::has('fpds')->advancedFilter()->whereIn('bu_id', auth()->user()->bus->pluck('id'))->paginate(request('limit', 10)));
        
    }

    public function index(Request $request)
    {
        $accessToken = Integration::where('id',1)->first()->access_token;

        $bu = Bu::where('id', $request->id)->first();
        $accurate_bu_id = $bu->accurate_bu_id;
        $today = Carbon::now();

        if($accurate_bu_id == '' || $accurate_bu_id == null) {
            return response([
                'data' => new FpdDoneResource(Fpd::with(['bu', 'dept', 'user'])->advancedFilter()->where('bu_id', $request->id)->whereIn('dept_id', auth()->user()->depts->pluck('id'))->where('status', '>=', '9')->paginate(request('limit', 10))),
                'meta' => [
                    'session' => '',
                    'host' => '',
                ],
                'lists' => [
                    'accounts'      => Account::where('bu_id', $bu->id)->whereNotNull('parent_id')->get(['id','name']),
                ]
            ]);
        }

        if($today < $bu->accurate_session_expire) {
            return response([
                'data' => new FpdDoneResource(Fpd::with(['bu', 'dept', 'user'])->advancedFilter()->where('bu_id', $request->id)->whereIn('dept_id', auth()->user()->depts->pluck('id'))->where('status', '>=', '9')->paginate(request('limit', 10))),
                'meta' => [
                    'session' => '',
                    'host' => '',
                ],
                'lists' => [
                    'accounts'      => Account::where('bu_id', $bu->id)->get(['id','name']),
                ]
            ]);
        }

        // Header
        $header = array(
            "Authorization: Bearer $accessToken"
        );

        // URL
        $url = "https://account.accurate.id/api/open-db.do?id=" . $accurate_bu_id;

        // Connect API
        $opts = array("http" =>
            array(
                "method" => "GET",
                "header" => $header,
                "ignore_errors" => true,
            )
        );
        $context  = stream_context_create($opts);
        $response = file_get_contents($url, false, $context);

        $session = json_decode($response)->{"session"};
        $host = json_decode($response)->{"host"};
        $dateString = json_decode($response)->{"accessibleUntil"};
        list($day, $month, $year) = explode('/', $dateString);
        $accessibleUntil = $year . '-' . $month . '-' . $day;

        $bu->update(['accurate_session' => $session, 'accurate_host' => $host, 'accurate_session_expire' => $accessibleUntil]);

        return response([
            'data' => new FpdDoneResource(Fpd::with(['bu', 'dept', 'user'])->advancedFilter()->where('bu_id', $request->id)->whereIn('dept_id', auth()->user()->depts->pluck('id'))->where('status', '>=', '9')->paginate(request('limit', 10))),
            'meta' => [
                'session' => $session,
                'host' => $host,
            ],
        ]);

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