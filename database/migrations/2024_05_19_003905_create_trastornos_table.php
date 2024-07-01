<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trastornos', function (Blueprint $table) {
            $table->foreignUuid('historia_id')->primary()->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->jsonb('cardiovasculares');
            $table->jsonb('hematologicos');
            $table->jsonb('respiratorios');
            $table->jsonb('endocrinos');
            $table->jsonb('gastrointestinales');
            $table->jsonb('neurologicos');
            $table->jsonb('oseos');
            $table->jsonb('ginecologicos');
            $table->jsonb('urologicos');
            $table->jsonb('infectocontagiosa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trastornos');
    }
};
