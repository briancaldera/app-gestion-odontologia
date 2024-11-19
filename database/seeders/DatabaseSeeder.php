<?php

namespace Database\Seeders;

use App\Models\Endodoncia\HistoriaEndodoncia;
use App\Models\Group;
use App\Models\Group\Assignment;
use App\Models\Group\Homework;
use App\Models\Historia;
use App\Models\Paciente;
use App\Models\Permission;
use App\Models\Profile;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([PermissionsSeeder::class]);

        $admin = User::factory()->has(Profile::factory())->create([
            'name' => 'Administracion',
            'email' => 'admin@example.com'
        ]);
        $admin->addRole('admin');

        $admision = User::factory()->has(Profile::factory())->create([
            'name' => 'Admision',
            'email' => 'admision@example.com'
        ]);
        $admision->addRole('admision');

        $profesor = User::factory()->has(Profile::factory())->create([
            'name' => 'Profesor',
            'email' => 'profesor@example.com'
        ]);
        $profesor->addRole('profesor');

        $estudianteUser = User::factory()->has(Profile::factory())->create([
            'name' => 'Estudiante',
            'email' => 'estudiante@example.com'
        ]);
        $estudianteUser->addRole('estudiante');

        $admins = User::factory()->has(Profile::factory())->count(3)->createMany()->each(fn(User $user) => $user->addRole('admin'));
        $admision = User::factory()->has(Profile::factory())->count(5)->createMany()->each(fn(User $user) => $user->addRole('admision'));
        $profesores = User::factory()->has(Profile::factory())->count(10)->createMany()->each(fn(User $user) => $user->addRole('profesor'));
        $estudiantes = User::factory()->has(Profile::factory())->count(50)->createMany()->each(fn(User $user) => $user->addRole('estudiante'));

        $paciente = Paciente::factory()->for($estudianteUser, 'medicoTratante')->createOne(['registered_by' => $estudianteUser->id]);
    }
}
