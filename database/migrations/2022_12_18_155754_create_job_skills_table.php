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
        Schema::create('job_skills', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('job_id')->index();
            $table->unsignedBigInteger('skill_id')->index();
            $table->timestamps();
			
			$table->foreign('job_id')
					->references('id')
					->on('jobs')
					->onUpdate('cascade')
					->onDelete('cascade');

			$table->foreign('skill_id')
					->references('id')
					->on('skills')
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
        Schema::dropIfExists('job_skill');
    }
};
