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
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('codept');
            $table->integer('major_code');
            $table->string('nim');
			// $table->foreign('pt_code')
			// 		->references('codept')
			// 		->on('universities')
			// 		->onUpdate('cascade')
			// 		->onDelete('cascade');

			// $table->foreign('major_code')
			// 		->references('code')
			// 		->on('majors')
			// 		->onUpdate('cascade')
			// 		->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
};
