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
        Schema::create('universities', function (Blueprint $table) {
            $table->bigIncrements('kodept');
			$table->string('name')->unique();
			$table->string('email')->unique();
			$table->string('phone')->unique();
			$table->string('fax')->unique();
			$table->string('logo')->unique();
			$table->string('url')->unique();
			$table->string('full_address');
            $table->unsignedBigInteger('village_id')->index();
            $table->unsignedBigInteger('district_id')->index();
            $table->unsignedBigInteger('city_id')->index();
            $table->unsignedBigInteger('province_id')->index();
			$table->softDeletes();
            $table->timestamps();

			$table->foreign('village_id')
					->references('id')
					->on('indonesia_villages')
					->onUpdate('cascade')
					->onDelete('cascade');

			$table->foreign('district_id')
					->references('id')
					->on('indonesia_districts')
					->onUpdate('cascade')
					->onDelete('cascade');

			$table->foreign('city_id')
					 ->references('id')
					 ->on('indonesia_cities')
					 ->onUpdate('cascade')
					 ->onDelete('cascade');

			$table->foreign('province_id')
					 ->references('id')
					 ->on('indonesia_provinces')
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
        Schema::dropIfExists('universities');
    }
};
