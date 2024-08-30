<?php

namespace App\Http\Requests;

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
            'plan_tratamiento' => ['sometimes', 'required', 'array'],
            'plan_tratamiento.plan' => ['sometimes', 'array'],
            'plan_tratamiento.plan.*.diente' => ['sometimes', 'required', 'integer', 'between:18,48'],
            'plan_tratamiento.plan.*.cavidad' => ['sometimes', 'required', 'string', 'max:255'],
            'plan_tratamiento.plan.*.tratamiento' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
