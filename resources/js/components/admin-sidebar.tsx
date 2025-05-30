import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types/index.d';
import { usePage, router, Link } from '@inertiajs/react';
import {
  Award,
  BookOpen,
  LayoutGrid,
  Users,
  Home,
  GraduationCap,
  LogOut,
  MessageSquare,
  UserCog,
  Settings,
  Mail
} from 'lucide-react';
import AppLogo from './app-logo';
import { Icon } from '@/components/icon';
import type { SharedData } from '@/types/index.d';

// Custom styles for active navigation
const activeNavStyles = "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:bg-primary/90";

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: UserCog,
  },
  {
    title: 'Leads',
    href: '/admin/leads',
    icon: MessageSquare,
  },
  {
    title: 'Contacts',
    href: '/admin/contacts',
    icon: Mail,
  },
  {
    title: 'Students',
    href: '/admin/students',
    icon: Users,
  },
  {
    title: 'Certificates',
    href: '/admin/certificates',
    icon: Award,
  },
  {
    title: 'Trainings',
    href: '/admin/trainings',
    icon: GraduationCap,
  },
  {
    title: 'Settings',
    href: '/settings/profile',
    icon: Settings,
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Website Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Course Catalog',
    href: '/courses',
    icon: BookOpen,
  },
];

export function AdminSidebar() {
  const { url } = usePage();
  const { auth } = usePage<SharedData>().props;

  // Check if user is authenticated
  if (!auth?.user) {
    return null;
  }

  const handleLogout = () => {
    router.post('/logout');
  };

  const isActive = (href: string) => {
    return url.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <AppLogo />
                <span className="ml-2 font-semibold">Admin Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {mainNavItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                className={activeNavStyles}
              >
                <Link href={item.href}>
                  {item.icon && <Icon iconNode={item.icon} className="h-5 w-5 mr-3" />}
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
