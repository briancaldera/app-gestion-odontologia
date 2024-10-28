<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'higiene_bucal' => ['required', 'array:frecuencia_cepillado,tipo_cepillo,metodo_cepillado,metodo_auxiliar,cepillado_lengua,hemorragia_gingival,xerostomia,sialorrea'],
            'higiene_bucal.frecuencia_cepillado' => ['nullable', 'string', 'max:1000'],
            'higiene_bucal.tipo_cepillo' => ['list'],
            'higiene_bucal.tipo_cepillo.*' => [Rule::in(['duro', 'medio', 'suave',])],
            'higiene_bucal.metodo_cepillado' => ['list'],
            'higiene_bucal.metodo_cepillado.*' => [Rule::in(['horizontal', 'vertical', 'circular', 'otro',])],
            'higiene_bucal.metodo_auxiliar' => ['list'],
            'higiene_bucal.metodo_auxiliar.*' => [Rule::in(['hilo', 'enjuague', 'hidroterapia', 'cepillo_interdental', 'sustancia_reveladora', 'otro',])],
            'higiene_bucal.cepillado_lengua' => ['required', 'boolean'],
            'higiene_bucal.hemorragia_gingival' => ['required', 'boolean'],
            'higiene_bucal.xerostomia' => ['required', 'boolean'],
            'higiene_bucal.sialorrea' => ['required', 'boolean'],

            'control_higiene_bucal' => ['required', 'array:tecnica_cepillado_ensenada,cepillo_recomendado,metodos_auxiliares_requeridos,placa_bacteriana_lengua,control_halitosis,tratamiento'],
            'control_higiene_bucal.tecnica_cepillado_ensenada' => ['nullable', 'string', 'max:1000'],
            'control_higiene_bucal.cepillo_recomendado' => ['nullable', 'string', 'max:1000'],
            'control_higiene_bucal.metodos_auxiliares_requeridos' => ['nullable', 'string', 'max:1000'],
            'control_higiene_bucal.placa_bacteriana_lengua' => ['required', 'boolean'],
            'control_higiene_bucal.control_halitosis' => [Rule::in(['S', 'N', 'NR'])],
            'control_higiene_bucal.tratamiento' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
