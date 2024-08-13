<?php

namespace App\Http\Requests;

use App\Models\ExamenRadiografico;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use Illuminate\Foundation\Http\FormRequest;

class StoreExamenRadiografico extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:' . HistoriaOdontologica::class . ',historia_id', 'unique:' . ExamenRadiografico::class],

            'interpretacion_panoramica' => ['required', 'array:nasomaxilar,ATM,mandibular,dento_alveolar_sup,dento_alveolar_inf'],
            'interpretacion_panoramica.*' => ['required', 'array:radiografias,descripcion'],
            'interpretacion_panoramica.*.descripcion' => ['nullable', 'string', 'max:1000'],
            'interpretacion_panoramica.*.radiografias' => ['required', 'array', 'between:1,5'],
            'interpretacion_panoramica.*.radiografias.*' => ['image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000'],

            'interpretacion_radiografica_periapicales' => ['required', 'array:radiografias,descripcion',],
            'interpretacion_radiografica_periapicales.descripcion' => ['nullable', 'string', 'max:1000'],
            'interpretacion_radiografica_periapicales.radiografias' => ['required', 'array', 'between:1,5'],
            'interpretacion_radiografica_periapicales.radiografias.*' => ['image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000'],

            'interpretacion_radiografica_coronales' => ['required', 'array:radiografias,descripcion',],
            'interpretacion_radiografica_coronales.descripcion' => ['nullable', 'string', 'max:1000'],
            'interpretacion_radiografica_coronales.radiografias' => ['required', 'array', 'between:1,5'],
            'interpretacion_radiografica_coronales.radiografias.*' => ['image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000'],
        ];
    }
}
