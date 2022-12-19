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
        Schema::create('company_reviews', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('company_id')->index();
            $table->unsignedBigInteger('review_id')->index();
            $table->timestamps();
			
			$table->foreign('company_id')
					->references('id')
					->on('companies')
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
        Schema::dropIfExists('company_review');
    }
};
