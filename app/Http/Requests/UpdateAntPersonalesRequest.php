<?php

namespace App\Http\Requests;

use App\Models\AntPersonales;
use App\Models\Historia;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAntPersonalesRequest extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:'.AntPersonales::class],
            'medicamentos' => ['required', 'array', 'array:hipertensivos,analgesicos,esteroides,antidepresivos,anticonceptivos,hipogicemiante,anticonvulsivos,sildenafil,acidoacetilicidico,anticoagulante,bifosfanato,otros'],
            'medicamentos.*.positivo' => ['boolean'],
            'medicamentos.*.dosis' => ['nullable', 'numeric', 'decimal:0,2'],
            'medicamentos.*.descripcion' => ['nullable', 'string', 'max:255'],
            'alergias' => ['required', 'array', 'array:antibioticos,analgesicos,anestesicos,yodo,otros'],
            'alergias.*' => ['sometimes', 'boolean'],
            'alergias.otros' => ['required', 'array:positivo,descripcion'],
            'alergias.otros.positivo' => ['required', 'boolean'],
            'alergias.otros.descripcion' => ['nullable', 'string', 'max:255'],
        ];
    }
}
