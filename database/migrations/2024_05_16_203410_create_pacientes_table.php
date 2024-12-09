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
        Schema::create('pacientes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cedula')->unique();
            $table->string('nombre');
            $table->string('apellido');
            $table->integer('edad');
            $table->enum('sexo', ['F', 'M', 'NI']);
            $table->decimal('peso');
            $table->date('fecha_nacimiento');
            $table->string('ocupacion');
            $table->text('direccion');
            $table->string('telefono')->nullable();
            $table->text('motivo_consulta')->nullable();
            $table->text('enfermedad_actual')->nullable();
            $table->jsonb('informacion_emergencia');
            $table->foreignUuid('registered_by')->references('id')->on('users')->restrictOnUpdate()->restrictOnDelete();
            $table->foreignUuid('assigned_to')->references('id')->on('users')->restrictOnUpdate()->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacientes');
    }
};
