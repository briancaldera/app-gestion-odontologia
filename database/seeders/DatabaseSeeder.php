<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([PermissionsSeeder::class]);

        if (!app()->isProduction()) {
            $this->call([TestUserSeeder::class]);
        }
    }
}
