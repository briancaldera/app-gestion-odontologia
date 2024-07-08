<?php

namespace App\Http\Requests;

use App\Models\AntPersonales;
use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;

class StoreAntPersonalesRequest extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:'.Historia::class.',id', 'unique:'.AntPersonales::class],

            'medicamentos' => ['required', 'json'],
            'medicamentos.*' => ['array:positivo,dosis'],
            'medicamentos.*.positivo' => ['required', 'boolean'],
            'medicamentos.*.dosis' => ['nullable', 'numeric', 'decimal:0,2'],

            'medicamentos.otros' => ['array:positivo,descripcion'],
            'medicamentos.otros.positivo' => ['sometimes', 'required', 'boolean'],
            'medicamentos.otros.descripcion' => ['sometimes', 'required', 'string', 'max:255'],

            'alergias' => ['required', 'json'],
            'alergias.otros' => ['array:positivo,descripcion'],
            'alergias.otros.positivo' => ['boolean'],
            'alergias.otros.descripcion' => ['string', 'max:255'],
            'alergias.*' => ['required', 'boolean'],
        ];
    }
}
