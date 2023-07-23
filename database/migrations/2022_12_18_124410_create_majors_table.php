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
        Schema::create('majors', function (Blueprint $table) {
            $table->bigIncrements('id');
			$table->string('code');
            $table->string('name');
			$table->string('level');
			$table->string('accredity');
			$table->string('sk');
			$table->string('website')->nullable();
			$table->string('date_standing');
			$table->string('pt_code');
            $table->timestamps();

			$table->foreign('pt_code')
				->references('codept')
				->on('universities')
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
        Schema::dropIfExists('majors');
    }
};
