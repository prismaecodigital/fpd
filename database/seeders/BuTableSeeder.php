<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bu;

class BuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $bus = [
            [
                'name'      => 'PT. Prisma Enterprindo',
                'code'      => 'PRI'
            ],
            [
                'name'      => 'PT. Pandjava Kencana Utama',
                'code'      => 'PKU'
            ],
            [
                'name'      => 'PT. Rukun Sahabat Senior',
                'code'      => 'RSS'
            ],
            [
                'name'      => 'PT. Purnawangi Maju Jaya',
                'code'      => 'PMJ'
            ],
        ];

        Bu::insert($bus);
    }
}
