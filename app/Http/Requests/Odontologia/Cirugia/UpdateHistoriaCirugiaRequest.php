<?php

namespace App\Http\Requests\Odontologia\Cirugia;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHistoriaCirugiaRequest extends FormRequest
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
            'anamnesis' => ['sometimes', 'array:visita_medico_ultimos_6_meses,bajo_tratamiento_actual,alergia_medicamento,hospitalizado_alguna_vez,enfermedad_sistemica,odontologo_ultimos_6_meses,dolor_ATM_levantarse,limitaciones_apertura_cierre_bucal,rechina_aprieta_dientes,sangrado_al_cepillar,miccion_nocturna,apetito_excesivo,depresion,agitacion,migrana,dieta_especial,alergia_enlatados,reaccion_anestesia,diente_dolor,dificultad_cicatrizacion,reaccion_medicamento,alergia_yodo,enfermedades'],
            'anamnesis.*' => ['array:status,description'],
            'anamnesis.*.status' => [Rule::in(['S', 'N', 'D'])],
            'anamnesis.*.description' => ['nullable', 'string', 'max:1000'],
            'anamnesis.reaccion_medicamento' => ['array:list,status,description'],
            'anamnesis.reaccion_medicamento.list' => ['list'],
            'anamnesis.reaccion_medicamento.status' => [Rule::in(['S', 'N', 'D'])],
            'anamnesis.reaccion_medicamento.description' => ['nullable', 'string', 'max:1000'],
            'anamnesis.enfermedades' => ['array:list,otros'],
            'anamnesis.enfermedades.list' => ['list'],
            'anamnesis.enfermedades.list.*' => [Rule::in(['diabetes', 'hepatitis_abc', 'artritis', 'asma_EPOC', 'anemia', 'infarto', "enfermedades_pulmonares", 'hipertiroidismo', 'hipotiroidismo', 'convulsiones_desmayos', 'hipertension', 'hipotension', 'sinusitis', 'angina_pecho', 'fiebre_reumatica', 'gastritis', 'ulcera_gastrica', 'enf_transmision_sexual', 'arterioesclerosis', 'alt_metabolicas', 'enf_endocrinas', 'otros',])],
            'anamnesis.enfermedades.otros' => ['nullable', 'string', 'max:1000'],


        ];
    }
}
