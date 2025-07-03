# TalentScreen Rebuild - Setup Guide

This guide will help you set up the TalentScreen Laravel project on your local development environment.

## Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 18+ and npm
- MySQL/PostgreSQL database
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd talentscreen-rebuild
```

### 2. Install Dependencies

Install PHP dependencies:
```bash
composer install
```

Install Node.js dependencies and build assets:
```bash
npm install
npm run build
```

For development, you can use:
```bash
npm run dev
```

### 3. Environment Configuration

Copy the environment file:
```bash
cp .env.example .env
```

If you have an encrypted `.env.secret` file, decrypt it:
```bash
php artisan env:decrypt
```


### 4. Application Key and Encryption

Generate the application key:
```bash
php artisan key:generate
```

### 5. Configure Environment Variables

Edit the `.env` file and update api keys and etc.


### 6. Database Setup

Run database migrations:
```bash
php artisan migrate
```

Seed the database with initial data:
```bash
php artisan db:seed
```

### 7. Start Development Server

Start the Laravel development server:
```bash
php artisan serve
```

Or use the composer script:
```bash
composer run dev
```

The application will be available at `http://localhost:8000`

## Additional Setup

### Storage and Cache

Create storage links and clear cache:
```bash
php artisan storage:link
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

### Telescope (Debugging)

If you need to access Laravel Telescope for debugging:
```bash
php artisan telescope:install
php artisan migrate
```

### Testing

Run the test suite:
```bash
php artisan test
```

## Troubleshooting

### Common Issues

1. **Permission Errors**: Make sure storage and bootstrap/cache directories are writable
2. **Composer Memory Issues**: Run `composer install --ignore-platform-reqs` if needed
3. **Node Modules Issues**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Getting Help

If you encounter any issues during setup, please check:
- Laravel documentation: https://laravel.com/docs
- Project-specific documentation in the `docs/` directory
- GitHub issues for known problems

## Development Workflow

1. Make sure you're on the correct branch
2. Run `npm run dev` for asset compilation during development
3. Use `php artisan serve` to start the development server
4. Access the application at `http://localhost:8000`

## Production Deployment

For production deployment, remember to:
- Set `APP_ENV=production`
- Set `APP_DEBUG=false`
- Configure proper database credentials
- Set up proper file permissions
- Use `npm run build` for production assets