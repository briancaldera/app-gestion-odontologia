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
        ];
    }
}
