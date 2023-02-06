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
        Schema::create('major_university', function (Blueprint $table) {
            
            $table->string('pt_code');
			$table->string('major_code');
            
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
        Schema::dropIfExists('major_universities');
    }
};
