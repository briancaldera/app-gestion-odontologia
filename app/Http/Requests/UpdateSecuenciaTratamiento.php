<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSecuenciaTratamiento extends FormRequest
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
            'secuencia_tratamiento' => ['sometimes', 'required', 'array'],
            'secuencia_tratamiento.secuencia' => ['sometimes', 'array'],
            'secuencia_tratamiento.secuencia.*' => ['sometimes', 'array:fecha,diente,tratamiento,nombre_docente,aprobacion_docente'],
            'secuencia_tratamiento.secuencia.*.fecha' => ['sometimes', 'required', 'date'],
            'secuencia_tratamiento.secuencia.*.diente' => ['sometimes', 'required', 'integer', 'between:18,48'],
            'secuencia_tratamiento.secuencia.*.tratamiento' => ['sometimes', 'required', 'string', 'max:255'],
            'secuencia_tratamiento.secuencia.*.nombre_docente' => ['sometimes', 'required', 'string', 'max:255'],
            'secuencia_tratamiento.secuencia.*.aprobacion_docente' => ['sometimes', 'required', 'boolean'],
        ];
    }
}
