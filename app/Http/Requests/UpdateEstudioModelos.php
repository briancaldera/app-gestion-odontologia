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
            'maxilar_sup' => ['sometimes', 'required', 'array:tipo_arco,forma_arco,simetria_arco,paladar,maloclusion,dientes_ausentes,facetas_desgaste,diastemas,anomalia'],
            'maxilar_sup.*' => ['nullable', 'string'], // Validate each value in maxilar_sup to be string
            'maxilar_inf' => ['sometimes', 'required', 'array:tipo_arco,forma_arco,simetria_arco,piso_boca,maloclusion,dientes_ausentes,facetas_desgaste,diastemas,anomalia'],
            'maxilar_inf.*' => ['nullable', 'string'], // Validate each value in maxilar_inf to be string
            'modelos_oclusion' => ['sometimes', 'required', 'array:linea_media,sobresalte,sobrepase,relacion_canina,relacion_molar,mordida_anterior,mordida_posterior,curva_compensacion,plano_oclusal'],
            'modelos_oclusion.*' => ['nullable', 'string'], // Validate each value in modelos_oclusion to be string
            'examenes_comp' => ['sometimes', 'nullable', 'string'], // examenes_comp can be a simple string
            'interconsultas' => ['sometimes', 'required', 'array'],
            'interconsultas.*' => ['boolean'], // Validate each value in interconsultas to be boolean
            'interconsultas.descripcion' => ['sometimes', 'nullable', 'string'], // Validate each value in interconsultas to be boolean
            'diagnostico' => ['sometimes', 'nullable', 'string'], // diagnostico can be a simple string
            'pronostico' => ['sometimes', 'nullable', 'string'], // pronostico can be a simple string
        ];
    }
}
