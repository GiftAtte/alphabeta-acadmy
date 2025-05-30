import AdminLayoutTemplate from '@/layouts/app/admin-layout';
import { type BreadcrumbItem } from '@/types/index.d';
import { type ReactNode } from 'react';

interface AdminAppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AdminAppLayoutProps) => (
    <AdminLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AdminLayoutTemplate>
);
