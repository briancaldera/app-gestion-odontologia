<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Paciente;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestUserSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()->has(Profile::factory())->has(Group::factory())->createQuietly([
            'name' => 'Administracion',
            'email' => 'admin@example.com'
        ]);
        $admin->addRole('admin');

        $admision = User::factory()->has(Profile::factory())->has(Group::factory())->createQuietly([
            'name' => 'Admision',
            'email' => 'admision@example.com'
        ]);
        $admision->addRole('admision');

        $profesor = User::factory()->has(Profile::factory())->has(Group::factory())->createQuietly([
            'name' => 'Profesor',
            'email' => 'profesor@example.com'
        ]);
        $profesor->addRole('profesor');

        $estudianteUser = User::factory()->has(Profile::factory())->has(Group::factory())->createQuietly([
            'name' => 'Estudiante',
            'email' => 'estudiante@example.com'
        ]);
        $estudianteUser->addRole('estudiante');

        $admins = User::factory()->has(Profile::factory())->has(Group::factory())->count(3)->createManyQuietly()->each(fn(User $user) => $user->addRole('admin'));
        $admision = User::factory()->has(Profile::factory())->has(Group::factory())->count(5)->createManyQuietly()->each(fn(User $user) => $user->addRole('admision'));
        $profesores = User::factory()->has(Profile::factory())->has(Group::factory())->count(10)->createManyQuietly()->each(fn(User $user) => $user->addRole('profesor'));
        $estudiantes = User::factory()->has(Profile::factory())->has(Group::factory())->count(50)->createManyQuietly()->each(fn(User $user) => $user->addRole('estudiante'));

        $paciente = Paciente::factory()->for($estudianteUser, 'medicoTratante')->createOneQuietly(['registered_by' => $estudianteUser->id]);
    }
}
