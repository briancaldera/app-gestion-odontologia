<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => false,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'admin' => [
            'users' => 'r,r-private,u,d',
            'pacientes' => 'i,r,r-private,u,d',
            'historias' => 'r,u,d',
            'groups' => 'i,c,r,r-private,u,d,add-users,remove-users,index-users,create-assignments,update-assignments,delete-assignments,index-all-homeworks'
        ],
        'admision' => [
            'users' => 'r',
            'pacientes' => 'r',
            'historias' => 'r,u,d',
        ],
        'profesor' => [
            'users' => 'r',
            'pacientes' => 'r',
            'historias' => 'r',
            'groups' => 'r,r-private,u,index-users,create-assignments,update-assignments,delete-assignments,index-all-homeworks',
        ],
        'estudiante' => [
            'pacientes' => 'c,r,u',
            'historias' => 'c,r,u',
            'groups' => 'r,read-homeworks,create-homeworks,update-homeworks',
        ],
    ],

    'permissions_map' => [
        // general
        'i' => 'index-all',
        'c' => 'create',
        'r' => 'read',
        'r-private' => 'read-private',
        'u' => 'update',
        'd' => 'delete',
        //groups
        'index-users' => 'index-users',
        'add-users' => 'add-users',
        'remove-users' => 'remove-users',
        'create-assignments' => 'create-assignments',
        'update-assignments' => 'update-assignments',
        'delete-assignments' => 'delete-assignments',
        'index-all-homeworks' => 'index-all-homeworks',
        'create-homeworks' => 'create-homeworks',
        'read-homeworks' => 'read-homeworks',
        'update-homeworks' => 'update-homeworks',
        'delete-homeworks' => 'delete-homeworks',
    ],
];
$ignoreError = true;
$permissions = [
    'users' => [
        'index-all',
        'create',
        'read',
        'read-private',
        'update',
        'delete',
    ],
    'pacientes' => [
        'index-all',
        'create',
        'read',
        'read-private',
        'update',
        'delete',
    ],
    'groups' => [
        'index-all',
        'create',
        'read',
        'read-private',
        'update',
        'delete',
        'index-users',
        'add-users',
        'remove-users',
        'create-assignments',
        'update-assignments',
        'delete-assignments',
        'index-all-homeworks',
        'create-homeworks',
        'read-homeworks',
        'update-homeworks',
        'delete-homeworks',
    ]
];
