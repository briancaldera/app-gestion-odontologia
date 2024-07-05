<?php

namespace App\Http\Requests;

use App\Models\Historia;
use App\Models\Trastornos;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTrastornosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'historia_id' => ['sometimes', 'required', 'uuid', 'exists:' . Historia::class . ',id', 'unique:' . Trastornos::class],
            'cardiovasculares' => ['sometimes', 'required', 'json'],
            'hematologicos' => ['sometimes', 'required', 'json'],
            'respiratorios' => ['sometimes', 'required', 'json'],
            'endocrinos' => ['sometimes', 'required', 'json'],
            'gastrointestinales' => ['sometimes', 'required', 'json'],
            'neurologicos' => ['sometimes', 'required', 'json'],
            'oseos' => ['sometimes', 'required', 'json'],
            'ginecologicos' => ['sometimes', 'required', 'json'],
            'urologicos' => ['sometimes', 'required', 'json'],
            'infectocontagiosa' => ['sometimes', 'required', 'json'],
            'cardiovasculares.*' => ['sometimes', 'required', 'boolean'],
            'hematologicos.*' => ['sometimes', 'required', 'boolean'],
            'respiratorios.*' => ['sometimes', 'required', 'boolean'],
            'endocrinos.*' => ['sometimes', 'required', 'boolean'],
            'gastrointestinales.*' => ['sometimes', 'required', 'boolean'],
            'neurologicos.*' => ['sometimes', 'required', 'boolean'],
            'oseos.*' => ['sometimes', 'required', 'boolean'],
            'ginecologicos.*' => ['sometimes', 'required', 'boolean'],
            'urologicos.*' => ['sometimes', 'required', 'boolean'],
            'infectocontagiosa.*' => ['sometimes', 'required', 'boolean'],
            'cardiovasculares.otros' => ['sometimes', 'present', 'string', 'max:255'],
            'hematologicos.otros' => ['sometimes', 'present', 'string', 'max:255'],
            'respiratorios.otros' => ['sometimes', 'present', 'string', 'max:255'],
            'endocrinos.otros' => ['sometimes', 'present', 'string', 'max:255'],
            'gastrointestinales.otros' => ['sometimes', 'present', 'string', 'max:255'],
            'neurologicos.otros' => ['sometimes', 'present', 'string', 'max:255'],
            'oseos.otros' => ['sometimes', 'present', 'string', 'max:255'],
            'ginecologicos.otros' => ['sometimes', 'present', 'string', 'max:255'],
            'urologicos.otros' => ['sometimes', 'present', 'string', 'max:255'],
            'infectocontagiosa.otros' => ['sometimes', 'present', 'string', 'max:255'],
        ];
    }
}
