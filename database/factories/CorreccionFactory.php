<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Correccion>
 */
class CorreccionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = fake('es_VE');

        $generateCorrecciones = function() use ($faker)
        {

            $arr = collect();
            $randomNumber = $faker->numberBetween(2, 8);
            foreach (range(1, $randomNumber) as $i) {
                $arr->add([
                    'id' => Str::ulid()->toString(),
                    'user' => $faker->uuid(),
                    'content' => $faker->text(),
                    'created' => $faker->dateTime(),
                    'updated' => null,
                    'seen' => $faker->dateTime(),
                ]);
            }

            return $arr->toArray();
        };

        return [
            'correcciones' => $generateCorrecciones()
        ];
    }
}
