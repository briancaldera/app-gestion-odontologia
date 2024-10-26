<?php

namespace App\Http\Requests;

use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'maxilar_sup.*' => ['nullable', 'string', 'max:1000'],
            'maxilar_inf' => ['sometimes', 'required', 'array:tipo_arco,forma_arco,simetria_arco,piso_boca,maloclusion,dientes_ausentes,facetas_desgaste,diastemas,anomalia'],
            'maxilar_inf.*' => ['nullable', 'string', 'max:1000'],
            'modelos_oclusion' => ['sometimes', 'required', 'array:linea_media,sobresalte,sobrepase,relacion_canina,relacion_molar,mordida_anterior,mordida_posterior,curva_compensacion,plano_oclusal'],
            'modelos_oclusion.*' => ['nullable', 'string', 'max:1000'],

            'examenes_comp' => ['sometimes', 'nullable', 'string', 'max:1000'],

            'interconsultas' => ['sometimes', 'array:list,descripcion'],
            'interconsultas.list' => ['list'],
            'interconsultas.list.*' => [Rule::in(['cirugia','periodoncia','endodoncia','protesis','ortodoncia'])],
            'interconsultas.descripcion' => ['nullable', 'string', 'max:1000'],

            'diagnostico' => ['sometimes', 'nullable', 'string', 'max:1000'],
            'pronostico' => ['sometimes', 'nullable', 'string', 'max:1000'],
        ];
    }
}
