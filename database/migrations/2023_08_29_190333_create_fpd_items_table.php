<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fpd_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('account_id')->references('id')->on('accounts')->onDelete('cascade');
            $table->decimal('amount', 15, 2);
            $table->decimal('real_amount', 15, 2);
            $table->string('ket');
            $table->foreignId('fpd_id')->references('id')->on('fpds')->onDelete('cascade');
            $table->foreignId('site_id')->nullable()->references('id')->on('sites')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fpd_items');
    }
};
