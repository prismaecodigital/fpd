<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFpdsTable extends Migration
{
    public function up()
    {
        Schema::create('fpds', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code')->nullable();
            $table->string('code_voucher')->nullable();
            $table->string('transact_type');
            $table->string('klasifikasi')->nullable();
            $table->foreignId('bu_id')->nullable()->references('id')->on('bus')->onDelete('set null');
            $table->foreignId('dept_id')->nullable()->references('id')->on('depts')->onDelete('set null');
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->string('status')->nullable();
            $table->date('req_date');
            $table->date('processed_date')->nullable();
            $table->string('ket')->nullable();
            $table->timestamps();
        });
    }
}