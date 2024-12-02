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
        Schema::create('entregas', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('historia_id')->references('id')->on('historias')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignUuid('user_id')->nullable()->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
            $table->foreignUuid('author_id')->nullable()->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
            $table->jsonb('correcciones');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entregas');
    }
};
