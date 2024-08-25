<?php

namespace Database\Factories;

use App\Models\User;
use App\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Historia>
 */
class HistoriaFactory extends Factory
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
            'status' => Status::ABIERTA,
            'autor' => User::factory(),
            'numero' => '',
            'motivo_consulta' => $faker->text(),
            'enfermedad_actual' => $faker->text()
        ];
    }
}
