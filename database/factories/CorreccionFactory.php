<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
                    'user' => $faker->uuid(),
                    'content' => $faker->text(),
                    'datetime' => $faker->dateTime(),
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
