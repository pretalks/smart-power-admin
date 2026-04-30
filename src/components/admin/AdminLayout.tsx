import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Package, 
  Map, 
  Star, 
  Home, 
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Global Settings', icon: Settings, path: '/admin/global-settings' },
  { label: 'Products', icon: Package, path: '/admin/products' },
  { label: 'Subsidy States', icon: Map, path: '/admin/subsidy' },
  { label: 'Reviews', icon: Star, path: '/admin/reviews' },
  { label: 'Homepage Control', icon: Home, path: '/admin/homepage' },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          !sidebarOpen && "-translate-x-full lg:w-20"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
            <span className={cn("text-xl font-bold text-primary transition-opacity duration-300", !sidebarOpen && "lg:opacity-0")}>
              Admin Panel
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                  )} />
                  <span className={cn(
                    "ml-3 transition-opacity duration-300 whitespace-nowrap",
                    !sidebarOpen && "lg:opacity-0 lg:w-0"
                  )}>
                    {item.label}
                  </span>
                  {isActive && sidebarOpen && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center justify-start px-3 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all",
                !sidebarOpen && "lg:justify-center"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className={cn(
                "ml-3 transition-opacity duration-300",
                !sidebarOpen && "lg:opacity-0 lg:w-0"
              )}>
                Logout
              </span>
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:hidden">
          <span className="text-xl font-bold text-primary">Admin</span>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
