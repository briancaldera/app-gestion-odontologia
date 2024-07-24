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
        Schema::create('profiles', function (Blueprint $table) {
            $table->foreignUuid("user_id")->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->string("nombres");
            $table->string("apellidos");
            $table->date("fecha_nacimiento");
            $table->string("telefono");
            $table->text("direccion");
            $table->enum("sexo", ['M', 'F', 'NI']);
            $table->string("cedula")->unique();
            $table->string("picture_url")->nullable();
            $table->string("lapso")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
