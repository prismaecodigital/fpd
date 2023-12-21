<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AbilityResource;
use Illuminate\Http\Request;
use App\Models\BuRoleUser;

class AbilitiesController extends Controller
{
    public function index()
    {
        $buroleusers            = BuRoleUser::where('user_id', auth()->user()->id)->with(['bu','user','role'])->get();
        $permissionsArray = [];

        $array = ['fpd_edit','fpd_show','leader','direktur','0','1','2','3','4','5','6','7','8','admin',
            'graph_access', 'summary_access',
            // 'cash_in_create', 'projection_create', 'adjustment_create'
        ];

        foreach ($buroleusers as $buroleuser) {
            foreach ($buroleuser->role->permissions as $permissions) {
                if(in_array($permissions->title, $array)) {
                    $permissionsArray[] = $buroleuser->bu->code.'-'.$permissions->title;
                }
                else {
                    $permissionsArray[] = $permissions->title;
                }
                
            }
        }

        return new AbilityResource($permissionsArray);
    }
}