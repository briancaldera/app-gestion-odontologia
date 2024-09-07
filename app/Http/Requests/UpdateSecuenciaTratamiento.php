<?php

namespace App\Http\Requests;

use App\Models\Historia;
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
            'historia_id' => ['required', 'uuid', 'exists:' . Historia::class . ',id'],

            'secuencia_tratamiento' => ['sometimes', 'required', 'array'],
            'secuencia_tratamiento.*' => ['sometimes', 'array:fecha,diente,tratamiento'],
            'secuencia_tratamiento.*.fecha' => ['sometimes', 'required', 'date'],
            'secuencia_tratamiento.*.diente' => ['sometimes', 'required', 'string', 'max:100'],
            'secuencia_tratamiento.*.tratamiento' => ['sometimes', 'nullable', 'string', 'max:1000'],
//            'secuencia_tratamiento.secuencia.*.nombre_docente' => ['sometimes', 'required', 'string', 'max:255'],
//            'secuencia_tratamiento.secuencia.*.aprobacion_docente' => ['sometimes', 'required', 'boolean'],
        ];
    }
}
