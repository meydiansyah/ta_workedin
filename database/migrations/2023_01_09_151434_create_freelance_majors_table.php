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
        Schema::create('freelance_majors', function (Blueprint $table) {
            $table->unsignedBigInteger('freelance_id')->index();
			$table->string('major_code');

            $table->foreign('freelance_id')
				->references('id')
				->on('freelances')
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
        Schema::dropIfExists('freelance_majors');
    }
};
