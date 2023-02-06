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
        Schema::create('job_company', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->index();
            $table->unsignedBigInteger('job_id')->index();

            $table->foreign('company_id')
				->references('id')
				->on('companies')
				->onUpdate('cascade')
				->onDelete('cascade');
                
            $table->foreign('job_id')
				->references('id')
				->on('jobs')
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
        Schema::dropIfExists('job_company');
    }
};
