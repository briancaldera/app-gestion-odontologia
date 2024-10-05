<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Profile;
use App\Models\Role;
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
        $this->call([LaratrustSeeder::class]);

//        $admin = Role::create([
//            'name' => 'admin',
//            'display_name' => 'Administrador',
//        ]);
//
//
//        /** @var Role $estudiante */
//        $estudiante = Role::create([
//            'name' => 'estudiante',
//            'display_name' => 'Estudiante',
//        ]);
//
//        $crearHistoria = Permission::create([
//            'name' => 'crear-historia',
//            'display_name' => 'Crear historia', // optional
//            'description' => 'Crear historia regular de adulto', // optional
//        ]);
//
//        $estudiante->givePermission($crearHistoria);

//        // User::factory(10)->create();
//

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
        $users = User::factory()->has(Profile::factory())->count(50)->createMany()->each(fn(User $user) => $user->addRole('estudiante'));

    }
}
