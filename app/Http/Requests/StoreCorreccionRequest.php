<?php

namespace App\Http\Requests;

use App\Models\Correccion;
use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;

class StoreCorreccionRequest extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:' . Historia::class . ',id', 'unique:' . Correccion::class],
            'message' => ['required', 'string', 'max:1000'],
        ];
    }
}
