import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  userName: string;
  onLogout: () => void;
}

export default function Layout({ children, userName, onLogout }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/' },
    { name: 'Clients', path: '/clients' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md hover:bg-gray-50 focus:outline-none"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-indigo-600">LegalPro</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
              </button>
              <div className="relative">
                <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900">
                  <User className="h-6 w-6" />
                  <span className="hidden sm:inline-block">{userName}</span>
                </button>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform lg:translate-x-0 lg:static lg:inset-0 transition duration-300 ease-in-out`}
        >
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}