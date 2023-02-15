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
        Schema::create('university_review', function (Blueprint $table) {
            $table->string('university_id')->index();
            $table->unsignedBigInteger('review_id')->index();
			
			$table->foreign('university_id')
					->references('codept')
					->on('universities')
					->onUpdate('cascade')
					->onDelete('cascade');

			$table->foreign('review_id')
					->references('id')
					->on('reviews')
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
        Schema::dropIfExists('university_review');
    }
};
