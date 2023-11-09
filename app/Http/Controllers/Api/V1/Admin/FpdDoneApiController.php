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
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\JournalImport;

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

        if($accurate_bu_id == '' || $accurate_bu_id == null || $today < $bu->accurate_session_expire) {
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

    public function importData(Request $request)
    {
        $file = $request->file('file');
        $data = Excel::toCollection(new JournalImport, $file)->first();

        $bu = Bu::where('id', $request->bu_id)->first();
        if(Carbon::now() >= $bu->accurate_session_expire || empty($bu->accurate_bu_id) || $bu->accurate_bu_id == '') {
            return response()->json('tidak ada session BU didalam accurate');
        }

        $result = [];

        $groupedData = [];
        $referenceDate = strtotime('1899-12-30');
    
        foreach ($data as $item) {
            $trans_date = date('Y-m-d', $referenceDate + ($item['trans_date'] * 24 * 60 * 60));
            $no_journal = $item['no_journal'];
            $ket       = $item['ket'];
    
            if (!isset($groupedData[$trans_date])) {
                $groupedData[$trans_date] = [];
            }
    
            if (!isset($groupedData[$trans_date][$no_journal])) {
                $groupedData[$trans_date][$no_journal] = [
                    'no_journal' => $no_journal,
                    'transDate' => $trans_date,
                    'description'        => $ket,
                    'detailJournalVoucher' => [],
                ];
            }
    
            // Map the item to the desired format
            $mappedItem = [
                'accountNo' => $item['account_no'],
                'amount' => $item['amount'],
                'accountType' => $item['account_type'],
                'memo' => $item['memo']
            ];
    
            $groupedData[$trans_date][$no_journal]['detailJournalVoucher'][] = $mappedItem;
        }
    
        // Convert the grouped data to an array
        foreach ($groupedData as $trans_date => $data) {
            foreach ($data as $no_journal => $item) {
                $result[] = $item;
            }
        }
        $bu_id = $request->bu_id;
        $this->postData($result, $bu_id);
    
        return ['data' => $result];
    }

    protected function postData($params, $bu_id)
    {
        $integration = Integration::where('id',1)->first();
        $accessToken = $integration->access_token;
        if($accessToken == '' || $accessToken == null) {
            return 'failed';
        }
        $bu = Bu::where('id', $bu_id)->first();
        $accurate_bu_id = $bu->accurate_bu_id;
        if($accurate_bu_id == '' || $accurate_bu_id == null) {
            return 'failed';
        }
        $session = $bu->accurate_session;
        if($session == '' || $session == null) {
            return 'failed';
        }
        $session_expire = $bu->accurate_session_expire;
        $today = Carbon::now();
        $host = $bu->accurate_host;
        if($today >= $session_expire) {
            return 'failed';
        }

        // Header
        $header = array(
            "Authorization: Bearer $accessToken",
            "X-SESSION-ID: $session",
            "Content-Type: application/json"
        );

        $url = $host . "/accurate/api/journal-voucher/bulk-save.do";

        // Connect API
        $opts = array("http" =>
            array(
                "method"  => "POST",
                "header"  => $header,
                "content" => json_encode($params),
                "ignore_errors" => true,
            )
        );

        $context  = stream_context_create($opts);
        $result = file_get_contents($url, false, $context);
        return 'success';
    }

}