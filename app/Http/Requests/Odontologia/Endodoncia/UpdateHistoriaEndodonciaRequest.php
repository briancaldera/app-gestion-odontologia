<?php

namespace App\Http\Requests\Odontologia\Endodoncia;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHistoriaEndodonciaRequest extends FormRequest
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

            'consentimiento' => ['sometimes', 'image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000'],

            'periodontodiagrama' => ['sometimes', 'image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000'],
        ];
    }
}
