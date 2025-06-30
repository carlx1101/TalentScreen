import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  permissions: string[];
  can: {
    update_role: boolean;
    delete_role: boolean;
  };
}

interface Props {
  roles: Role[];
  permissions: string[];
  can: {
    create_role: boolean;
    manage_permissions: boolean;
  };
}

export default function RolePermissionManagement({ roles, permissions, can }: Props) {
  const [newRoleName, setNewRoleName] = useState('');
  const [newRolePermissions, setNewRolePermissions] = useState<string[]>([]);
  const [newPermissionName, setNewPermissionName] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleUpdateRolePermissions = (roleId: number, rolePermissions: string[]) => {
    setProcessing(true);
    router.put(`/admin/roles/${roleId}/permissions`, {
      permissions: rolePermissions,
    }, {
      onFinish: () => setProcessing(false),
    });
  };

  const handleCreateRole = () => {
    setProcessing(true);
    router.post('/admin/roles', {
      name: newRoleName,
      permissions: newRolePermissions,
    }, {
      onSuccess: () => {
        setNewRoleName('');
        setNewRolePermissions([]);
      },
      onFinish: () => setProcessing(false),
    });
  };

  const handleDeleteRole = (roleId: number) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setProcessing(true);
      router.delete(`/admin/roles/${roleId}`, {
        onFinish: () => setProcessing(false),
      });
    }
  };

  const handleCreatePermission = () => {
    setProcessing(true);
    router.post('/admin/permissions', {
      name: newPermissionName,
    }, {
      onSuccess: () => {
        setNewPermissionName('');
      },
      onFinish: () => setProcessing(false),
    });
  };

  const handleDeletePermission = (permissionName: string) => {
    if (confirm('Are you sure you want to delete this permission?')) {
      setProcessing(true);
      router.delete(`/admin/permissions/${permissionName}`, {
        onFinish: () => setProcessing(false),
      });
    }
  };

  const togglePermission = (rolePermissions: string[], permission: string) => {
    if (rolePermissions.includes(permission)) {
      return rolePermissions.filter(p => p !== permission);
    } else {
      return [...rolePermissions, permission];
    }
  };

  return (
    <>
      <Head title="Role & Permission Management" />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Role & Permission Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage roles and their associated permissions
          </p>
        </div>

        {/* Create New Permission */}
        {can.manage_permissions && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Permission
              </CardTitle>
              <CardDescription>
                Add a new permission to the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="new-permission">Permission Name</Label>
                  <Input
                    id="new-permission"
                    value={newPermissionName}
                    onChange={(e) => setNewPermissionName(e.target.value)}
                    placeholder="Enter permission name"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleCreatePermission}
                    disabled={processing || !newPermissionName.trim()}
                  >
                    Create Permission
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create New Role */}
        {can.create_role && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Role
              </CardTitle>
              <CardDescription>
                Create a new role and assign permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-role">Role Name</Label>
                  <Input
                    id="new-role"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="Enter role name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-base">Permissions</Label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {permissions.map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox
                          id={`new-${permission}`}
                          checked={newRolePermissions.includes(permission)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewRolePermissions([...newRolePermissions, permission]);
                            } else {
                              setNewRolePermissions(newRolePermissions.filter(p => p !== permission));
                            }
                          }}
                        />
                        <Label htmlFor={`new-${permission}`} className="text-sm">
                          {permission}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleCreateRole}
                  disabled={processing || !newRoleName.trim()}
                >
                  Create Role
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Roles */}
        <div className="space-y-6">
          {roles.map((role) => (
            <Card key={role.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{role.name}</CardTitle>
                    <CardDescription>
                      Manage permissions for this role
                    </CardDescription>
                  </div>
                  {role.can.delete_role && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                      disabled={processing}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Role
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {permissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${role.id}-${permission}`}
                        checked={role.permissions.includes(permission)}
                        onCheckedChange={() => {
                          if (role.can.update_role) {
                            const updatedPermissions = togglePermission(role.permissions, permission);
                            handleUpdateRolePermissions(role.id, updatedPermissions);
                          }
                        }}
                        disabled={processing || !role.can.update_role}
                      />
                      <Label htmlFor={`${role.id}-${permission}`} className="text-sm">
                        {permission}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Available Permissions List */}
        {can.manage_permissions && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Available Permissions</CardTitle>
              <CardDescription>
                All permissions in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">{permission}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePermission(permission)}
                      disabled={processing}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
