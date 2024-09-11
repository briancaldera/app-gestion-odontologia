<?php

namespace App\Http\Requests;

use App\Models\ExamenRadiografico;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use Illuminate\Foundation\Http\FormRequest;

class UpdateExamenRadiografico extends FormRequest
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
            'historia_id' => ['required', 'uuid', 'exists:' . Historia::class . ',id'],

            'interpretacion_panoramica' => ['required', 'array:descripcion,imagenes',],
            'interpretacion_panoramica.descripcion' => ['required', 'array:nasomaxilar,ATM,mandibular,dento_alveolar_sup,dento_alveolar_inf'],
            'interpretacion_panoramica.descripcion.*' => ['nullable', 'string', 'max:1000'],
            'interpretacion_panoramica.imagenes' => ['array', 'between:0,10'],
            'interpretacion_panoramica.imagenes.*' => ['image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000'],

            'interpretacion_periapicales' => ['required', 'array:descripcion,imagenes',],
            'interpretacion_periapicales.descripcion' => ['nullable', 'string', 'max:1000'],
            'interpretacion_periapicales.imagenes' => ['array', 'between:0,10'],
            'interpretacion_periapicales.imagenes.*' => ['image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000'],

            'interpretacion_coronales' => ['required', 'array:descripcion,imagenes',],
            'interpretacion_coronales.descripcion' => ['nullable', 'string', 'max:1000'],
            'interpretacion_coronales.imagenes' => ['array', 'between:0,10'],
            'interpretacion_coronales.imagenes.*' => ['image', 'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000', 'min:5', 'max:2000'],
        ];
    }
}
