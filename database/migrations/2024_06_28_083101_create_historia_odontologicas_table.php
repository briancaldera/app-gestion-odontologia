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
        Schema::create('historia_odontologicas', function (Blueprint $table) {
            $table->foreignUuid('historia_id')->primary()->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->text('ant_personales');
            $table->jsonb('habitos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historia_odontologicas');
    }
};
