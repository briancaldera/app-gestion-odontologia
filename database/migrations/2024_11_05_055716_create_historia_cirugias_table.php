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
        Schema::create('historia_cirugias', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->jsonb('anamnesis');
            $table->jsonb('habitos');
            $table->jsonb('femenino');
            $table->jsonb('antecedentes');
            $table->jsonb('examen_fisico');
            $table->jsonb('observaciones');
            $table->jsonb('estudios_radiograficos');
            $table->jsonb('secuencia_tratamiento');
            $table->foreignUuid('paciente_id')->references('id')->on('pacientes')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignUuid('autor_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->enum('status', ['abierta', 'entregada', 'correccion', 'cerrada']);
            $table->string('numero')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historia_cirugias');
    }
};
