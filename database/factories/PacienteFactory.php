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
            'peso' => $faker->randomFloat(2, 50, 120),
            'fecha_nacimiento' => $faker->dateTimeBetween('-120 years', $endDate = '-18 years'),
            'ocupacion' => $faker->jobTitle(),
            'direccion' => $faker->address(),
            'telefono' => $faker->phoneNumber(),
            'foto_url' => $faker->imageUrl(),
        ];
    }
}
