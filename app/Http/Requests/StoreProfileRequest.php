<?php

namespace App\Http\Requests;

use App\Models\Profile;
use Illuminate\Foundation\Http\FormRequest;

class StoreProfileRequest extends FormRequest
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
            'cedula' => ['required', 'string', 'alpha_num:ascii', 'between:4, 10','regex:/^[VE][\d]{3,9}$/', 'unique:'. Profile::class],
            'nombres' => ['required', 'string', 'max:100'],
            'apellidos' => ['required', 'string', 'max:100'],
            'fecha_nacimiento' => ['required', 'date', 'before:today'],
            'telefono' => ['nullable', 'regex:/^[\d]{4}-[\d]{7}$/'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'sexo' => ['required', 'string', 'alpha:ascii', 'regex:/^[M|F|NI]$/'],
            'picture' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'between:2, 1024'],
        ];
    }
}
