<?php

namespace App\Http\Requests;

use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHistoriaOdontologicaRequest extends FormRequest
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
            'historia_id' => ['sometimes', 'required', 'uuid', 'exists:' . Historia::class . ',id', 'unique:' . HistoriaOdontologica::class],
            'ant_personales' => ['sometimes', 'present', 'string', 'max:255'],

            'portador' => ['required', 'array:ortodoncia,protesis'],
            'portador.*' => ['required', 'boolean'],

            'habitos' => ['sometimes', 'required', 'json', 'array'],
            'habitos.*' => ['sometimes', 'boolean'],
            'habitos.descripcion' => ['sometimes', 'string'],


            'examen_fisico' => ['sometimes', 'required', 'json', 'array'],
            'examen_fisico.signos_vitales' => ['sometimes', 'required', 'array'],
            'examen_fisico.signos_vitales.tension_arterial' => ['sometimes', 'required', 'array:sistole,diastole'],
            'examen_fisico.signos_vitales.tension_arterial.sistole' => ['sometimes', 'required', 'integer'],
            'examen_fisico.signos_vitales.tension_arterial.diastole' => ['sometimes', 'required', 'integer'],
            'examen_fisico.signos_vitales.pulso' => ['sometimes', 'required', 'integer'],
            'examen_fisico.signos_vitales.respiracion' => ['sometimes', 'required', 'integer'],
            'examen_fisico.signos_vitales.temperatura' => ['sometimes', 'required', 'numeric'],
            'examen_fisico.examen_extraoral' => ['sometimes', 'required', 'array'],
            'examen_fisico.examen_extraoral.*' => ['sometimes', 'string'], // Validate each value in examen_extraoral to be string
            'examen_fisico.examen_intraoral' => ['sometimes', 'required', 'array'],
            'examen_fisico.examen_intraoral.*' => ['sometimes', 'string'], // Validate each value in examen_intraoral to be string


            'estudio_modelos' => ['sometimes', 'required', 'json', 'array'],
            'estudio_modelos.maxilar_sup' => ['sometimes', 'required', 'array'],
            'estudio_modelos.maxilar_sup.*' => ['sometimes', 'string'], // Validate each value in maxilar_sup to be string
            'estudio_modelos.maxilar_inf' => ['sometimes', 'required', 'array'],
            'estudio_modelos.maxilar_inf.*' => ['sometimes', 'string'], // Validate each value in maxilar_inf to be string
            'estudio_modelos.modelos_oclusion' => ['sometimes', 'required', 'array'],
            'estudio_modelos.modelos_oclusion.*' => ['sometimes', 'string'], // Validate each value in modelos_oclusion to be string
            'estudio_modelos.examenes_comp' => ['sometimes', 'string'], // examenes_comp can be a simple string
            'estudio_modelos.interconsultas' => ['sometimes', 'required', 'array'],
            'estudio_modelos.interconsultas.*' => ['sometimes', 'boolean'], // Validate each value in interconsultas to be boolean
            'estudio_modelos.interconsultas.descripcion' => ['sometimes', 'string'], // Validate each value in interconsultas to be boolean
            'estudio_modelos.diagnostico' => ['sometimes', 'string'], // diagnostico can be a simple string
            'estudio_modelos.pronostico' => ['sometimes', 'string'], // pronostico can be a simple string


            'plan_tratamiento' => ['sometimes', 'required', 'json', 'array'],
            'plan_tratamiento.plan' => ['sometimes', 'array'],
            'plan_tratamiento.plan.*.diente' => ['sometimes', 'required', 'integer', 'between:18,48'],
            'plan_tratamiento.plan.*.cavidad' => ['sometimes', 'required', 'string', 'max:255'],
            'plan_tratamiento.plan.*.tratamiento' => ['sometimes', 'required', 'string'],


            'modificaciones_plan_tratamiento' => ['sometimes', 'required', 'json', 'array'],
            'modificaciones_plan_tratamiento.modificaciones' => ['sometimes', 'array'],
            'modificaciones_plan_tratamiento.modificaciones.*.fecha' => ['sometimes', 'required', 'date'],
            'modificaciones_plan_tratamiento.modificaciones.*.diente' => ['sometimes', 'required', 'integer', 'between:18,48'],
            'modificaciones_plan_tratamiento.modificaciones.*.tratamiento' => ['sometimes', 'required', 'string'],
            'modificaciones_plan_tratamiento.modificaciones.*.nombre_docente' => ['sometimes', 'required', 'string'],
            'modificaciones_plan_tratamiento.modificaciones.*.aprobacion_docente' => ['sometimes', 'required', 'boolean'],
            'modificaciones_plan_tratamiento.paciente' => ['sometimes', 'required', 'string'],
            'modificaciones_plan_tratamiento.firma' => ['sometimes', 'nullable', 'string'],


            'secuencia_tratamiento' => ['sometimes', 'required', 'json', 'array'],
            'secuencia_tratamiento.secuencia' => ['sometimes', 'array'],
            'secuencia_tratamiento.secuencia.*.fecha' => ['sometimes', 'required', 'date'],
            'secuencia_tratamiento.secuencia.*.diente' => ['sometimes', 'required', 'integer', 'between:18,48'],
            'secuencia_tratamiento.secuencia.*.tratamiento' => ['sometimes', 'required', 'string'],
            'secuencia_tratamiento.secuencia.*.nombre_docente' => ['sometimes', 'required', 'string'],
            'secuencia_tratamiento.secuencia.*.aprobacion_docente' => ['sometimes', 'required', 'boolean'],
        ];
    }
}
