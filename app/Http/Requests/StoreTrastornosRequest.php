<?php

namespace App\Http\Requests;

use App\Models\Historia;
use App\Models\Trastornos;
use Illuminate\Foundation\Http\FormRequest;

class StoreTrastornosRequest extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:' . Historia::class . ',id', 'unique:' . Trastornos::class],
            'cardiovasculares' => ['required', 'json'],
            'hematologicos' => ['required', 'json'],
            'respiratorios' => ['required', 'json'],
            'endocrinos' => ['required', 'json'],
            'gastrointestinales' => ['required', 'json'],
            'neurologicos' => ['required', 'json'],
            'oseos' => ['required', 'json'],
            'ginecologicos' => ['required', 'json'],
            'urologicos' => ['required', 'json'],
            'infectocontagiosa' => ['required', 'json'],
            'cardiovasculares.*' => ['required', 'boolean'],
            'hematologicos.*' => ['required', 'boolean'],
            'respiratorios.*' => ['required', 'boolean'],
            'endocrinos.*' => ['required', 'boolean'],
            'gastrointestinales.*' => ['required', 'boolean'],
            'neurologicos.*' => ['required', 'boolean'],
            'oseos.*' => ['required', 'boolean'],
            'ginecologicos.*' => ['required', 'boolean'],
            'urologicos.*' => ['required', 'boolean'],
            'infectocontagiosa.*' => ['required', 'boolean'],
            'cardiovasculares.otros' => ['present', 'string', 'max:255'],
            'hematologicos.otros' => ['present', 'string', 'max:255'],
            'respiratorios.otros' => ['present', 'string', 'max:255'],
            'endocrinos.otros' => ['present', 'string', 'max:255'],
            'gastrointestinales.otros' => ['present', 'string', 'max:255'],
            'neurologicos.otros' => ['present', 'string', 'max:255'],
            'oseos.otros' => ['present', 'string', 'max:255'],
            'ginecologicos.otros' => ['present', 'string', 'max:255'],
            'urologicos.otros' => ['present', 'string', 'max:255'],
            'infectocontagiosa.otros' => ['present', 'string', 'max:255'],
        ];
    }
}
