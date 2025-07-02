<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RoleController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Role::class);

        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();

        return Inertia::render('Admin/RolePermissionManagement', [
            'can' => [
                'create_role' => Auth::user()->can('create', Role::class),
                'manage_permissions' => Auth::user()->can('managePermissions', Role::class),
            ],
            'roles' => $roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'permissions' => $role->permissions->pluck('name'),
                    'can' => [
                        'update_role' => Auth::user()->can('update', $role),
                        'delete_role' => Auth::user()->can('delete', $role),
                    ],
                ];
            }),
            'permissions' => $permissions->pluck('name'),
        ]);
    }

    public function updateRolePermissions(Request $request, Role $role)
    {
        $this->authorize('update', $role);

        $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role->syncPermissions($request->permissions);

        return response()->json([
            'success' => true,
            'message' => "Permissions updated for role '{$role->name}'",
        ]);
    }

    public function createRole(Request $request)
    {
        $this->authorize('create', Role::class);

        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions ?? []);

        return response()->json([
            'success' => true,
            'message' => "Role '{$role->name}' created successfully",
        ]);
    }

    public function deleteRole(Role $role)
    {
        $this->authorize('delete', $role);

        $roleName = $role->name;
        $role->delete();

        return response()->json([
            'success' => true,
            'message' => "Role '{$roleName}' deleted successfully",
        ]);
    }

    public function createPermission(Request $request)
    {
        $this->authorize('managePermissions', Role::class);

        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        Permission::create(['name' => $request->name]);

        return back()->with('success', "Permission '{$request->name}' created successfully");
    }

    public function deletePermission(Permission $permission)
    {
        $this->authorize('managePermissions', Role::class);

        $permissionName = $permission->name;
        $permission->delete();

        return response()->json([
            'success' => true,
            'message' => "Permission '{$permissionName}' deleted successfully",
        ]);
    }
}
