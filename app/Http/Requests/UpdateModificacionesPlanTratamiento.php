<?php

namespace App\Http\Requests;

use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;

class UpdateModificacionesPlanTratamiento extends FormRequest
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
            'modificaciones_plan_tratamiento' => ['sometimes', 'required', 'list'],
            'modificaciones_plan_tratamiento.*' => ['array:fecha,diente,tratamiento'],
            'modificaciones_plan_tratamiento.*.fecha' => ['required', 'date'],
            'modificaciones_plan_tratamiento.*.diente' => ['required', 'string', 'max:100'],
            'modificaciones_plan_tratamiento.*.tratamiento' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
