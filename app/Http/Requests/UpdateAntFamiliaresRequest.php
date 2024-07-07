<?php

namespace App\Http\Requests;

use App\Models\AntFamiliares;
use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAntFamiliaresRequest extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:'.AntFamiliares::class],
            'madre' => ['sometimes', 'nullable', 'string', 'max:255'],
            'padre' => ['sometimes', 'nullable', 'string', 'max:255'],
            'hermanos' => ['sometimes', 'nullable', 'string', 'max:255'],
            'abuelos_maternos' => ['sometimes', 'nullable', 'string', 'max:255'],
            'abuelos_paternos' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
