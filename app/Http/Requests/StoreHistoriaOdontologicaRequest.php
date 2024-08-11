<?php

namespace App\Http\Requests;

use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use Illuminate\Foundation\Http\FormRequest;

class StoreHistoriaOdontologicaRequest extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:' . Historia::class . ',id', 'unique:' . HistoriaOdontologica::class],
            'ant_personales' => ['string', 'max:255'],

            'portador' => ['required', 'array:ortodoncia,protesis'],
            'portador.*' => ['required', 'boolean'],

            'habitos' => ['required', 'json', 'array'],
            'habitos.*' => ['boolean'],
            'habitos.descripcion' => ['string'],


            'examen_fisico' => ['required', 'json', 'array'],
            'examen_fisico.signos_vitales' => ['required', 'array'],
            'examen_fisico.signos_vitales.tension_arterial' => ['required', 'array:sistole,diastole'],
            'examen_fisico.signos_vitales.tension_arterial.sistole' => ['required', 'integer'],
            'examen_fisico.signos_vitales.tension_arterial.diastole' => ['required', 'integer'],
            'examen_fisico.signos_vitales.pulso' => ['required', 'integer'],
            'examen_fisico.signos_vitales.respiracion' => ['required', 'integer'],
            'examen_fisico.signos_vitales.temperatura' => ['required', 'numeric'],
            'examen_fisico.examen_extraoral' => ['required', 'array'],
            'examen_fisico.examen_extraoral.*' => ['string'], // Validate each value in examen_extraoral to be string
            'examen_fisico.examen_intraoral' => ['required', 'array'],
            'examen_fisico.examen_intraoral.*' => ['string'], // Validate each value in examen_intraoral to be string


            'estudio_modelos' => ['required', 'json', 'array'],
            'estudio_modelos.maxilar_sup' => ['required', 'array'],
            'estudio_modelos.maxilar_sup.*' => ['string'], // Validate each value in maxilar_sup to be string
            'estudio_modelos.maxilar_inf' => ['required', 'array'],
            'estudio_modelos.maxilar_inf.*' => ['string'], // Validate each value in maxilar_inf to be string
            'estudio_modelos.modelos_oclusion' => ['required', 'array'],
            'estudio_modelos.modelos_oclusion.*' => ['string'], // Validate each value in modelos_oclusion to be string
            'estudio_modelos.examenes_comp' => ['string'], // examenes_comp can be a simple string
            'estudio_modelos.interconsultas' => ['required', 'array'],
            'estudio_modelos.interconsultas.*' => ['boolean'], // Validate each value in interconsultas to be boolean
            'estudio_modelos.interconsultas.descripcion' => ['string'], // Validate each value in interconsultas to be boolean
            'estudio_modelos.diagnostico' => ['string'], // diagnostico can be a simple string
            'estudio_modelos.pronostico' => ['string'], // pronostico can be a simple string


            'plan_tratamiento' => ['required', 'json', 'array'],
            'plan_tratamiento.plan' => ['array'],
            'plan_tratamiento.plan.*.diente' => ['required', 'integer', 'between:18,48'],
            'plan_tratamiento.plan.*.cavidad' => ['required', 'string', 'max:255'],
            'plan_tratamiento.plan.*.tratamiento' => ['required', 'string'],


            'modificaciones_plan_tratamiento' => ['required', 'json', 'array'],
            'modificaciones_plan_tratamiento.modificaciones' => ['array'],
            'modificaciones_plan_tratamiento.modificaciones.*.fecha' => ['required', 'date'],
            'modificaciones_plan_tratamiento.modificaciones.*.diente' => ['required', 'integer', 'between:18,48'],
            'modificaciones_plan_tratamiento.modificaciones.*.tratamiento' => ['required', 'string'],
            'modificaciones_plan_tratamiento.modificaciones.*.nombre_docente' => ['required', 'string'],
            'modificaciones_plan_tratamiento.modificaciones.*.aprobacion_docente' => ['required', 'boolean'],
            'modificaciones_plan_tratamiento.paciente' => ['required', 'string'],
            'modificaciones_plan_tratamiento.firma' => ['nullable', 'string'],


            'secuencia_tratamiento' => ['required', 'json', 'array'],
            'secuencia_tratamiento.secuencia' => ['array'],
            'secuencia_tratamiento.secuencia.*.fecha' => ['required', 'date'],
            'secuencia_tratamiento.secuencia.*.diente' => ['required', 'integer', 'between:18,48'],
            'secuencia_tratamiento.secuencia.*.tratamiento' => ['required', 'string'],
            'secuencia_tratamiento.secuencia.*.nombre_docente' => ['required', 'string'],
            'secuencia_tratamiento.secuencia.*.aprobacion_docente' => ['required', 'boolean'],
        ];
    }
}
