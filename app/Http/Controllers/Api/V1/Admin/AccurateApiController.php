<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class AccurateApiController extends Controller
{
    public function getToken()
    {
        $accurateConfig = config('accurate');
    
        return response()->json($accurateConfig);
    }

    public function update(Request $request)
    {
        $newConfig = $request->all();
        // Validate and update the configuration
        // Save the updated configuration to your config file
        // ...
    }

}