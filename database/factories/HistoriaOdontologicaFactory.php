<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HistoriaOdontologica>
 */
class HistoriaOdontologicaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = fake('es_VE');
        $f = fn() => $faker->boolean(20);

        $ant_personales = $faker->text();

        $habitos = [
            'fumar' => $f(),
            'alcohol' => $f(),
            'drogas' => $f(),
            'onicofagia' => $f(),
            'deglusion_atip' => $f(),
            'bruxismo' => $f(),
            'bruxomania' => $f(),
            'queilofagia' => $f(),
            'palillos' => $f(),
            'respirador_bucal' => $f(),
            'succion_digital' => $f(),
            'otros' => $f(),
            'descripcion' => $faker->text(),
        ];

        return [
            'ant_personales' => $ant_personales,
            'habitos' => json_encode($habitos),
        ];
    }
}
