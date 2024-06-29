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
        $randomBoolean = fn() => $faker->boolean(20);
        $randomText = fn() => $faker->text($faker->numberBetween(30, 200));

        $randomTratamientos = function ($count = 1) use ($faker, $randomText) {
            $tratamientos = [];

            for ($i = 0; $i < $count; $i++)
                $tratamientos[] =
                    [
                        'diente' => $faker->numberBetween(18, 48),
                        'cavidad' => $faker->text(15),
                        'tratamiento' => $randomText(),
                    ];
            return $tratamientos;
        };

        $ant_personales = $randomText();

        $habitos = [
            'fumar' => $randomBoolean(),
            'alcohol' => $randomBoolean(),
            'drogas' => $randomBoolean(),
            'onicofagia' => $randomBoolean(),
            'deglusion_atip' => $randomBoolean(),
            'bruxismo' => $randomBoolean(),
            'bruxomania' => $randomBoolean(),
            'queilofagia' => $randomBoolean(),
            'palillos' => $randomBoolean(),
            'respirador_bucal' => $randomBoolean(),
            'succion_digital' => $randomBoolean(),
            'otros' => $randomBoolean(),
            'descripcion' => $randomText(),
        ];

        $signos_vitales = [
            'tension_arterial' => ['sistole' => $faker->numberBetween(50, 180), 'diastole' => $faker->numberBetween(20, 120)],
            'pulso' => $faker->numberBetween(50, 180),
            'respiracion' => $faker->numberBetween(12, 30),
            'temperatura' => $faker->numberBetween(35, 40),
        ];

        $examen_extraoral = [
            'cabeza' => $randomText(),
            'cara' => $randomText(),
            'simetria_facial' => $randomText(),
            'piel' => $randomText(),
            'lesiones_extraorales' => $randomText(),
            'palpacion_ganglios' => $randomText(),
            'articulacion_temporomandibular' => $randomText(),
        ];

        $examen_intraoral = [
            'labios' => $randomText(),
            'mejillas' => $randomText(),
            'frenillos' => $randomText(),
            'piso_boca' => $randomText(),
            'lengua_tipo' => $randomText(),
            'paladar_duro_blando' => $randomText(),
            'encias' => $randomText(),
            'dientes' => $randomText(),
            'discromias' => $randomText(),
            'maxilares' => $randomText(),
        ];

        $examen_fisico = [
            'signos_vitales' => $signos_vitales,
            'examen_extraoral' => $examen_extraoral,
            'examen_intraoral' => $examen_intraoral,
        ];


        $maxilar_sup = [
            'tipo_arco' => $randomText(),
            'forma_arco' => $randomText(),
            'simetria_arco' => $randomText(),
            'paladar' => $randomText(),
            'maloclusion' => $randomText(),
            'dientes_ausentes' => $randomText(),
            'facetas_desgaste' => $randomText(),
            'diastemas' => $randomText(),
            'anomalia' => $randomText(),
        ];

        $maxilar_inf = [
            'tipo_arco' => $randomText(),
            'forma_arco' => $randomText(),
            'simetria_arco' => $randomText(),
            'piso_boca' => $randomText(),
            'maloclusion' => $randomText(),
            'dientes_ausentes' => $randomText(),
            'facetas_desgaste' => $randomText(),
            'diastemas' => $randomText(),
            'anomalia' => $randomText(),
        ];

        $modelos_oclusion = [
            'linea_media' => $randomText(),
            'sobresalte' => $randomText(),
            'sobrepase' => $randomText(),
            'relacion_canina' => $randomText(),
            'relacion_molar' => $randomText(),
            'mordida_anterior' => $randomText(),
            'mordida_posterior' => $randomText(),
            'curva_compensacion' => $randomText(),
            'plano_oclusal' => $randomText(),
        ];

        $examenes_comp = $randomText();

        $interconsultas = [
            'cirugia' => $randomBoolean(),
            'periodoncia' => $randomBoolean(),
            'endodoncia' => $randomBoolean(),
            'protesis' => $randomBoolean(),
            'ortodoncia' => $randomBoolean(),
            'descripcion' => $randomText(),
        ];

        $diagnostico = $randomText();

        $pronostico = $randomText();

        $estudio_modelos = [
            'maxilar_sup' => $maxilar_sup,
            'maxilar_inf' => $maxilar_inf,
            'modelos_oclusion' => $modelos_oclusion,
            'examenes_comp' => $examenes_comp,
            'interconsultas' => $interconsultas,
            'diagnostico' => $diagnostico,
            'pronostico' => $pronostico
        ];

        $plan_tratamiento = [
            'plan_tratamiento' => []
        ];

//        $tratamiento = [
//            'diente' => $faker->numberBetween(18, 48),
//            'cavidad' => $faker->text(15),
//            'tratamiento' => $randomText(),
//        ];

        $plan_tratamiento['plan_tratamiento'] = $randomTratamientos($faker->numberBetween(1, 18));

        return [
            'ant_personales' => $ant_personales,
            'habitos' => json_encode($habitos),
            'examen_fisico' => json_encode($examen_fisico),
            'estudio_modelos' => json_encode($estudio_modelos),
            'plan_tratamiento' => json_encode($plan_tratamiento),
        ];
    }
}
