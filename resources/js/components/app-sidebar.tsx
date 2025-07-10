import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Shield, Building2, Briefcase, Settings } from 'lucide-react';
import AppLogo from './app-logo';
import { SharedData } from '@/types';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const isAdmin = user.roles.includes('admin');
    const permissions = user.permissions;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    if (permissions.includes('view company')) {
        mainNavItems.push({
            title: 'Company',
            href: '/company/edit',
            icon: Building2,
        });
    }

    if (permissions.includes('view job listings')) {
        mainNavItems.push({
            title: 'Job Listings',
            href: '/job-listings',
            icon: Briefcase,
        });
    }

    // Add admin navigation for admin users
    if (isAdmin) {
        mainNavItems.push({
            title: 'Role Management',
            href: '/admin/roles-permissions',
            icon: Shield,
        });
        mainNavItems.push({
            title: 'Job Listing Configuration',
            href: '/admin/job-listing-configuration',
            icon: Settings,
        });
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator className="group-data-[collapsible=icon]:block hidden w-full min-w-0 flex-col p-2 px-2 py-0 mx-0 my-2 transition-all ease-linear" />

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
