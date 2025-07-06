# Role and Permission System

This project uses Spatie Laravel Permission package with Laravel Policies and Inertia.js for a clean, maintainable authorization system.

## Initial Setup

1. **Install the package** (already done):
   ```bash
   composer require spatie/laravel-permission
   ```

2. **Run migrations** (already done):
   ```bash
   php artisan migrate
   ```

3. **Initialize roles and permissions**:
   ```bash
   php artisan app:initialise-roles
   ```

4. **Assign admin role to a user**:
   ```bash
   php artisan app:assign-admin-role user@example.com
   ```

## Roles and Permissions

### Initial Roles

1. **Admin**
   - Can modify permissions for roles
   - Has access to role management interface

2. **Company Owner**
   - Can add company
   - Can edit company
   - Can invite company editor

3. **Company Editor**
   - Can edit company

### Permissions

- `modify permission for roles` - Allows managing roles and permissions
- `add company` - Allows creating new companies
- `edit company` - Allows editing existing companies
- `invite company editor` - Allows inviting users to be company editors

## Usage

### In Controllers (Using Policies)

```php
class UsersController extends Controller
{
    public function index()
    {
        // Spatie permission
        if (auth()->user()->can('manage roles')) {}
        // Laravel authorization (gate/policy)
        $this->authorize('viewAny', User::class);
        // Currently spatie permission is added to the policy, can add on top of the permission to create more complex rules


        return Inertia::render('Users/Index', [
            'can' => [
                'create_user' => Auth::user()->can('create', User::class),
            ],
            'users' => User::all()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'can' => [
                        'edit_user' => Auth::user()->can('edit', $user),
                        'delete_user' => Auth::user()->can('delete', $user),
                    ]
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', User::class);
        // Create user logic
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);
        // Update user logic
    }
}
```

### In Routes

```php
// Routes are protected by policies, no middleware needed
Route::prefix('admin')->group(function () {
    Route::get('/roles-permissions', [RoleController::class, 'index'])->middleware('permission:manage roles');
    Route::put('/roles/{role}/permissions', [RoleController::class, 'updateRolePermissions']);
    // ... other routes
});
```

### In React Components (Inertia.js)

```tsx
import { usePage } from '@inertiajs/react';

interface Props {
  users: Array<{
    id: number;
    name: string;
    email: string;
    can: {
      edit_user: boolean;
      delete_user: boolean;
    };
  }>;
  can: {
    create_user: boolean;
  };
}

export default function UsersIndex({ users, can }: Props) {
  // Conditional rendering based on permissions
  return (
    <div>
      {can.create_user && (
        <Button>Create User</Button>
      )}
      
      {users.map(user => (
        <div key={user.id}>
          <span>{user.name}</span>
          {user.can.edit_user && (
            <Button>Edit</Button>
          )}
          {user.can.delete_user && (
            <Button variant="destructive">Delete</Button>
          )}
        </div>
      ))}
    </div>
  );
}
```

## Policies

The project includes several policies:

### UserPolicy
- `viewAny` - Only admins can view all users
- `view` - Admins or the user themselves
- `create` - Only admins
- `update` - Admins or the user themselves
- `delete` - Only admins (can't delete themselves)
- `manageRoles` - Users with 'modify permission for roles' permission
- `assignRoles` - Admins (can't assign roles to themselves)

### CompanyPolicy
- `viewAny` - Admin, company owner, or company editor
- `create` - Admin or company owner
- `update` - Admin, company owner, or company editor
- `delete` - Admin or company owner
- `inviteEditor` - Admin or company owner

### RolePolicy
- All methods require 'modify permission for roles' permission
- `delete` and `forceDelete` prevent deletion of 'admin' role

## Admin Interface

Admins can access the role management interface at `/admin/roles-permissions` where they can:

- View all roles and their permissions
- Create new roles (if they have permission)
- Delete existing roles (if they have permission)
- Modify permissions for each role using checkboxes
- Create new permissions (if they have permission)
- Delete existing permissions (if they have permission)

The interface uses policy-based permissions to show/hide UI elements.

## Commands

- `php artisan app:initialise-roles` - Initialize roles and permissions
- `php artisan app:assign-admin-role {email}` - Assign admin role to a user

## Security Notes

- All authorization is handled through Laravel Policies
- No middleware needed on routes - policies handle all authorization
- User roles and permissions are automatically included in Inertia shared data
- The sidebar navigation automatically shows admin links for users with admin role
- Policies prevent users from performing actions they shouldn't be able to do
- The admin interface respects policy permissions for all operations

## Best Practices

1. **Always use policies** for authorization instead of middleware
2. **Pass permissions to frontend** via the `can` object in Inertia responses
3. **Use conditional rendering** in React components based on permissions
4. **Keep policies focused** on specific models or actions
5. **Test policies thoroughly** to ensure proper authorization
