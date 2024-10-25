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
            'ant_personales' => ['sometimes', 'nullable', 'string', 'max:255'],

            'portador' => ['required', 'array:ortodoncia,protesis'],
            'portador.*' => ['required', 'boolean'],

            'habitos' => ['sometimes', 'required', 'array'],
            'habitos.*' => ['sometimes', 'boolean'],
            'habitos.descripcion' => ['sometimes', 'nullable', 'string'],


            'examen_fisico' => ['sometimes', 'required', 'array'],
            'examen_fisico.signos_vitales' => ['sometimes', 'required', 'array'],
            'examen_fisico.signos_vitales.tension_arterial' => ['sometimes', 'required', 'array:sistole,diastole'],
            'examen_fisico.signos_vitales.tension_arterial.sistole' => ['sometimes', 'required', 'integer'],
            'examen_fisico.signos_vitales.tension_arterial.diastole' => ['sometimes', 'required', 'integer'],
            'examen_fisico.signos_vitales.pulso' => ['sometimes', 'required', 'integer'],
            'examen_fisico.signos_vitales.respiracion' => ['sometimes', 'required', 'integer'],
            'examen_fisico.signos_vitales.temperatura' => ['sometimes', 'required', 'numeric'],
            'examen_fisico.examen_extraoral' => ['sometimes', 'required', 'array'],
            'examen_fisico.examen_extraoral.*' => ['sometimes', 'nullable', 'string'], // Validate each value in examen_extraoral to be string
            'examen_fisico.examen_intraoral' => ['sometimes', 'required', 'array'],
            'examen_fisico.examen_intraoral.*' => ['sometimes', 'nullable', 'string'], // Validate each value in examen_intraoral to be string
        ];
    }
}
