<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreControlPlaca extends FormRequest
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
            'control_placa' => ['array:quadrant_1,quadrant_2,quadrant_3,quadrant_4'],
            'control_placa.*' => ['list', 'size:8'],
            'control_placa.*.*' => ['array:id,present,surfaces'],
            'control_placa.*.*.id' => ['integer', 'between:11,48'],
            'control_placa.*.*.present' => ['boolean'],
            'control_placa.*.*.surfaces' => ['array:back,front,left,right'],
            'control_placa.*.*.surfaces.*' => ['boolean'],
        ];
    }
}
