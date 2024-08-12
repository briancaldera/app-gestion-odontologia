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

        $radiografia = fn () => [
            'radiografias_url' => [],
            'descripcion' => $randomText,
        ];

        $interpretacion_panoramica = [
            'nasomaxilar' => $radiografia(),
            'atm' => $radiografia(),
            'mandibular' => $radiografia(),
            'dento_alveolar_sup' => $radiografia(),
            'dento_alveolar_inf' => $radiografia(),
        ];

        $interpretacion_periapicales = $radiografia();
        $interpretacion_coronales = $radiografia();

        return [
            'interpretacion_panoramica' => $interpretacion_panoramica,
            'interpretacion_periapicales' => $interpretacion_periapicales,
            'interpretacion_coronales' => $interpretacion_coronales
        ];
    }
}
