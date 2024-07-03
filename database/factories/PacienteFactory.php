<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paciente>
 */
class PacienteFactory extends Factory
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
            'cedula' => $faker->nationalId(),
            'nombre' => $faker->firstName(),
            'apellido' => $faker->lastName(),
            'edad' => $faker->numberBetween(18, 120),
            'sexo' => $faker->regexify('[MF]'),
            'peso' => number_format($faker->randomFloat(2, 50, 300), 2),
            'fecha_nacimiento' => date_format($faker->dateTimeBetween('-120 years', $endDate = '-18 years'), 'Y-m-d'),
            'ocupacion' => $faker->jobTitle(),
            'direccion' => $faker->address(),
            'telefono' => $faker->regexify('^\d{4}-\d{7}$'),
            'foto_url' => $faker->imageUrl(),
        ];
    }
}
