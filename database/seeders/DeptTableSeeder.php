<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dept;

class DeptTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $depts = [
            [
                'name'      => 'Information and Communication Technology',
                'code'      => 'ICT',
                'bu_id'     => 1
            ],
            [
                'name'      => 'Finance & Accounting',
                'code'      => 'FA',
                'bu_id'     => 1
            ],
            [
                'name'      => 'Inventory',
                'code'      => 'INV',
                'bu_id'     => 2
            ],
            [
                'name'      => 'Marketing',
                'code'      => 'MAR',
                'bu_id'     => 3
            ],
            [
                'name'      => 'Operasional',
                'code'      => 'OPM',
                'bu_id'     => 4
            ],
        ];

        Dept::insert($depts);
    }
}
