<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
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
            'user_id' => User::factory(),
            'nombres' => $faker->firstName() . ' ' . $faker->firstName(),
            'apellidos' => $faker->lastName() . ' ' . $faker->lastName(),
            'fecha_nacimiento' => $faker->date(max: '-18 years'),
            'telefono' => $faker->phoneNumber(),
            'direccion' => $faker->address(),
            'sexo' => $faker->randomElement(['F', 'M', 'NI']),
            'cedula' => $faker->nationalId(),
            'picture_url' => null,
        ];
    }
}
