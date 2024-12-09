<?php

namespace App\Http\Requests;

use App\Constants;
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

        $max_height = Constants::MAX_IMAGE_HEIGHT;
        $min_height = Constants::MIN_IMAGE_HEIGHT;
        $max_width = Constants::MAX_IMAGE_WIDTH;
        $min_width = Constants::MIN_IMAGE_WIDTH;
        $min_image_size = Constants::MIN_IMAGE_SIZE;
        $max_image_size = Constants::MAX_IMAGE_SIZE_IN_KB;
        $max_text_size = Constants::MAX_TEXT_SIZE;
        $max_images = Constants::MAX_IMAGES_PER_EXAMEN_RAD_SECTION;

        return [
            'interpretacion_panoramica' => ['sometimes', 'array:descripcion,imagenes',],
            'interpretacion_panoramica.descripcion' => ['array:nasomaxilar,ATM,mandibular,dento_alveolar_sup,dento_alveolar_inf'],
            'interpretacion_panoramica.descripcion.*' => ['nullable', 'string', "max:$max_text_size"],
            'interpretacion_panoramica.imagenes' => ['array', "between:0,$max_images"],
            'interpretacion_panoramica.imagenes.*' => ['image', "dimensions:min_width=$min_width,min_height=$min_height,max_width=$max_width,max_height=$max_height", "min:$min_image_size", "max:$max_image_size"],

            'interpretacion_periapicales' => ['sometimes', 'array:descripcion,imagenes',],
            'interpretacion_periapicales.descripcion' => ['nullable', 'string', "max:$max_text_size"],
            'interpretacion_periapicales.imagenes' => ['array', "between:0,$max_images"],
            'interpretacion_periapicales.imagenes.*' => ['image', "dimensions:min_width=$min_width,min_height=$min_height,max_width=$max_width,max_height=$max_height", "min:$min_image_size", "max:$max_image_size"],

            'interpretacion_coronales' => ['sometimes', 'array:descripcion,imagenes',],
            'interpretacion_coronales.descripcion' => ['nullable', 'string', "max:$max_text_size"],
            'interpretacion_coronales.imagenes' => ['array', "between:0,$max_images"],
            'interpretacion_coronales.imagenes.*' => ['image', "dimensions:min_width=$min_width,min_height=$min_height,max_width=$max_width,max_height=$max_height", "min:$min_image_size", "max:$max_image_size" ],
        ];
    }
}
