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
        Schema::create('examen_radiograficos', function (Blueprint $table) {
            $table->foreignUuid('historia_id')->primary()->constrained('historia_odontologicas', 'historia_id')->cascadeOnUpdate()->cascadeOnDelete();
            $table->jsonb('interpretacion_panoramica');
            $table->jsonb('interpretacion_periapicales');
            $table->jsonb('interpretacion_coronales');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examen_radiograficos');
    }
};
