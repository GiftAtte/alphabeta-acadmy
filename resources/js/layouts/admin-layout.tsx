import { ReactNode, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  Users,
  Award,
  BookOpen,
  BarChart2,
  Menu,
  X,
  LogOut,
  Settings,
  Home
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { url, component } = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart2, current: component === 'Admin/Dashboard' },
    { name: 'Students', href: '/admin/students', icon: Users, current: component === 'Admin/Students/Index' },
    { name: 'Certificates', href: '/admin/certificates', icon: Award, current: component === 'Admin/Certificates/Index' },
    { name: 'Trainings', href: '/admin/trainings', icon: BookOpen, current: component === 'Admin/Trainings/Index' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={toggleSidebar}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-50 md:relative md:flex md:flex-shrink-0 transition-all duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col w-64 bg-primary text-white h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-primary-700">
            <div className="flex items-center">
              <span className="text-xl font-semibold">Admin Panel</span>
            </div>
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleSidebar}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? 'bg-primary-700 text-white'
                      : 'text-white/80 hover:bg-primary-600 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pt-8 mt-8 border-t border-primary-700">
              <div className="space-y-1">
                <Link
                  href="/"
                  className="flex items-center px-2 py-2 text-sm font-medium text-white/80 rounded-md hover:bg-primary-600 hover:text-white"
                >
                  <Home className="mr-3 h-5 w-5" />
                  Back to Website
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center px-2 py-2 text-sm font-medium text-white/80 rounded-md hover:bg-primary-600 hover:text-white"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="flex items-center px-2 py-2 text-sm font-medium text-white/80 rounded-md hover:bg-primary-600 hover:text-white w-full text-left"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <button
                className="md:hidden text-gray-500 focus:outline-none"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <div className="text-sm font-medium text-gray-700">
                    Admin User
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
