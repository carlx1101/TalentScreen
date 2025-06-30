<?php

namespace App\Console\Commands;

use App\Services\SitemapService;
use Illuminate\Console\Command;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap for the application';

    /**
     * Execute the console command.
     */
    public function handle(SitemapService $sitemapService)
    {
        $this->info('Generating sitemap...');

        $sitemapService->generate();

        $this->info('Sitemap generated successfully at: ' . public_path('sitemap.xml'));
    }
}
