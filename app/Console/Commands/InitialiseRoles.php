<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class InitialiseRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:initialise-roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initialize roles and permissions for the application';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Initializing roles and permissions...');

        // Create permissions
        $permissions = [
            'manage roles',
            'view all companies',
            'view company',
            'create company',
            'edit company',
            'delete company',
            'restore company',
            'invite company editor',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
            $this->line("Created permission: {$permission}");
        }

        // Create roles and assign permissions
        $roles = [
            'admin' => [
                'manage roles',
                'view all companies',
                'create company',
                'edit company',
                'delete company',
                'restore company',
            ],
            'company owner' => [
                'view company',
                'create company',
                'edit company',
                'delete company',
                'restore company',
                'invite company editor',
            ],
            'company editor' => [
                'view company',
                'edit company',
            ],
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions($rolePermissions);
            $this->line("Created role '{$roleName}' with permissions: " . implode(', ', $rolePermissions));
        }

        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now(),
        ])->assignRole('admin');

        $this->info('Roles and permissions initialized successfully!');
    }
}
