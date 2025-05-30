import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { AdminSidebar } from '@/components/admin-sidebar';
import { type BreadcrumbItem } from '@/types/index.d';
import { type PropsWithChildren, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types/index.d';

export default function AdminLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { auth } = usePage<SharedData>().props;

    // Add debugging
    useEffect(() => {
        console.log('Admin Layout Auth:', auth);
        console.log('Current URL:', window.location.pathname);
    }, [auth]);

    return (
        <AppShell variant="sidebar">
            <AdminSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
