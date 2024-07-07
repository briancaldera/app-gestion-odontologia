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
            $table->foreignUuid('historia_id')->primary()->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->text('madre')->nullable();
            $table->text('padre')->nullable();
            $table->text('hermanos')->nullable();
            $table->text('abuelos_maternos')->nullable();
            $table->text('abuelos_paternos')->nullable();
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
