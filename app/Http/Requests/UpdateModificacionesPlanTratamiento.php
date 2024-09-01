<?php

namespace App\Http\Requests;

use App\Models\Historia;
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
            'historia_id' => ['required', 'uuid', 'exists:' . Historia::class . ',id'],

            'modificaciones_plan_tratamiento' => ['sometimes', 'required', 'array'],
            'modificaciones_plan_tratamiento.*' => ['sometimes', 'required', 'array:fecha,diente,tratamiento'],
            'modificaciones_plan_tratamiento.*.fecha' => ['sometimes', 'required', 'date'],
            'modificaciones_plan_tratamiento.*.diente' => ['sometimes', 'required', 'integer', 'between:18,48'],
            'modificaciones_plan_tratamiento.*.tratamiento' => ['sometimes', 'nullable', 'string', 'max:255'],
//            'modificaciones_plan_tratamiento.*.nombre_docente' => ['sometimes', 'nullable', 'required', 'string'],
//            'modificaciones_plan_tratamiento.*.aprobacion_docente' => ['sometimes', 'required', 'boolean'],
//            'modificaciones_plan_tratamiento.paciente' => ['sometimes', 'required', 'string'],
//            'modificaciones_plan_tratamiento.firma' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
