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
        Schema::create('freelances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->index()->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('image_url', 2048)->nullable();
            $table->string('email')->unique();
            $table->string('phone')->unique();
			$table->text('bio')->nullable();
            $table->string('nik')->unique();
            $table->string('nim')->unique();
            $table->string('kode_major');
            $table->string('kode_pt');
            $table->float('rating')->default(0);
			$table->string('full_address');
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

			$table->foreign('kode_pt')
					 ->references('kodept')
					 ->on('universities')
					 ->onUpdate('cascade')
					 ->onDelete('cascade');

            $table->foreign('kode_major')
					 ->references('kode')
					 ->on('majors')
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
        Schema::dropIfExists('freelances');
    }
};
