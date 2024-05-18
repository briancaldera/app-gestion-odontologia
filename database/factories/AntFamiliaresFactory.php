<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AntFamiliares>
 */
class AntFamiliaresFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = fake('es_VE');

        return [
            'madre' => $faker->text(),
            'padre' => $faker->text(),
            'hermanos' => $faker->text(),
            'abuelos_maternos' => $faker->text(),
            'abuelos_paternos' => $faker->text(),
        ];
    }
}
