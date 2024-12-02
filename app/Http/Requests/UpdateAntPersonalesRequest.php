<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAntPersonalesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'medicamentos' => ['sometimes', 'array:tipo,dosis'],
            'medicamentos.tipo' => ['sometimes', 'array'],
            'medicamentos.tipo.*' => [Rule::in(['antihipertensivos', 'analgesicos', 'esteroides', 'antidepresivos', 'anticonceptivos', 'hipoglicemiante', 'anticonvulsivos', 'sildenafil', 'acido_acetilsalicilico', 'anticoagulante', 'bifosfanato_calcio', 'otros'])],
            'medicamentos.dosis' => ['nullable', 'string', 'max:1000'],

            'alergias' => ['sometimes', 'array:tipo,descripcion'],
            'alergias.tipo' => ['sometimes', 'array'],
            'alergias.tipo.*' => [Rule::in(['antibioticos', 'analgesicos', 'anestesicos', 'yodo', 'otros'])],
            'alergias.descripcion' => ['nullable', 'string', 'max:1000'],

            'trastornos' => ['sometimes', 'array:cardiovasculares,hematologicos,respiratorios,endocrinos,gastrointestinales,neurologicos,oseos,ginecologicos,urologicos,infectocontagiosa,descripcion'],
            'trastornos.cardiovasculares' => ['sometimes', 'array'],
            'trastornos.cardiovasculares.*' => [Rule::in(['disnea', 'cansancio', 'vertigo', 'palpitaciones', 'taquicardia', 'bradicardia', 'varices', 'infarto_miocardio', 'angina_pecho', 'hipertension', 'endocarditis', 'otros'])],
            'trastornos.hematologicos' => ['sometimes', 'array'],
            'trastornos.hematologicos.*' => [Rule::in(['palidez', 'ictericia', 'anemia', 'hemorragias', 'hematoma', 'equimosis', 'petequias', 'dengue', 'hemofilia', 'otros'])],
            'trastornos.respiratorios' => ['sometimes', 'array'],
            'trastornos.respiratorios.*' => [Rule::in(['ciaonosis', 'hemoptisis', 'esputos', 'enfisema_pulmonar', 'asma', 'asfixia', 'tos_frecuente', 'rinitis', 'sonido_anormal', 'inf_respiratorias', 'otros'])],
            'trastornos.endocrinos' => ['sometimes', 'array'],
            'trastornos.endocrinos.*' => [Rule::in(['poliuria', 'polidipsia', 'polifagia', 'variacion_peso', 'irritabilidad', 'sudoracion_excesiva', 'diabetes', 'intolerancia_frio', 'hipoglicemia', 'hipertiroidismo', 'adenopatia', 'hipotiroidismo', 'otros'])],
            'trastornos.gastrointestinales' => ['sometimes', 'array'],
            'trastornos.gastrointestinales.*' => [Rule::in(['diarrea', 'flatulencia', 'acidez', 'nauseas', 'vomitos', 'ulceras', 'dolor_estomacal', 'gastritis', 'parasitos', 'reflujo_gastrico', 'gastroenteritis', 'colon_irritable', 'cirrosis_hepatica', 'estrenimiento', 'otros'])],
            'trastornos.neurologicos' => ['sometimes', 'array'],
            'trastornos.neurologicos.*' => [Rule::in(['convulsiones', 'temblor', 'tic', 'epilepsia', 'cefalea', 'depresion', 'dislexia', 'parkinson', 'alzheimer', 'ecv', 'bulimia', 'anorexia', 'sindrome_down', 'retardo_mental', 'otros'])],
            'trastornos.oseos' => ['sometimes', 'array'],
            'trastornos.oseos.*' => [Rule::in(['deformidades', 'fracturas', 'escleroticas_azules', 'artritis', 'dificultad_movimiento', 'osteoporosis', 'osteomelitis', 'otros'])],
            'trastornos.ginecologicos' => ['sometimes', 'array'],
            'trastornos.ginecologicos.*' => [Rule::in(['embarazo', 'menstruacion', 'abortos', 'menopausia', 'otros'])],
            'trastornos.urologicos' => ['sometimes', 'array'],
            'trastornos.urologicos.*' => [Rule::in(['insuficiencia_renal', 'colico_nefritico', 'cancer_prostata', 'andropausia', 'otros'])],
            'trastornos.infectocontagiosa' => ['sometimes', 'array'],
            'trastornos.infectocontagiosa.*' => [Rule::in(['parotiditis', 'tuberculosis', 'vih_sida', 'blenorragia', 'sifilis', 'herpes', 'hepatitis_abc', 'influenza', 'vhp', 'rubeola', 'varicela', 'sarampion', 'covid', 'otros'])],
            'trastornos.descripcion' => ['sometimes', 'nullable', 'string', 'max:1000']
        ];
    }
}
