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

            'habitos' => ['sometimes', 'array:cigarrillo_tabaco,consumir_carbo_azucares,morder_objetos,muerde_unas_labios,rechina_aprieta_dientes'],
            'habitos.*' => ['array:status,description'],
            'habitos.*.status' => [Rule::in(['S', 'N', 'D'])],
            'habitos.*.description' => ['nullable', 'string', 'max:1000'],

            'femenino' => ['sometimes', 'array:anticonceptivos,embarazo,ginecologo_ultimos_6_meses,menopausia,menstruacion_dolorosa,menstruacion_regular'],
            'femenino.*' => ['array:status,description'],
            'femenino.*.status' => [Rule::in(['S', 'N', 'D'])],
            'femenino.*.description' => ['nullable', 'string', 'max:1000'],

            'antecedentes' => ['sometimes', 'array:ant_personales,ant_familiares,ant_familiares_enfermedades'],
            'antecedentes.ant_personales' => ['nullable', 'string', 'max:1000'],
            'antecedentes.ant_familiares' => ['nullable', 'string', 'max:1000'],
            'antecedentes.ant_familiares_enfermedades' => ['list'],
            'antecedentes.ant_familiares_enfermedades.*' => [Rule::in(['diabetes', 'hepatitis_abc', 'artritis', 'asma_EPOC', 'anemia', 'infarto', "enfermedades_pulmonares", 'hipertiroidismo', 'hipotiroidismo', 'convulsiones_desmayos', 'hipertension', 'hipotension', 'sinusitis', 'angina_pecho', 'fiebre_reumatica', 'gastritis', 'ulcera_gastrica', 'enf_transmision_sexual', 'arterioesclerosis', 'alt_metabolicas', 'enf_endocrinas', 'otros',])],

            'examen_fisico' => ['sometimes', 'array:extraoral,intraoral'],
            'examen_fisico.extraoral' => ['array:cuello,cuero_cabelludo,labios,ojos,orejas,otros,piel'],
            'examen_fisico.extraoral.*' => ['nullable', 'string', 'max:1000'],
            'examen_fisico.intraoral' => ['array:carrillos,encias,frenillos,lengua,otros,paladar_blando,paladar_duro,piso_boca'],
            'examen_fisico.intraoral.*' => ['nullable', 'string', 'max:1000'],

            'observaciones' => ['sometimes', 'nullable', 'string', 'max:1000'],

            'estudios_radiograficos' => ['sometimes', 'array:panoramica,periapical,tension,exam_comp,diagnostico,plan_tratamiento'],
            'estudios_radiograficos.*' => ['nullable', 'string', 'max:1000'],
            'estudios_radiograficos.tension' => ['array:sistole,diastole,PPM'],
            'estudios_radiograficos.tension.*' => ['nullable', 'string', 'max:100'],
        ];
    }
}
