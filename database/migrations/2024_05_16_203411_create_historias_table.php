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
        Schema::create('historias', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('paciente_id')->references('id')->on('pacientes')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('numero')->nullable()->unique();
            $table->string('semestre')->nullable();
            $table->enum('status', ['abierta', 'entregada', 'correccion', 'cerrada']);
            $table->foreignUuid('autor_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->text('motivo_consulta')->nullable();
            $table->text('enfermedad_actual')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historias');
    }
};
