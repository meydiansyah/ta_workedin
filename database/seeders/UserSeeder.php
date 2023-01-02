<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Client']);
        Role::create(['name' => 'Freelance']);

        User::create([
            'name'              => 'admin',
            'email'             => 'admin@admin.com',
            'password'          => bcrypt('password'),
            'remember_token'    => null,
            'role_id'           => 1,
            'status_id'         => 1,
			'profile_photo_url' => null,
        ]);
    }
}
