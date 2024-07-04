<?php

namespace App\Http\Requests;

use App\Models\Historia;
use App\Models\Paciente;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHistoriaRequest extends FormRequest
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
            'paciente_id' => ['sometimes', 'required', 'string', 'uuid', 'exists:'.Paciente::class.',id', 'unique:'.Historia::class],
            'numero' => ['sometimes', 'nullable', 'string'], //todo: define details about numero de solicitud with admision
            'motivo_consulta' => ['sometimes', 'required', 'string', 'max:255'],
            'enfermedad_actual' => ['sometimes', 'required', 'string', 'max:255'],
        ];
    }
}
