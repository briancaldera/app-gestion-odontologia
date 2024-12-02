<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application for file storage.
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Below you may configure as many filesystem disks as necessary, and you
    | may even configure multiple disks for the same driver. Examples for
    | most supported storage drivers are configured here for reference.
    |
    | Supported Drivers: "local", "ftp", "sftp", "s3"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
            'throw' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
            'throw' => false,
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
        ],

        'media' => [
            'driver' => 'local',
            'root'   => storage_path('app/media'),
            'url'    => env('APP_URL').'/media',
        ],

        'users-profiles-pictures' => [
            'driver' => 'local',
            'root' => storage_path('app/users/profiles/pictures'),
        ],

        'pacientes' => [
            'driver' => 'local',
            'root' => storage_path('app/pacientes'),
        ],

        'historia' => [
            'driver' => 'local',
            'root' => storage_path('app/historias'),
        ],

        'odontologica' => [
            'driver' => 'local',
            'root' => storage_path('app/historias/odontologicas'),
        ],

        'historia-odontologica-consentimiento' => [
            'driver' => 'local',
            'root' => storage_path('app/historias/odontologicas/consentimiento'),
        ],

        'historia-odontologica-modificaciones-consentimientos' => [
            'driver' => 'local',
            'root' => storage_path('app/historias/odontologicas/modificaciones/consentimientos'),
        ],

        'panoramicas' => [
            'driver' => 'local',
            'root' => storage_path('app/historias/odontologicas/panoramicas'),
            'url'    => env('APP_URL').'/historias/odontologicas/panoramicas',
        ],

        'coronales' => [
            'driver' => 'local',
            'root' => storage_path('app/historias/odontologicas/coronales'),
            'url'    => env('APP_URL').'/historias/odontologicas/coronales',
        ],

        'periapicales' => [
            'driver' => 'local',
            'root' => storage_path('app/historias/odontologicas/periapicales'),
            'url'    => env('APP_URL').'/historias/odontologicas/periapicales',
        ],

        'periodontodiagramas' => [
            'driver' => 'local',
            'root' => storage_path('app/historias/odontologicas/periodontodiagramas'),
            'url'    => env('APP_URL').'/historias/odontologicas/periodontodiagramas',
        ],

        'odontologica-media' => [
            'driver' => 'local',
            'root' => storage_path('app/historias/odontologicas/media'),
            'url'    => env('APP_URL').'/historias/odontologicas/media',
        ],

        'endodoncia-historias-consentimientos' => [
            'driver' => 'local',
            'root' => storage_path('app/endodoncia/historias/consentimientos'),
        ],

        'endodoncia-historias-periodontodiagramas' => [
            'driver' => 'local',
            'root' => storage_path('app/endodoncia/historias/periodontodiagramas'),
        ],

        'endodoncia-historias-fichas-radiografias-iniciales' => [
            'driver' => 'local',
            'root' => storage_path('app/endodoncia/historias/fichas/radiografias/iniciales'),
            'url'    => env('APP_URL').'/endodoncia/historias/fichas/radiografias/iniciales',
        ],

        'endodoncia-historias-fichas-radiografias-finales' => [
            'driver' => 'local',
            'root' => storage_path('app/endodoncia/historias/fichas/radiografias/finales'),
            'url'    => env('APP_URL').'/endodoncia/historias/fichas/radiografias/finales',
        ],

        'endodoncia-historias-fichas-radiografias-conductometrias' => [
            'driver' => 'local',
            'root' => storage_path('app/endodoncia/historias/fichas/radiografias/conductometrias'),
            'url'    => env('APP_URL').'/endodoncia/historias/fichas/radiografias/conductometrias',
        ],

        'endodoncia-historias-fichas-radiografias-conos' => [
            'driver' => 'local',
            'root' => storage_path('app/endodoncia/historias/fichas/radiografias/conos'),
            'url'    => env('APP_URL').'/endodoncia/historias/fichas/radiografias/conos',
        ],

        'endodoncia-historias-fichas-radiografias-penachos' => [
            'driver' => 'local',
            'root' => storage_path('app/endodoncia/historias/fichas/radiografias/penachos'),
            'url'    => env('APP_URL').'/endodoncia/historias/fichas/radiografias/penachos',
        ],

        'historia-cirugia-periodontodiagramas' => [
            'driver' => 'local',
            'root' => storage_path('app/cirugia/historias/periodontodiagramas'),
        ],

        'historia-cirugia-consentimientos' => [
            'driver' => 'local',
            'root' => storage_path('app/cirugia/historias/consentimientos'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    |
    | Here you may configure the symbolic links that will be created when the
    | `storage:link` Artisan command is executed. The array keys should be
    | the locations of the links and the values should be their targets.
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
