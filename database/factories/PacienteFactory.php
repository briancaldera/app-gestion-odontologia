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

        $sex = $faker->randomElement(['F', 'M', 'NI']);

        $gender = '';

        switch ($sex) {
            case 'F':
                $gender = 'female';
                break;
            case 'M':
                $gender = 'male';
                break;
            case 'NI':
                $gender = $faker->randomElement(['female', 'male']);
                break;
        }

        $birth_date = $faker->dateTimeBetween('-120 years', $endDate = '-18 years');
        $age = $birth_date->diff(now())->y;

        return [
            'cedula' => $faker->nationalId(),
            'nombre' => $faker->firstName($gender),
            'apellido' => $faker->lastName($gender),
            'edad' => $age,
            'sexo' => $sex,
            'peso' => number_format($faker->randomFloat(2, 50, 300), 2),
            'fecha_nacimiento' => $birth_date,
            'ocupacion' => $faker->jobTitle(),
            'direccion' => $faker->address(),
            'telefono' => $faker->regexify('^\d{4}-\d{7}$'),
            'motivo_consulta' => $faker->text(),
            'enfermedad_actual' => $faker->text(),
        ];
    }
}
