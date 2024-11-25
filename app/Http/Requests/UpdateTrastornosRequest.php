<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTrastornosRequest extends FormRequest
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
            'cardiovasculares' => ['required', 'array'],
            'cardiovasculares.*' => [Rule::in(['disnea', 'cansancio', 'vertigo', 'palpitaciones', 'taquicardia', 'bradicardia', 'varices', 'infarto_miocardio', 'angina_pecho', 'hipertension', 'endocarditis', 'otros'])],
            'hematologicos' => ['required', 'array'],
            'hematologicos.*' => [Rule::in(['palidez', 'ictericia', 'anemia', 'hemorragias', 'hematoma', 'equimosis', 'petequias', 'dengue', 'hemofilia', 'otros'])],
            'respiratorios' => ['required', 'array'],
            'respiratorios.*' => [Rule::in(['ciaonosis', 'hemoptisis', 'esputos', 'enfisema_pulmonar', 'asma', 'asfixia', 'tos_frecuente', 'rinitis', 'sonido_anormal', 'inf_respiratorias', 'otros'])],
            'endocrinos' => ['required', 'array'],
            'endocrinos.*' => [Rule::in(['poliuria', 'polidipsia', 'polifagia', 'variacion_peso', 'irritabilidad', 'sudoracion_excesiva', 'diabetes', 'intolerancia_frio', 'hipoglicemia', 'hipertiroidismo', 'adenopatia', 'hipotiroidismo', 'cirrosis_hepatica', 'otros'])],
            'gastrointestinales' => ['required', 'array'],
            'gastrointestinales.*' => [Rule::in(['diarrea', 'flatulencia', 'acidez', 'nauseas', 'vomitos', 'ulceras', 'dolor_estomacal', 'gastritis', 'parasitos', 'reflujo_gastrico', 'gastroenteritis', 'colon_irritable', 'estrenimiento', 'otros'])],
            'neurologicos' => ['required', 'array'],
            'neurologicos.*' => [Rule::in(['convulsiones', 'temblor', 'tic', 'epilepsia', 'cefalea', 'depresion', 'dislexia', 'parkinson', 'alzheimer', 'ecv', 'bulimia', 'anorexia', 'sindrome_down', 'retardo_mental', 'otros'])],
            'oseos' => ['required', 'array'],
            'oseos.*' => [Rule::in(['deformidades', 'fracturas', 'escleroticas_azules', 'artritis', 'dificultad_movimiento', 'osteoporosis', 'osteomelitis', 'otros'])],
            'ginecologicos' => ['required', 'array'],
            'ginecologicos.*' => [Rule::in(['embarazo', 'menstruacion', 'abortos', 'menopausia', 'otros'])],
            'urologicos' => ['required', 'array'],
            'urologicos.*' => [Rule::in(['insuficiencia_renal', 'colico_nefritico', 'cancer_prostata', 'andropausia', 'otros'])],
            'infectocontagiosa' => ['required', 'array'],
            'infectocontagiosa.*' => [Rule::in(['parotiditis', 'tuberculosis', 'vih_sida', 'blenorragia', 'sifilis', 'herpes', 'hepatitis_abc', 'influenza', 'vhp', 'rubeola', 'varicela', 'sarampion', 'covid', 'otros'])],
            'descripcion' => ['sometimes', 'nullable', 'string', 'max:1000']
        ];
    }
}
