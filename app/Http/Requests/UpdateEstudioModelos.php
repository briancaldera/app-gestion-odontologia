<?php

namespace App\Http\Requests;

use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEstudioModelos extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:' . Historia::class . ',id'],

            'estudio_modelos' => ['sometimes', 'required', 'array:maxilar_sup,maxilar_inf,modelos_oclusion,examenes_comp,interconsultas,diagnostico,pronostico'],
            'estudio_modelos.maxilar_sup' => ['sometimes', 'required', 'array'],
            'estudio_modelos.maxilar_sup.*' => ['sometimes', 'nullable', 'string'], // Validate each value in maxilar_sup to be string
            'estudio_modelos.maxilar_inf' => ['sometimes', 'required', 'array'],
            'estudio_modelos.maxilar_inf.*' => ['sometimes', 'nullable', 'string'], // Validate each value in maxilar_inf to be string
            'estudio_modelos.modelos_oclusion' => ['sometimes', 'required', 'array'],
            'estudio_modelos.modelos_oclusion.*' => ['sometimes', 'nullable', 'string'], // Validate each value in modelos_oclusion to be string
            'estudio_modelos.examenes_comp' => ['sometimes', 'nullable', 'string'], // examenes_comp can be a simple string
            'estudio_modelos.interconsultas' => ['sometimes', 'required', 'array'],
            'estudio_modelos.interconsultas.*' => ['sometimes', 'boolean'], // Validate each value in interconsultas to be boolean
            'estudio_modelos.interconsultas.descripcion' => ['sometimes', 'nullable', 'string'], // Validate each value in interconsultas to be boolean
            'estudio_modelos.diagnostico' => ['sometimes', 'nullable', 'string'], // diagnostico can be a simple string
            'estudio_modelos.pronostico' => ['sometimes', 'nullable', 'string'], // pronostico can be a simple string
        ];
    }
}
