<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\IntegrationResource;
use App\Models\Integration;
use App\Models\Fpd;
use App\Models\Bu;
use App\Models\Account;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;

class IntegrationApiController extends Controller
{
    public function getAccurateToken()
    {
        $accurate = Integration::where('id','1')->first();

        $today = Carbon::now();
        $expire_date = Carbon::parse($accurate->expire_date);

        if($today >= $expire_date) {
            $accurate->update(['status' => 'expire']);
        }

        return new IntegrationResource($accurate);
    }


    public function index()
    {
        return new IntegrationResource(Integration::advancedFilter()->paginate(request('limit', 10)));
    }

    public function store(Request $request)
    {
        $integration = Integration::create($request->all());

        return (new IntegrationResource($integration))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        return response([
            'meta' => [
            ],
        ]);
    }

    public function show(Integration $integration)
    {
        return new IntegrationResource($integration);
    }

    public function update(Request $request, Integration $integration)
    {
        $integration->update($request->all());

        return (new IntegrationResource($integration))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Integration $integration)
    {
        return response([
            'data' => new IntegrationResource($integration),
            'meta' => [
            ],
        ]);
    }

    public function destroy(Integration $integration)
    {
        $integration->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function saveJournalVoucher(Request $request)
    {
        $integration = Integration::where('id',1)->first();
        $fpds = Fpd::with('items')->whereIn('id', $request->fpds)->get();
        $accessToken = $integration->access_token;
        if($accessToken == '' || $accessToken == null) {
            dd('akses token tidak ada');
        }
        $bu = Bu::where('id', $fpds->first()->bu_id)->first();
        $accurate_bu_id = $bu->accurate_bu_id;
        if($accurate_bu_id == '' || $accurate_bu_id == null) {
            dd('accurate_bu_id tidak ada');
        }
        $session = $bu->accurate_session;
        if($session == '' || $session == null) {
            dd('session tidak ada');
        }
        $session_expire = $bu->accurate_session_expire;
        $today = Carbon::now();
        $host = $bu->accurate_host;
        if($today >= $session_expire) {
            dd('session expired');
        }
        $credit_account = Account::where('id', $request->credit_account)->first()->code;

        // Header
        $header = array(
            "Authorization: Bearer $accessToken",
            "X-SESSION-ID: $session",
            "Content-Type: application/json"
        );

        $params = [];
        
        foreach($fpds as $x => $fpd) {

            if($fpd->journaled) {
                continue;
            }
            
            $processDate = $fpd->processed_date_raw;
            $journalDate = substr($processDate,8,2).'/'.substr($processDate,5,2).'/'.substr($processDate,0,4);
            
            $params['data'][$x]['transDate'] = $journalDate;
            $params['data'][$x]['description'] = $fpd->ket.' (dana)';
            $params['data'][$x]['detailJournalVoucher'][0]['accountNo'] = $credit_account;
            $params['data'][$x]['detailJournalVoucher'][0]['amount'] = $fpd->accurate_total;
            $params['data'][$x]['detailJournalVoucher'][0]['amountType'] = 'CREDIT';
            foreach ($fpd->items as $y => $item) {
                $params['data'][$x]['detailJournalVoucher'][$y+1]['accountNo'] = $item->account->code;
                $params['data'][$x]['detailJournalVoucher'][$y+1]['amount'] = $item->real_amount;
                $params['data'][$x]['detailJournalVoucher'][$y+1]['amountType'] = 'DEBIT';
                $params['data'][$x]['detailJournalVoucher'][$y+1]['memo'] = $item->ket;
            }
            $fpd->update(['journaled'=>1]);
        }


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
        dd($result);
    }
}