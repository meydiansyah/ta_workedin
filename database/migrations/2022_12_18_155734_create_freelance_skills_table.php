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
        Schema::create('freelance_skills', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('freelance_id')->index();
            $table->unsignedBigInteger('skill_id')->index();
            $table->timestamps();
			
			$table->foreign('freelance_id')
					->references('id')
					->on('freelances')
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
        Schema::dropIfExists('freelance_skill');
    }
};
