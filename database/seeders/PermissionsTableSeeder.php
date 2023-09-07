<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $permissions = [
            [
                'title' => 'user_access'
            ],
            [
                'title' => 'user_create'
            ],
            [
                'title' => 'user_edit'
            ],
            [
                'title' => 'user_delete'
            ],
            [
                'title' => 'role_permission_access'
            ],
            [
                'title' => 'role_permission_create'
            ],
            [
                'title' => 'role_permission_edit'
            ],
            [
                'title' => 'role_permission_delete'
            ],
            [
                'title' => 'bu_dept_site_access'
            ],
            [
                'title' => 'bu_dept_site_create'
            ],
            [
                'title' => 'bu_dept_site_edit'
            ],
            [
                'title' => 'bu_dept_site_delete'
            ],
            [
                'title' => 'account_access'
            ],
            [
                'title' => 'account_create'
            ],
            [
                'title' => 'account_edit'
            ],
            [
                'title' => 'account_delete'
            ],
            [
                'title' => 'fpd_access'
            ],
            [
                'title' => 'fpd_create'
            ],
            [
                'title' => 'fpd_edit'
            ],
            [
                'title' => 'fpd_delete'
            ],
            [
                'title' => 'fpd_show'
            ],
            [
                'title' => 'finance'
            ],
            [
                'title' => 'user'
            ],
            [
                'title' => 'leader'
            ],
            [
                'title' => 'direktur'
            ],
            [
                'title' => '0'
            ],
            [
                'title' => '1'
            ],
            [
                'title' => '2'
            ],
            [
                'title' => '3'
            ],
            [
                'title' => '4'
            ],
            [
                'title' => '5'
            ],
            [
                'title' => '6'
            ],
            [
                'title' => '7'
            ],
            [
                'title' => '8'
            ],
            [
                'title' => 'admin'
            ],
            [
                'title' => 'profile'
            ]
        ];

        Permission::insert($permissions);
    }
}
