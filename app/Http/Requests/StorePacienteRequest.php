<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StorePacienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Will handle authorization through policy.
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
            'cedula' => ['required', 'string', 'alpha:ascii', 'between:4, 10','regex:/^[VE][\d]{3,9}$/', 'unique:App\Model\Paciente,cedula'],
            'nombre' => ['required', 'string', 'alpha', 'between:2, 50'],
            'apellido' => ['required', 'string', 'alpha', 'between:2, 50'],
            'edad' => ['required', 'numeric', 'integer', 'min:0', 'max:150'],
            'sexo' => ['required', 'string', 'alpha:ascii', 'size:1', 'regex:/^[M|F]$/'],
            'peso' => ['required', 'numeric', 'min:0', 'max:300','decimal:2'],
            'fecha_nacimiento' => ['required', 'date', 'before:today'],
            'ocupacion' => ['required', 'string', 'alpha', 'between:0, 50'],
            'direccion' => ['string', 'between:3, 100'],
            'telefono' => ['nullable', 'string', 'between:0, 15', 'regex:/^[\d]{4}-[\d]{7}$/'],
            'foto' => ['sometimes', 'nullable', 'image', 'dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000', 'min:50', 'max:2000'],
        ];
    }
}
