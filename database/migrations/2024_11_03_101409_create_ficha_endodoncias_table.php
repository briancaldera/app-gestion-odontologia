<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ficha_endodoncias', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('diente');
            $table->jsonb('data');
            $table->jsonb('pruebas_diagnosticas');
            $table->jsonb('radiografias_data');
            $table->timestamps();

            $table->foreignUuid('historia_endodoncia_id')->references('id')->on('historia_endodoncias')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ficha_endodoncias');
    }
};
