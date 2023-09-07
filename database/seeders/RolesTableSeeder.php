<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $roles = [
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
                'title' => 'user'
            ],
            [
                'title' => 'admin_finance'
            ]
        ];
        Role::insert($roles);
    }
}