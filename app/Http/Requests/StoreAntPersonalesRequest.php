<?php

namespace App\Http\Requests;

use App\Models\AntPersonales;
use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;

class StoreAntPersonalesRequest extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:'.Historia::class.',id', 'unique:'.AntPersonales::class],
            'medicamentos' => ['required', 'json', 'required_array_keys:hipertensivos,analgesicos,esteroides,antidepresivos,anticonceptivos,hipogicemiante,anticonvulsivos,sildenafil,acidoacetilicidico,anticoagulante,bifosfanato,otros'],
            'medicamentos.*.positivo' => ['required', 'boolean'],
            'medicamentos.*.dosis' => ['sometimes', 'required', 'numeric', 'decimal:0,2'],
            'medicamentos.*.descripcion' => ['sometimes', 'required', 'string', 'max:255'],
            'alergias' => ['required', 'json', 'required_array_keys:antibioticos,analgesicos,anestesicos,yodo,otros'],
            'alergias.otros' => ['required', 'required_array_keys:positivo,descripcion'],
            'alergias.otros.positivo' => ['required', 'boolean'],
            'alergias.otros.descripcion' => ['required', 'string', 'max:255'],
            'alergias.*' => ['sometimes', 'boolean'],
        ];
    }
}
