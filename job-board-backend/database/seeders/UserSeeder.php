<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create employer
        User::create([
            'name' => 'emp',
            'email' => 'emp@gmail.com',
            'password' => Hash::make('123'),
            'role' => 'employer',
        ]);

        // Create applicant
        User::create([
            'name' => 'app',
            'email' => 'app@gmail.com',
            'password' => Hash::make('123'),
            'role' => 'applicant',
        ]);
    }
}
