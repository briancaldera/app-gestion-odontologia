<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHistoriaPeriodontalRequest extends FormRequest
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
            'higiene_bucal' => ['required', 'array:frecuencia_cepillado,tipo_cepillo,metodo_cepillado,metodo_auxiliar,sustancia_reveladora,cepillado_lengua'],
            'higiene_bucal.frecuencia_cepillado' => ['nullable', 'string', 'max:255'],
            'higiene_bucal.tipo_cepillo' => ['required', 'string', 'size:1', 'regex:/[D|M|S]/'],
            'higiene_bucal.metodo_cepillado' => ['required', 'string', 'size:1', 'regex:/[H|V|C|O]/'],
            'higiene_bucal.metodo_auxiliar' => ['required', 'array:hilo_dental,enjuague_bucal,hidroterapia,cepillo_interdental'],
            'higiene_bucal.metodo_auxiliar.*' => ['required', 'boolean'],
            'higiene_bucal.sustancia_reveladora' => ['required', 'array:descripcion,otro'],
            'higiene_bucal.sustancia_reveladora.*' => ['nullable', 'string', 'max:255'],
            'higiene_bucal.cepillado_lengua' => ['required', 'boolean'],
            'control_higiene_bucal' => ['required', 'array:tecnica_cepillado_ensenada,cepillo_recomendado,metodos_auxiliares_requeridos,placa_bacteriana_lengua,control_halitosis,tratamiento'],
            'control_higiene_bucal.tecnica_cepillado_ensenada' => ['nullable', 'string', 'max:255'],
            'control_higiene_bucal.cepillo_recomendado' => ['nullable', 'string', 'max:255'],
            'control_higiene_bucal.metodos_auxiliares_requeridos' => ['nullable', 'string', 'max:255'],
            'control_higiene_bucal.placa_bacteriana_lengua' => ['required', 'boolean'],
            'control_higiene_bucal.control_halitosis' => ['nullable', 'string', 'max:255'],
            'control_higiene_bucal.tratamiento' => ['nullable', 'string', 'max:255'],
        ];
    }
}
