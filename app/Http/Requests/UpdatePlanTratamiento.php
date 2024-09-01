<?php

namespace App\Http\Requests;

use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePlanTratamiento extends FormRequest
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

            'plan_tratamiento' => ['sometimes', 'required', 'array'],
            'plan_tratamiento.*.diente' => ['sometimes', 'required', 'integer', 'between:18,48'],
            'plan_tratamiento.*.cavidad' => ['sometimes', 'required', 'string', 'max:255'],
            'plan_tratamiento.*.tratamiento' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
