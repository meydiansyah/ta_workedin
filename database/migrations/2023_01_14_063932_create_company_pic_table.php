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
        Schema::create('company_pic', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->index();
            $table->unsignedBigInteger('pic_company_id')->index();

            $table->foreign('company_id')
				->references('id')
				->on('companies')
				->onUpdate('cascade')
				->onDelete('cascade');
                
            $table->foreign('pic_company_id')
				->references('id')
				->on('pic_companies')
				->onUpdate('cascade')
				->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_pic');
    }
};
