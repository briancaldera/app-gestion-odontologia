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
            $table->enum('sexo', ['M', 'F']);
            $table->decimal('peso');
            $table->date('fecha_nacimiento');
            $table->string('ocupacion');
            $table->text('direccion');
            $table->string('telefono');
            $table->string('foto');
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
