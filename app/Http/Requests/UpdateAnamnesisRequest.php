<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAnamnesisRequest extends FormRequest
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
            'anamnesis' => ['required', 'array:visita_medico_ultimos_6_meses,bajo_tratamiento_actual,alergia_medicamento,alergia_material_dental,hospitalizado_alguna_vez,odontologo_ultimos_6_meses,sangrado_al_cepillar,abultamiento_diente,rechina_aprieta_dientes,dolor_CATM,sangrado_excesivo_corte,dificultad_cicatrizacion,cigarrillo_tabaco,alergia_alimento,alergia_enlatados,alergia_yodo,reaccion_anestesia,embarazo,enfermedades,enfermedades_familiares'],
            'anamnesis.*' => ['array:status,description'],
            'anamnesis.*.status' => [Rule::in(['S', 'N', 'D'])],
            'anamnesis.*.description' => ['nullable', 'string', 'max:1000'],
            'anamnesis.enfermedades' => ['array:list,resumen_ant_personales'],
            'anamnesis.enfermedades.list' => ['list'],
            'anamnesis.enfermedades.list.*' => [Rule::in(['hipertension', 'angina_pecho', 'fiebre_reumatica', 'arterioesclerosis', 'endocarditis', 'infarto_miocardio', 'enf_endocrinas', 'diabetes_mellitus', 'hepatitis_cirrosis', 'insuficiencia_renal', 'hipertiroidismo', 'hipotiroidismo', 'convulsiones_desmayos', 'enf_transmision_sexual', 'asma', 'sinusitis', 'anemia', 'artritis', 'gastritis', 'ulcera_gastrica', 'otros',])],
            'anamnesis.enfermedades.resumen_ant_personales' => ['nullable', 'string', 'max:1000'],
            'anamnesis.enfermedades_familiares' => ['array:resumen_ant_familiares,examen_comp'],
            'anamnesis.enfermedades_familiares.resumen_ant_familiares' => ['nullable', 'string', 'max:1000'],
            'anamnesis.enfermedades_familiares.examen_comp' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
