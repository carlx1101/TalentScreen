<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;
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
            'manage all companies',
            'manage all job listings',
            'view company',
            'create company',
            'edit company',
            'delete company',
            'restore company',
            'invite company editor',
            'view job listings',
            'create job listing',
            'edit job listing',
            'delete job listing',
            'restore job listing',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
            $this->line("Created permission: {$permission}");
        }

        // Create roles and assign permissions
        $roles = [
            'admin' => [
                'manage roles',
                'manage all companies',
                'manage all job listings',
            ],
            'company owner' => [
                'view company',
                'create company',
                'edit company',
                'delete company',
                'restore company',
                'invite company editor',
                'view job listings',
                'create job listing',
                'edit job listing',
                'delete job listing',
            ],
            'company editor' => [
                'view company',
                'edit company',
                'view job listings',
                'create job listing',
                'edit job listing',
                'delete job listing',
            ],
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions($rolePermissions);
            $this->line("Created role '{$roleName}' with permissions: " . implode(', ', $rolePermissions));
        }

        $this->info('Roles and permissions initialized successfully!');
    }
}
