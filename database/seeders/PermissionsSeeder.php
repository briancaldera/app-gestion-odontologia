<?php

namespace Database\Seeders;

use App\Models\Cirugia\HistoriaCirugia;
use App\Models\Endodoncia\HistoriaEndodoncia;
use App\Models\Group;
use App\Models\Group\Assignment;
use App\Models\Group\Homework;
use App\Models\Historia;
use App\Models\Paciente;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

        $system_actions = [
            'system' => [
                'full-control' => [
                    'name' => 'full-control',
                    'display_name' => 'Full control sobre el sistema',
                    'description' => 'Permite realizar cualquier acción sobre el sistema. Solo asigne este permiso a administradores',
                ],
                'add-users-codes' => [
                    'name' => 'add-users-codes',
                    'display_name' => 'Agregar códigos de usuarios',
                    'description' => 'Agrega códigos de usuarios para permitirlos registrarse en el sistema',
                ],
                'update-users-codes' => [
                    'name' => 'update-users-codes',
                    'display_name' => 'Actualizar códigos de usuarios',
                    'description' => 'Actualiza códigos de usuarios que les permiten registrarse en el sistema',
                ],
                'remove-users-codes' => [
                    'name' => 'remove-users-codes',
                    'display_name' => 'Eliminar códigos de usuarios',
                    'description' => 'Elimina códigos de usuarios que les permiten registrarse en el sistema',
                ],
                'view-actions' => [
                    'name' => 'view-actions',
                    'display_name' => 'Ver historial de operaciones',
                    'description' => 'Ver el historial de acciones realizadas por los usuarios del sistema',
                ],
            ]
        ];

        $system_permissions = createPermissionsFromActions($system_actions);
        $users_permissions = createPermissionsFromActions(User::$actions);
        $historias_permissions = createPermissionsFromActions(Historia::$actions);
        $pacientes_permissions = createPermissionsFromActions(Paciente::$actions);
        $groups_permissions = createPermissionsFromActions(Group::$actions);
        $assignments_permissions = createPermissionsFromActions(Assignment::$actions);
        $homeworks_permissions = createPermissionsFromActions(Homework::$actions);
        $historias_endodoncia_permissions = createPermissionsFromActions(HistoriaEndodoncia::$actions);
        $historias_cirugia_permission = createPermissionsFromActions(HistoriaCirugia::$actions);

        function createRolesFromArray(array $roles)
        {
            $roles_coll = collect($roles);

            return $roles_coll->map(fn (array $item) => Role::create($item))->flatten(1);
        }

        $roles_array = [
//            'root' => [
//                'name' => 'root',
//                'display_name' => 'Root',
//                'description' => 'Superuser'
//            ],
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
                'system' => ['full-control', 'add-users-codes', 'update-users-codes', 'remove-users-codes', 'view-actions'],
                'users' => ['full-control', 'index-all', 'read', 'read-private', 'update', 'delete', 'add-registration'],
                'pacientes' => ['full-control', 'index-all', 'read', 'read-private', 'update', 'delete'],
                'historias' => ['full-control', 'index-all', 'read', 'read-private', 'update', 'update-status', 'delete', 'assign-id'],
                'historias-endodoncia' => ['full-control', 'index-all', 'read', 'read-private', 'update', 'update-status', 'delete', 'assign-id'],
                'historias-cirugia' => ['full-control', 'index-all', 'read', 'read-private', 'update', 'update-status', 'delete', 'assign-id'],
                'groups' => ['index-all', 'create', 'read', 'read-private', 'update', 'delete', 'index-users', 'add-users', 'remove-users'],
                'assignments' => ['index-all', 'create', 'read', 'read-private', 'update', 'delete'],
                'homeworks' => ['full-control', 'index-all', 'read', 'update', 'delete', 'create-corrections'],
            ],
            'admision' => [
                'users' => ['index-all', 'read', 'read-private'],
                'pacientes' => ['index-all', 'read', 'read-private'],
                'historias' => ['index-all', 'read', 'read-private', 'assign-id', 'assign-semester'],
                'historias-endodoncia' => ['index-all', 'read', 'read-private', 'assign-id', 'assign-semester'],
                'historias-cirugia' => ['index-all', 'read', 'read-private', 'assign-id', 'assign-semester'],
            ],
            'profesor' => [
                'users' => ['read', 'read-private'],
                'pacientes' => ['index-all', 'read', 'read-private'],
                'historias' => ['read', 'update-status', 'approve-treatment', 'approve-plaque-control', 'approve-periodontal-discharge'],
                'historias-endodoncia' => ['read', 'update-status', 'approve-treatment',],
                'historias-cirugia' => ['read', 'update-status', 'approve-treatment',],
                'groups' => ['read', 'update', 'index-users'],
                'assignments' => ['create', 'read', 'update', 'delete'],
                'homeworks' => ['read', 'delete', 'create-corrections'],
            ],
            'estudiante' => [
                'users' => ['read'],
                'pacientes' => ['read', 'create', 'update'],
                'historias' => ['read', 'create', 'update', 'assign-semester'],
                'historias-endodoncia' => ['read', 'create', 'update', 'assign-semester'],
                'historias-cirugia' => ['read', 'create', 'update', 'assign-semester'],
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

        $all_permissions = collect([
            ...$system_permissions,
            ...$users_permissions,
            ...$historias_permissions,
            ...$historias_endodoncia_permissions,
            ...$pacientes_permissions,
            ...$groups_permissions,
            ...$assignments_permissions,
            ...$homeworks_permissions,
            ...$historias_cirugia_permission,
        ]);

        assignPermissionsToRoles($all_permissions, $user_roles, collect($permissions_roles));
    }
}
