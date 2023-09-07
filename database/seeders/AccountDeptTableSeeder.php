<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Account;
use App\Models\Dept;

class AccountDeptTableSeeder extends Seeder
{
    public function run()
    {
        $dept_id = 5;
        $accounts = Account::where('bu_id',4)->get();
        foreach($accounts as $account)
        {
            $account->depts()->sync($dept_id);
        }
    }
}