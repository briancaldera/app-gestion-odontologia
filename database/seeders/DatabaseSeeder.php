<?php

namespace Database\Seeders;

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
//        $this->call([LaratrustSeeder::class]);

        // todo send this mess to a proper seeder
        function createPermissionsFromActions(array $actions): Collection
        {
            return collect($actions)->map(function (array $actions, string $module) {
                $actions_col = collect($actions);

                return $actions_col->map(function (array $data) use ($module) {
                    $name = $data['name'];
                    $display_name = $data['display_name'];
                    $description = $data['description'];

                    return Permission::create([
                        'name' => "$module-$name",
                        'display_name' => $display_name,
                        'description' => $description
                    ], ['name']);
                });
            })->flatten(1);
        }

        $users_permissions = createPermissionsFromActions(User::$actions);
        $historias_permissions = createPermissionsFromActions(Historia::$actions);
        $pacientes_permissions = createPermissionsFromActions(Paciente::$actions);
        $groups_permissions = createPermissionsFromActions(Group::$actions);
        $assignments_permissions = createPermissionsFromActions(Assignment::$actions);
        $homeworks_permissions = createPermissionsFromActions(Homework::$actions);

        function createRolesFromArray(array $roles)
        {
            $roles_coll = collect($roles);

            return $roles_coll->map(fn (array $item) => Role::create($item))->flatten(1);
        }

        $roles_array = [
            'admin' => [
                'name' => 'admin',
                'display_name' => 'Administrador',
                'description' => 'Usuario de administración'
            ],
            'admision' => [
                'name' => 'admision',
                'display_name' => 'Admisión',
                'description' => 'Usuario del personal de admisión'
            ],
            'profesor' => [
                'name' => 'profesor',
                'display_name' => 'Profesor',
                'description' => 'Usuario profesor'
            ],
            'estudiante' => [
                'name' => 'estudiante',
                'display_name' => 'Estudiante',
                'description' => 'Usuario estudiante'
            ],
        ];

        $user_roles = createRolesFromArray($roles_array);

        $permissions_roles = [
            'admin' => [
                'users' => ['index-all', 'read', 'read-private', 'update', 'delete', 'add-registration'],
                'pacientes' => ['index-all', 'read', 'read-private', 'update', 'delete'],
                'historias' => ['index-all', 'read', 'read-private', 'update', 'update-status', 'delete', 'assign-id'],
                'groups' => ['index-all', 'create', 'read', 'read-private', 'update', 'delete', 'index-users', 'add-users', 'remove-users'],
                'assignments' => ['create', 'read', 'update', 'delete'],
                'homeworks' => ['index-all', 'read', 'update', 'delete', 'create-corrections'],
            ],
            'admision' => [
                'users' => ['index-all', 'read', 'read-private'],
                'pacientes' => ['index-all', 'read',],
                'historias' => ['index-all', 'read', 'read-private', 'assign-id'],
            ],
            'profesor' => [
                'users' => ['read', 'read-private'],
                'pacientes' => ['index-all', 'read',],
                'historias' => ['read', 'update-status'],
                'groups' => ['read', 'read-private', 'update', 'index-users'],
                'assignments' => ['create', 'read', 'update', 'delete'],
                'homeworks' => ['index-all', 'read', 'delete', 'create-corrections'],
            ],
            'estudiante' => [
                'users' => ['read'],
                'pacientes' => ['read', 'create', 'update'],
                'historias' => ['read', 'create', 'update'],
                'groups' => ['read'],
                'assignments' => ['read'],
                'homeworks' => ['create', 'read', 'update', 'delete'],
            ]
        ];

        function assignPermissionsToRoles(Collection $permissions_col, Collection $roles, Collection $permissions_roles) {
            $permissions_roles->each(function (array $permissions_to_role, string $role_name) use ($permissions_col, $roles) {
                /** @var Role $role */
                $role = $roles->firstOrFail(fn (Role $role_model) => $role_model->name === $role_name);

                $permissions = collect($permissions_to_role)->map(function (array $actions, string $module) use($permissions_col) {

                    return collect($actions)->map(function (string $action) use ($module, $permissions_col) {
                        $permission_name = "$module-$action";
                        return $permissions_col->firstOrFail(fn (Permission $permission) => $permission->name === $permission_name);
                    });

                })->flatten(1);

                $role->syncPermissions($permissions);
            });
        }

        $all_permissions = collect([...$users_permissions, ...$historias_permissions, ...$pacientes_permissions, ...$groups_permissions, ...$assignments_permissions, ...$homeworks_permissions]);

        assignPermissionsToRoles($all_permissions, $user_roles, collect($permissions_roles));

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
