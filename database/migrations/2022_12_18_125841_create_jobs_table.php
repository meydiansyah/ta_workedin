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
        Schema::create('jobs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->text('description');
            $table->string('salary');
            $table->string('image_url', 2048);
            $table->unsignedBigInteger('status_id')->index();
            $table->unsignedBigInteger('company_id')->index();
            $table->softDeletes();
            $table->timestamps();

			$table->foreign('status_id')
					->references('id')
					->on('statuses')
					->onUpdate('cascade')
					->onDelete('cascade');

			$table->foreign('company_id')
			        ->references('id')
					->on('companies')
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
        Schema::dropIfExists('jobs');
    }
};
