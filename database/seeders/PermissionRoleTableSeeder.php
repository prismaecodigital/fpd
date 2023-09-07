<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionRoleTableSeeder extends Seeder
{
    public function run()
    {
        $admin_permissions = Permission::all();
        Role::findOrFail(1)->permissions()->sync($admin_permissions->pluck('id'));

        $finance_permissions = Permission::whereIn('title',
            [
                'finance', 'profile', 'fpd_access', 'fpd_create', 'fpd_edit', 'fpd_show', '1', '2', '3', '6',
                'user_access','user_create','bu_dept_site_access','bu_dept_site_create','account_access','account_create'
            ])->get();
        Role::findOrFail(2)->permissions()->sync($finance_permissions->pluck('id'));

        $leader_permissions = Permission::whereIn('title',
            [
                'leader', 'profile', 'fpd_access', 'fpd_create', 'fpd_edit', 'fpd_show', '0', '5', '7',
                'account_access'
            ])->get();
        Role::findOrFail(3)->permissions()->sync($leader_permissions->pluck('id'));

        $direktur_permissions = Permission::whereIn('title',
            [
                'direktur', 'profile', 'fpd_access', 'fpd_create' , '1',
                'account_access'
            ])->get();
        Role::findOrFail(4)->permissions()->sync($direktur_permissions->pluck('id'));

        $user_permissions = Permission::whereIn('title',
            [
                'user', 'profile', 'fpd_access', 'fpd_create', '7',
                'account_access'
            ])->get();
        Role::findOrFail(5)->permissions()->sync($user_permissions->pluck('id'));

        $adminFinance_permissions = Permission::whereIn('title', 
            [
                'admin'
            ])->get();
        Role::findOrFail(6)->permissions()->sync($adminFinance_permissions->pluck('id'));

    }
}