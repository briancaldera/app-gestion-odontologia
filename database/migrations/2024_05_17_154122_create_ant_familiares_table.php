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
        Schema::create('ant_familiares', function (Blueprint $table) {
            $table->foreignUuid('paciente_id')->primary()->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->text('madre');
            $table->text('padre');
            $table->text('hermanos');
            $table->text('abuelos_maternos');
            $table->text('abuelos_paternos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ant_familiares');
    }
};
