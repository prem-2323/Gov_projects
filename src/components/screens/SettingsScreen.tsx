import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Globe, Bell, LogOut, ChevronRight, User } from 'lucide-react';
import BottomNav from '../BottomNav';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-5 px-6 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <h1 className="text-white text-xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Account Section */}
        <div>
          <h3 className="text-sm font-bold text-blue-700 mb-3 px-2">ACCOUNT</h3>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border-2 border-blue-200">
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex items-center justify-between p-5 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-blue-900">Profile</p>
                  <p className="text-sm text-blue-600 font-medium">View and edit your profile</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </button>

            <div className="border-t-2 border-blue-100" />

            <button
              onClick={() => navigate('/role-selection')}
              className="w-full flex items-center justify-between p-5 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-blue-900">Change Role</p>
                  <p className="text-sm text-blue-600 font-medium">Switch between user types</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div>
          <h3 className="text-sm font-bold text-blue-700 mb-3 px-2">PREFERENCES</h3>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border-2 border-blue-200">
            {/* Language Selection */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900">Language</p>
                    <p className="text-sm text-blue-600 font-medium">Choose your language</p>
                  </div>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none text-blue-900 font-medium"
              >
                <option value="english">English</option>
                <option value="tamil">தமிழ் (Tamil)</option>
                <option value="hindi">हिंदी (Hindi)</option>
              </select>
            </div>

            <div className="border-t-2 border-blue-100" />

            {/* Notifications Toggle */}
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-blue-600" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900">Notifications</p>
                    <p className="text-sm text-blue-600 font-medium">Enable push notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-16 h-8 rounded-full transition-colors ${
                    notifications ? 'bg-blue-600' : 'bg-blue-200'
                  }`}
                >
                  <motion.div
                    animate={{ x: notifications ? 32 : 0 }}
                    className="w-8 h-8 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-sm font-bold text-blue-700 mb-3 px-2">ABOUT</h3>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center border-2 border-blue-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-300">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5z'/%3E%3Cpath d='M2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E" 
                alt="CleanMap" 
                className="w-10 h-10"
              />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-1">CleanMap</h3>
            <p className="text-blue-700 font-semibold mb-2">Version 1.0.0</p>
            <p className="text-sm text-blue-600 font-medium">
              A smart waste management system for cleaner cities
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-red-600"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </div>
      
      <BottomNav />
    </div>
  );
}