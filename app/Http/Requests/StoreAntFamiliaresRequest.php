<?php

namespace App\Http\Requests;

use App\Models\AntFamiliares;
use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;

class StoreAntFamiliaresRequest extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:'.Historia::class.',id', 'unique:'.AntFamiliares::class],
            'madre' => ['required', 'string', 'max:255'],
            'padre' => ['required', 'string', 'max:255'],
            'hermanos' => ['required', 'string', 'max:255'],
            'abuelos_maternos' => ['required', 'string', 'max:255'],
            'abuelos_paternos' => ['required', 'string', 'max:255'],
        ];
    }
}
