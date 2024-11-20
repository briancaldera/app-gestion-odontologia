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
            'secuencia_tratamiento' => ['sometimes', 'required', 'list'],
            'secuencia_tratamiento.*' => ['array:fecha,diente,tratamiento'],
            'secuencia_tratamiento.*.fecha' => ['required', 'date'],
            'secuencia_tratamiento.*.diente' => ['required', 'string', 'max:100'],
            'secuencia_tratamiento.*.tratamiento' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
