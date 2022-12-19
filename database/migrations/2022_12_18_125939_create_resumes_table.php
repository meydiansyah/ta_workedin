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
        Schema::create('resumes', function (Blueprint $table) {
            $table->bigIncrements('id');
			$table->string('file');
            $table->unsignedBigInteger('job_id')->index();
            $table->unsignedBigInteger('freelance_id')->index();
			$table->softDeletes();
            $table->timestamps();

			$table->foreign('job_id')
					->references('id')
					->on('jobs')
					->onUpdate('cascade')
					->onDelete('cascade');

			$table->foreign('freelance_id')
					->references('id')
					->on('freelances')
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
        Schema::dropIfExists('resumes');
    }
};
