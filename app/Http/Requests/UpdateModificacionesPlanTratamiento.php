<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateModificacionesPlanTratamiento extends FormRequest
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
            'modificaciones_plan_tratamiento' => ['sometimes', 'required', 'array'],
            'modificaciones_plan_tratamiento.modificaciones' => ['sometimes', 'array'],
            'modificaciones_plan_tratamiento.modificaciones.*' => ['sometimes', 'array:fecha,diente,tratamiento,nombre_docente,aprobacion_docente'],
            'modificaciones_plan_tratamiento.modificaciones.*.fecha' => ['sometimes', 'required', 'date'],
            'modificaciones_plan_tratamiento.modificaciones.*.diente' => ['sometimes', 'required', 'integer', 'between:18,48'],
            'modificaciones_plan_tratamiento.modificaciones.*.tratamiento' => ['sometimes', 'nullable', 'required', 'string'],
            'modificaciones_plan_tratamiento.modificaciones.*.nombre_docente' => ['sometimes', 'nullable', 'required', 'string'],
            'modificaciones_plan_tratamiento.modificaciones.*.aprobacion_docente' => ['sometimes', 'required', 'boolean'],
            'modificaciones_plan_tratamiento.paciente' => ['sometimes', 'required', 'string'],
            'modificaciones_plan_tratamiento.firma' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
