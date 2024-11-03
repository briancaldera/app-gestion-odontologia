<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEvaluacionDolorRequest extends FormRequest
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
            'evaluacion_dolor' => ['array:dolor_presente,diente_dolor,primeros_sintomas,aparicion_sintomas,intensidad_frecuencia_calidad_dolor,alivio_dolor,farmaco_alivio_dolor,agravo_dolor,diente_sensible_al_comer,dolor_al_masticar,dolor_momento_dia'],
            'evaluacion_dolor.*' => ['array:status,description'],
            'evaluacion_dolor.*.status' => [Rule::in(['S', 'N', 'D'])],
            'evaluacion_dolor.*.description' => ['nullable', 'string', 'max:1000'],
            'evaluacion_dolor.primeros_sintomas' => ['nullable', 'string', 'max:1000'],
            'evaluacion_dolor.aparicion_sintomas' => ['nullable', 'string', 'max:1000'],
            'evaluacion_dolor.intensidad_frecuencia_calidad_dolor' => ['array:intensidad,frecuencia,calidad'],
            'evaluacion_dolor.intensidad_frecuencia_calidad_dolor.intensidad' => ['numeric', 'integer', 'between:0,10'],
            'evaluacion_dolor.intensidad_frecuencia_calidad_dolor.frecuencia' => ['nullable', Rule::in(['constante', 'intermitente', 'momentaneo', 'ocasional', null])],
            'evaluacion_dolor.intensidad_frecuencia_calidad_dolor.calidad' => ['nullable', Rule::in(['agudo', 'sordo', 'pulsatil', null])],
            'evaluacion_dolor.diente_sensible_al_comer' => ['list'],
            'evaluacion_dolor.diente_sensible_al_comer.*' => [Rule::in(['calor', 'frio', 'dulces'])],
            'evaluacion_dolor.dolor_momento_dia' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
