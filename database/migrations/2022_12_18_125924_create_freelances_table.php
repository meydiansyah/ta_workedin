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
			$table->string('nik')->unique()->nullable();
			$table->string('nim')->unique()->nullable();
			$table->string('major_code')->nullable();
			$table->string('pt_code')->nullable();
			$table->float('rating')->default(0);
			$table->string('full_address')->nullable();
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

			$table->foreign('pt_code')
				->references('codept')
				->on('universities')
				->onUpdate('cascade')
				->onDelete('cascade');

			$table->foreign('major_code')
				->references('code')
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
