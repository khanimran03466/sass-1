"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  CreditCard, 
  Plane, 
  Hotel, 
  Smartphone, 
  FileText, 
  PieChart, 
  Settings,
  LogOut,
  Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Pay Rent', icon: Wallet, path: '/rent' },
  { name: 'CC Bills', icon: CreditCard, path: '/credit-card' },
  { name: 'Flights', icon: Plane, path: '/flights' },
  { name: 'Hotels', icon: Hotel, path: '/hotels' },
  { name: 'Recharge', icon: Smartphone, path: '/recharge' },
  { name: 'Utility Bills', icon: FileText, path: '/bills' },
];

const Sidebar = () => {
  const pathname = usePathname();

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <div className="w-64 h-screen bg-card border-r border-white/10 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="font-bold text-white">S</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight">SuperApp</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <div className={`nav-link ${isActive ? 'active' : ''}`}>
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2 relative z-50">
        {user?.role === 'ADMIN' && (
          <Link href="/admin">
            <div className={`nav-link text-gray-400 hover:text-white ${pathname === '/admin' ? 'active' : ''}`}>
              <PieChart size={20} />
              <span>Admin Panel</span>
            </div>
          </Link>
        )}
        {user ? (
          <button 
            onClick={(e) => {
              e.preventDefault();
              localStorage.clear();
              window.location.replace('/login');
            }}
            className="w-full nav-link text-red-400 hover:bg-red-500/10 flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        ) : (
          <Link href="/login">
            <div className="w-full btn-primary py-3 flex items-center justify-center gap-2 rounded-xl text-sm">
              <LogOut size={18} className="rotate-180" />
              <span>Sign In</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
