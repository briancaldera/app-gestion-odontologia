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
            'groups' => 'c,r,r-private,u,d,add-users,remove-users,list-users'
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
            'groups' => 'r,r-private,u,list-users',
        ],
        'estudiante' => [
            'pacientes' => 'c,r,u',
            'historias' => 'c,r,u',
            'groups' => 'r',
        ],
    ],

    'permissions_map' => [
        'i' => 'index-all',
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
        'add-users' => 'add-users',
        'remove-users' => 'remove-users',
        'r-private' => 'read-private-info',
        'list-users' => 'list-users'
    ],
];

// Actions
// users:index-all,create,read,write,delete,read-private-info
// pacientes:index-all,create,read,write,delete,read-private-info

