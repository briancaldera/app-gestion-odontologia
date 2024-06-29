<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExamenRadiografico>
 */
class ExamenRadiograficoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = fake('es_VE');
        $randomText = fn() => $faker->text($faker->numberBetween(30, 200));

        $interpretacion_panoramica = [
            'nasomaxilar' => $randomText(),
            'atm' => $randomText(),
            'mandibular' => $randomText(),
            'dento_alveolar_sup' => $randomText(),
            'dento_alveolar_inf' => $randomText(),
        ];

        $interpretacion_periapicales = $randomText();
        $interpretacion_coronales = $randomText();

        return [
            'interpretacion_panoramica' => json_encode($interpretacion_panoramica),
            'interpretacion_periapicales' => $interpretacion_periapicales,
            'interpretacion_coronales' => $interpretacion_coronales
        ];
    }
}
