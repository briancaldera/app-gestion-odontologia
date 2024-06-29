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

        $signos_vitales = [
            'tension_arterial' => ['sistole' => $faker->numberBetween(50, 180), 'diastole' => $faker->numberBetween(20, 120)],
            'pulso' => $faker->numberBetween(50, 180),
            'respiracion' => $faker->numberBetween(12, 30),
            'temperatura' => $faker->numberBetween(35, 40),
        ];

        $examen_extraoral = [
            'cabeza' => $faker->text(100),
            'cara' => $faker->text(100),
            'simetria_facial' => $faker->text(100),
            'piel' => $faker->text(100),
            'lesiones_extraorales' => $faker->text(100),
            'palpacion_ganglios' => $faker->text(100),
            'articulacion_temporomandibular' => $faker->text(100),
        ];

        $examen_intraoral = [
            'labios' => $faker->text(100),
            'mejillas' => $faker->text(100),
            'frenillos' => $faker->text(100),
            'piso_boca' => $faker->text(100),
            'lengua_tipo' => $faker->text(100),
            'paladar_duro_blando' => $faker->text(100),
            'encias' => $faker->text(100),
            'dientes' => $faker->text(100),
            'discromias' => $faker->text(100),
            'maxilares' => $faker->text(100),
        ];

        $examen_fisico = [
            'signos_vitales' => $signos_vitales,
            'examen_extraoral' => $examen_extraoral,
            'examen_intraoral' => $examen_intraoral,
        ];

        return [
            'ant_personales' => $ant_personales,
            'habitos' => json_encode($habitos),
            'examen_fisico' => json_encode($examen_fisico),
        ];
    }
}
