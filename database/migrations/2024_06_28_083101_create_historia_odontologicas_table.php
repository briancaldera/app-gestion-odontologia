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
        Schema::create('historia_odontologicas', function (Blueprint $table) {
            $table->foreignUuid('historia_id')->references('id')->on('historias')->cascadeOnUpdate()->cascadeOnDelete();
            $table->text('ant_personales')->nullable();
            $table->jsonb('portador');
            $table->jsonb('habitos');
            $table->jsonb('examen_fisico');
            $table->jsonb('estudio_modelos');
            $table->jsonb('plan_tratamiento');
            $table->jsonb('modificaciones_plan_tratamiento');
            $table->jsonb('secuencia_tratamiento');
            $table->jsonb('examen_radiografico');
            $table->jsonb('historia_periodontal');

            $table->primary('historia_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historia_odontologicas');
    }
};
