import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

export default function AdminLayout() {
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { name: 'Manage Foods', path: '/admin/manage-foods', icon: Settings },
    { name: 'Add Food', path: '/admin/add-food', icon: PlusCircle },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] mt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 border-b pb-4">
            <LayoutDashboard className="text-primary" /> Admin Panel
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.includes(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 bg-gray-50/30">
        <Outlet />
      </main>
    </div>
  );
}
