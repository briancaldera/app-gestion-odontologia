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
        Schema::create('ant_personales', function (Blueprint $table) {
            $table->foreignUuid('historia_id')->primary()->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->jsonb('medicamentos');
            $table->jsonb('alergias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ant_personales');
    }
};
