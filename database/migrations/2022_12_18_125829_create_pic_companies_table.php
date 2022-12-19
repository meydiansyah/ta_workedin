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
        Schema::create('pic_companies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->index()->unique();

            $table->string('first_name');
            $table->string('last_name');
			$table->string('phone');
            $table->string('email');
            $table->unsignedBigInteger('company_id')->index()->nullable()->unique();
            $table->string('title');
            $table->string('image_url', 2048)->nullable();
            $table->string('nip');
            $table->string('nik');
            $table->string('full_address')->unique();
            $table->unsignedBigInteger('village_id')->index();
            $table->unsignedBigInteger('district_id')->index();
            $table->unsignedBigInteger('city_id')->index();
            $table->unsignedBigInteger('province_id')->index();

            $table->softDeletes();
            $table->timestamps();

			$table->foreign('user_id')
					->references('id')
					->on('users')
					->onUpdate('cascade')
					->onDelete('cascade');

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
        Schema::dropIfExists('pic_companies');
    }
};
