<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AntPersonales>
 */
class AntPersonalesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = fake('es_VE');

        $f = fn() => $faker->boolean(10);

        $medicamentos = [
            'hipertensivos' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'analgesicos' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'esteroides' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'antidepresivos' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'anticonceptivos' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'hipogicemiante' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'anticonvulsivos' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'sildenafil' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'acidoacetilicidico' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'anticoagulante' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'bifosfanato' => ['positivo' => $f(), 'dosis_diaria' => ''],
            'otros' => ['positivo' => $f(), 'descripcion' => ''],
        ];

        $alergias = [
            'antibioticos' => $f(),
            'analgesicos' => $f(),
            'anestesicos' => $f(),
            'yodo' => $f(),
            'otros' => ['positivo' => $f(), 'descripcion' => ''],
        ];

        return [
            'medicamentos' => $medicamentos,
            'alergias' => $alergias,
        ];
    }
}
