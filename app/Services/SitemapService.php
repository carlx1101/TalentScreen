<?php

namespace App\Services;

use Illuminate\Support\Facades\Route;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapService
{
    /**
     * Generate a sitemap for the application
     */
    public function generate(): void
    {
        $sitemap = Sitemap::create();

        // Add static routes
        $this->addStaticRoutes($sitemap);

        // Add dynamic routes from Route facade
        $this->addDynamicRoutes($sitemap);

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }

    /**
     * Add static routes to the sitemap
     */
    private function addStaticRoutes(Sitemap $sitemap): void
    {
        $staticRoutes = [
            '/' => [
                'priority' => 1.0,
                'changeFrequency' => Url::CHANGE_FREQUENCY_WEEKLY,
            ],
            '/login' => [
                'priority' => 0.8,
                'changeFrequency' => Url::CHANGE_FREQUENCY_MONTHLY,
            ],
            '/register' => [
                'priority' => 0.8,
                'changeFrequency' => Url::CHANGE_FREQUENCY_MONTHLY,
            ],
            '/forgot-password' => [
                'priority' => 0.6,
                'changeFrequency' => Url::CHANGE_FREQUENCY_MONTHLY,
            ],
            '/reset-password' => [
                'priority' => 0.6,
                'changeFrequency' => Url::CHANGE_FREQUENCY_MONTHLY,
            ],
            '/privacy-policy' => [
                'priority' => 0.5,
                'changeFrequency' => Url::CHANGE_FREQUENCY_YEARLY,
            ],
            '/terms-of-service' => [
                'priority' => 0.5,
                'changeFrequency' => Url::CHANGE_FREQUENCY_YEARLY,
            ],
        ];

        foreach ($staticRoutes as $path => $config) {
            $sitemap->add(Url::create($path)
                ->setLastModificationDate(now())
                ->setChangeFrequency($config['changeFrequency'])
                ->setPriority($config['priority']));
        }
    }

    /**
     * Add dynamic routes from Route facade
     */
    private function addDynamicRoutes(Sitemap $sitemap): void
    {
        $routes = Route::getRoutes();
        $baseUrl = config('app.url');

        foreach ($routes as $route) {
            // Skip API routes
            if (str_starts_with($route->getPrefix(), 'api')) {
                continue;
            }

            // Skip routes with parameters
            if (preg_match('/\{.*\}/', $route->uri())) {
                continue;
            }

            // Skip routes that require authentication (they have auth middleware)
            if ($this->hasAuthMiddleware($route)) {
                continue;
            }

            // Skip routes that are not GET requests
            if (!in_array('GET', $route->methods())) {
                continue;
            }

            $uri = $route->uri();

            // Skip empty URIs or URIs that are just '/'
            if (empty($uri) || $uri === '/') {
                continue;
            }

            // Skip internal/system routes
            if ($this->isInternalRoute($uri)) {
                continue;
            }

            // Determine priority based on route
            $priority = $this->getRoutePriority($uri);
            $changeFrequency = $this->getRouteChangeFrequency($uri);

            $sitemap->add(Url::create('/' . $uri)
                ->setLastModificationDate(now())
                ->setChangeFrequency($changeFrequency)
                ->setPriority($priority));
        }
    }

    /**
     * Check if route has authentication middleware
     */
    private function hasAuthMiddleware($route): bool
    {
        $middleware = $route->middleware();

        return in_array('auth', $middleware) ||
               in_array('auth:sanctum', $middleware) ||
               in_array('verified', $middleware);
    }

    /**
     * Check if route is an internal/system route that shouldn't be in sitemap
     */
    private function isInternalRoute(string $uri): bool
    {
        $internalPrefixes = [
            '_debugbar',
            'telescope',
            'sanctum',
            'user/confirm-password',
            'user/confirmed-password-status',
            'user/two-factor',
            'two-factor-challenge',
            'up',
        ];

        foreach ($internalPrefixes as $prefix) {
            if (str_starts_with($uri, $prefix)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get priority for a route based on its path
     */
    private function getRoutePriority(string $uri): float
    {
        if ($uri === 'dashboard') {
            return 0.9;
        }

        if (str_starts_with($uri, 'settings/')) {
            return 0.7;
        }

        return 0.6;
    }

    /**
     * Get change frequency for a route based on its path
     */
    private function getRouteChangeFrequency(string $uri): string
    {
        if ($uri === 'dashboard') {
            return Url::CHANGE_FREQUENCY_DAILY;
        }

        if (str_starts_with($uri, 'settings/')) {
            return Url::CHANGE_FREQUENCY_MONTHLY;
        }

        return Url::CHANGE_FREQUENCY_WEEKLY;
    }
}
