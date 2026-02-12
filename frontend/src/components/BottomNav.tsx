import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Camera, FileText, Map, User, ClipboardList, BarChart3, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();

  // Citizen Navigation Items
  const citizenNavItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/citizen/dashboard' },
    { id: 'report', icon: Camera, label: 'Report', route: '/citizen/report-waste' },
    { id: 'reports', icon: FileText, label: 'Reports', route: '/citizen/my-reports' },
    { id: 'map', icon: Map, label: 'Map', route: '/citizen/map-view' }
  ];

  // Cleaner Navigation Items
  const cleanerNavItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/cleaner/dashboard' },
    { id: 'tasks', icon: ClipboardList, label: 'Tasks', route: '/cleaner/task/2' },
    { id: 'map', icon: Map, label: 'Map', route: '/citizen/map-view' },
    { id: 'profile', icon: User, label: 'Profile', route: '/profile' }
  ];

  // Admin Navigation Items
  const adminNavItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/admin/dashboard' },
    { id: 'complaints', icon: FileText, label: 'Reports', route: '/admin/complaints' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', route: '/admin/analytics' },
    { id: 'settings', icon: Settings, label: 'Settings', route: '/settings' }
  ];

  // Select navigation items based on user role
  let navItems = citizenNavItems;
  if (user.role === 'cleaner') {
    navItems = cleanerNavItems;
  } else if (user.role === 'admin') {
    navItems = adminNavItems;
  }

  const isActive = (route: string) => {
    return location.pathname === route;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-200 z-50 max-w-[480px] mx-auto">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.route);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={`flex flex-col items-center justify-center flex-1 h-full rounded-lg transition-all ${
                active 
                  ? 'bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon 
                className={`w-5 h-5 mb-1 ${
                  active ? 'text-blue-600' : 'text-gray-500'
                }`}
                strokeWidth={2}
              /> 
              <span 
                className={`text-[10px] font-semibold ${
                  active ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}