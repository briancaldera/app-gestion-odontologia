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
        Schema::create('historia_endodoncias', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('paciente_id')->references('id')->on('pacientes')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('numero')->nullable();
            $table->enum('status', ['abierta', 'entregada', 'correccion', 'cerrada']);
            $table->foreignUuid('autor_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->jsonb('anamnesis');
            $table->jsonb('evaluacion_dolor');
            $table->jsonb('secuencia_tratamiento');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historia_endodoncias');
    }
};
