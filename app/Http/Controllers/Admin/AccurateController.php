<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use App\Models\Bu;
use App\Models\Integration;

class AccurateController extends Controller
{
    //
    protected $integration;

    public function __construct()
    {
        $this->integration = Integration::first();
    }


    public function getToken()
    {
        $clientId = $this->integration->client_id;
        $oauthCallback = $this->integration->oauth_callback;
        $scope = $this->integration->scope;
        $url = "https://account.accurate.id/oauth/authorize?client_id=$clientId&response_type=code&redirect_uri=$oauthCallback&scope=$scope";

        return view('accurate.get-token', ['url' => $url]);
    }

    public function callback(Request $request)
    {
        
        $code = $request->code; // Get 'code' from the request
        $clientId = $this->integration->client_id;
        $clientSecret = $this->integration->client_secret;
        $oauthCallback = $this->integration->oauth_callback;

        $basicAuth = base64_encode("$clientId:$clientSecret");

        // Header
        $header = array(
            "Authorization: Basic $basicAuth"
        );

        // Content
        $content = array(
            "code" => $code,
            "grant_type" => "authorization_code",
            "redirect_uri" => $oauthCallback
        );

        // URL
        $url = "https://account.accurate.id/oauth/token";

        // Connect API
        $opts = array("http" =>
            array(
                "method" => "POST",
                "header" => $header,
                "content" => http_build_query($content),
                "ignore_errors" => true,
            )
        );
        $context  = stream_context_create($opts);
        $response = @file_get_contents($url, false, $context);

        // Output
        $json = json_decode($response);
        $accessToken = $json->{"access_token"};
        $refreshToken = $json->{"refresh_token"};

        $now = Carbon::now();

        $this->integration->update(['access_token' => $accessToken, 'refresh_token' => $refreshToken, 'updated_at' => $now]);

        return redirect()->route('home')->with('success','Sukses');
    }

    public function glAccount(Request $request)
    {
        $accessToken = $this->integration->access_token;
        if($accessToken == '' || $accessToken == null) {
            dd('akses token tidak ada');
        }
        $bu = Bu::where('id', $request->bu_id)->first();
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

        // Header
        $header = array(
            "Authorization: Bearer $accessToken",
            "X-SESSION-ID: $session"
        );

        // Content
        $result = [];
        for ($i=1; $i <= 10 ; $i++) { 
            $content = array(
                "fields" => "id,no,name,parentId",
                "sp.pageSize" => "100",
                "sp.page" => $i
            );
            $url = $host . "/accurate/api/glaccount/list.do?" . http_build_query($content);
                    // Connect API
            $opts = array("http" =>
                array(
                    "method" => "GET",
                    "header" => $header,
                    "ignore_errors" => true,
                )
            );
            $context  = stream_context_create($opts);
            $resultTemp = file_get_contents($url, false, $context);

            $resultTemp = json_decode($resultTemp)->{"d"};
            $result = array_merge($result, $resultTemp);
        }

        $result = json_encode($result);

        dd($result);
    }

    public function journalVoucher(Request $request)
    {
        $accessToken = $this->integration->access_token;
        if($accessToken == '' || $accessToken == null) {
            dd('akses token tidak ada');
        }
        $bu = Bu::where('id', $request->bu_id)->first();
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

        // Header
        $header = array(
            "Authorization: Bearer $accessToken",
            "X-SESSION-ID: $session"
        );

        // Content
        $content = array(
            "fields" => "id,number, transId",
            "sp.pageSize" => "100",
            "sp.page" => "18",
            "sp.sort" => "transDate",
        );
        $url = $host . "/accurate/api/journal-voucher/list.do?" . http_build_query($content);
                // Connect API
        $opts = array("http" =>
            array(
                "method" => "GET",
                "header" => $header,
                "ignore_errors" => true,
            )
        );
        $context  = stream_context_create($opts);
        $result = file_get_contents($url, false, $context);
        dd($result);
        $result = json_decode($result)->{"d"};

        dd($result);
    }
}
