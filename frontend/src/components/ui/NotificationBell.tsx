import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Report Verified',
      message: 'Your waste report has been verified by AI',
      time: '2 min ago'
    },
    {
      id: '2',
      type: 'info',
      title: 'Task Assigned',
      message: 'New cleaning task assigned to your area',
      time: '1 hour ago'
    },
    {
      id: '3',
      type: 'warning',
      title: 'High Priority Alert',
      message: 'Urgent cleanup needed in T. Nagar',
      time: '3 hours ago'
    }
  ]);

  const unreadCount = notifications.length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
      >
        <Bell className="w-6 h-6 text-white" strokeWidth={2} />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{unreadCount}</span>
          </div>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Panel */}
            <div className="fixed top-20 right-6 w-80 bg-white rounded-xl shadow-lg z-50 border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-blue-600 p-4 flex items-center justify-between">
                <h3 className="text-white font-bold">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50"
                  >
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getBgColor(notif.type)}`}>
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm mb-1">{notif.title}</p>
                        <p className="text-gray-600 text-xs mb-2">{notif.message}</p>
                        <p className="text-gray-400 text-xs">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button className="w-full text-center text-blue-600 font-semibold text-sm hover:text-blue-700">
                  View All Notifications
                </button>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}