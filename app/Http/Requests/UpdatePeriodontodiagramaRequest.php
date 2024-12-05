<?php

namespace App\Http\Requests;

use App\Constants;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePeriodontodiagramaRequest extends FormRequest
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

        return [
            'periodontodiagrama' => ['image', "dimensions:min_width=$min_width,min_height=$min_height,max_width=$max_width,max_height=$max_height", "min:$min_image_size", "max:$max_image_size"],
        ];
    }
}
