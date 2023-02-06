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
        Schema::create('freelance_universities', function (Blueprint $table) {
            $table->unsignedBigInteger('freelance_id')->index();
			$table->string('pt_code');

            $table->foreign('freelance_id')
				->references('id')
				->on('freelances')
				->onUpdate('cascade')
				->onDelete('cascade');
                
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
        Schema::dropIfExists('freelance_universities');
    }
};
