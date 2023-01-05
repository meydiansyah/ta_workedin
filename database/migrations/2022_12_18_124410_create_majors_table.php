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
			$table->string('kode', 10)->primary();
            $table->string('name');
            $table->unsignedBigInteger('faculty_id')->index();
            $table->timestamps();

			$table->foreign('faculty_id')
					 ->references('id')
					 ->on('faculties')
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
