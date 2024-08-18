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
        Schema::create('correccions', function (Blueprint $table) {
            $table->foreignUuid('historia_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->jsonb('correcciones');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('correccions');
    }
};
