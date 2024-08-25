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
            $table->foreignUuid('paciente_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('numero')->unique();
            $table->text('motivo_consulta');
            $table->text('enfermedad_actual');
            $table->enum('status', ['abierta', 'entregada', 'correccion', 'cerrada']);
            $table->foreignUuid('autor_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
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
