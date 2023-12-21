<?php

namespace App\Http\Middleware;

use App\Models\Role;
use App\Models\User;
use App\Models\Bu;
use App\Models\BuRoleUser;
use Closure;
use Illuminate\Support\Facades\Gate;

class AuthGates
{
    public function handle($request, Closure $next)
    {
        $user = auth()->user();

        if (! $user) {
            return $next($request);
        }

        $buroleusers            = BuRoleUser::where('user_id', $user->id)->with(['bu','user','role'])->get();
        $permissionsArray = [];

        $array = ['fpd_access','fpd_create','fpd_edit','fpd_delete','fpd_show','leader','direktur','0','1','2','3','4','5','6','7','8','admin',
            'cash_in_access', 'projection_access','adjustment_access','cash_in_create', 'projection_create', 'adjustment_create'
        ];

        foreach ($buroleusers as $buroleuser) {
            foreach ($buroleuser->role->permissions as $permissions) {
                if(in_array($permissions->title, $array)) {
                    $permissionsArray[$buroleuser->bu->code.'-'.$permissions->title][] = $buroleuser->role_id.'-'.$buroleuser->bu_id;
                }
                else {
                    $permissionsArray[$permissions->title][] = $buroleuser->role_id.'-'.$buroleuser->bu_id;
                }
                
            }
        }

        foreach ($permissionsArray as $title => $roles) {
            Gate::define($title, function (User $user) use ($roles) {
                return true;
            });
        }

        app()->instance('permissionsArray', $permissionsArray);

        return $next($request);
    }
}