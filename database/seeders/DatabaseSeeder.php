<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class
        ]);

        // User::factory(10)->create();

        User::factory()->has(Profile::factory())->create([
            'name' => 'Estudiante',
            'role' => 3,
            'email' => 'estudiante@example.com'
        ]);

        User::factory()->has(Profile::factory())->create([
            'name' => 'Profesor',
            'role' => 2,
            'email' => 'profesor@example.com'
        ]);

        User::factory()->has(Profile::factory())->create([
            'name' => 'Admision',
            'role' => 1,
            'email' => 'admision@example.com'
        ]);

        User::factory()->has(Profile::factory())->create([
            'name' => 'Administracion',
            'role' => 0,
            'email' => 'admin@example.com'
        ]);

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);
    }
}
