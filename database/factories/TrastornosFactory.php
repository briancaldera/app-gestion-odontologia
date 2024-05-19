<?php

namespace Database\Factories;

use App\Models\AntPersonales;
use App\Models\Paciente;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trastornos>
 */
class TrastornosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = fake('es_VE');

        $f = fn() => $faker->boolean(5);

        $cardiovasculares = [
            'disnea' => $f(),
            'cansancio' => $f(),
            'vertigo' => $f(),
            'palpitaciones' => $f(),
            'taquicardia' => $f(),
            'bradicardia' => $f(),
            'varices' => $f(),
            'infarto_miocardio' => $f(),
            'angina_pecho' => $f(),
            'hipertension' => $f(),
            'endocarditis' => $f(),
            'otros' => $faker->text(),
        ];

        $hematologicos = [
            'palidez' => $f(),
            'ictericia' => $f(),
            'anemia' => $f(),
            'hemorragias' => $f(),
            'hematoma' => $f(),
            'equimosis' => $f(),
            'petequias' => $f(),
            'dengue' => $f(),
            'hemofilia' => $f(),
            'otros' => $faker->text(),
        ];

        $respiratorios = [
            'ciaonosis' => $f(),
            'hemoptisis' => $f(),
            'esputos' => $f(),
            'enfisema_pulmonar' => $f(),
            'asma' => $f(),
            'asfixia' => $f(),
            'tos_frecuente' => $f(),
            'rinitis' => $f(),
            'sonido_anormal' => $f(),
            'inf_respiratorias' => $f(),
            'otros' => $faker->text(),
        ];

        $endocrinos = [
            'poliuria' => $f(),
            'polidipsia' => $f(),
            'polifagia' => $f(),
            'variacion_peso' => $f(),
            'irritabilidad' => $f(),
            'sudoracion_excesiva' => $f(),
            'diabetes' => $f(),
            'intolerancia_frio' => $f(),
            'hipoglicemia' => $f(),
            'hipertiroidismo' => $f(),
            'adenopatia' => $f(),
            'hipotiroidismo' => $f(),
            'otros' => $faker->text(),
        ];

        $gastrointestinales = [
            'diarrea' => $f(),
            'flatulencia' => $f(),
            'acidez' => $f(),
            'nauseas' => $f(),
            'vomitos' => $f(),
            'ulceras' => $f(),
            'dolor_estomacal' => $f(),
            'gastritis' => $f(),
            'parasitos' => $f(),
            'reflujo_gastrico' => $f(),
            'gastroenteritis' => $f(),
            'colon_irritable' => $f(),
            'cirrosis_hepatica' => $f(),
            'estrenimiento' => $f(),
            'otros' => $faker->text()
        ];

        $neurologicos = [
            'convulsiones' => $f(),
            'temblor' => $f(),
            'tic' => $f(),
            'epilepsia' => $f(),
            'cefalea' => $f(),
            'depresion' => $f(),
            'dislexia' => $f(),
            'parkinson' => $f(),
            'alzheimer' => $f(),
            'ecv' => $f(),
            'bulimia' => $f(),
            'anorexia' => $f(),
            'sindrome_down' => $f(),
            'retardo_mental' => $f(),
            'otros' => $faker->text(),
        ];

        $oseos = [
            'deformidades' => $f(),
            'fracturas' => $f(),
            'escleroticas_azules' => $f(),
            'artritis' => $f(),
            'dificultad_movimiento' => $f(),
            'osteoporosis' => $f(),
            'osteomelitis' => $f(),
            'otros' => $faker->text(),
        ];

        $ginecologicos = [
            'embarazo' => $f(),
            'menstruacion' => $f(),
            'abortos' => $f(),
            'menopausia' => $f(),
            'otros' => $faker->text(),
        ];

        $urologicos = [
            'insuficiencia_renal' => $f(),
            'colico_nefritico' => $f(),
            'cancer_prostata' => $f(),
            'andropausia' => $f(),
            'otros' => $faker->text(),
        ];

        $infectocontagiosa = [
            'parotiditis' => $f(),
            'tuberculosis' => $f(),
            'vih_sida' => $f(),
            'blenorragia' => $f(),
            'sifilis' => $f(),
            'herpes' => $f(),
            'hepatitis_abc' => $f(),
            'influenza' => $f(),
            'vhp' => $f(),
            'rubeola' => $f(),
            'varicela' => $f(),
            'sarampion' => $f(),
            'covid' => $f(),
            'otros' => $faker->text(),
        ];

        return [
            'cardiovasculares' => json_encode($cardiovasculares),
            'hematologicos' => json_encode($hematologicos),
            'respiratorios' => json_encode($respiratorios),
            'endocrinos' => json_encode($endocrinos),
            'gastrointestinales' => json_encode($gastrointestinales),
            'neurologicos' => json_encode($neurologicos),
            'oseos' => json_encode($oseos),
            'ginecologicos' => json_encode($ginecologicos),
            'urologicos' => json_encode($urologicos),
            'infectocontagiosa' => json_encode($infectocontagiosa),
        ];
    }
}
