import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: 'report' | 'task' | 'system';
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'report' | 'task' | 'system'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Report Cleaned',
      message: 'Your waste report at Anna Nagar has been cleaned',
      time: '2 hours ago',
      read: false,
      category: 'report'
    },
    {
      id: '2',
      type: 'info',
      title: 'Points Earned',
      message: 'You earned 50 points for your verified report',
      time: '5 hours ago',
      read: false,
      category: 'system'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Task Assigned',
      message: 'New cleaning task at T Nagar - High Priority',
      time: '1 day ago',
      read: true,
      category: 'task'
    }
  ]);

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === activeFilter);

  const handleDismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 right-0 bg-white z-50 max-h-[80vh] overflow-hidden shadow-2xl"
            style={{ maxWidth: '480px', margin: '0 auto' }}
          >
            {/* Header */}
            <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-white" />
                <h2 className="text-white text-lg font-bold">Notifications</h2>
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Filters */}
            <div className="px-6 py-3 bg-blue-50 border-b-2 border-blue-200 flex gap-2 overflow-x-auto">
              {['all', 'report', 'task', 'system'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border-2 border-blue-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[60vh] px-6 py-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-blue-300 mx-auto mb-3" />
                  <p className="text-blue-600 font-semibold">No notifications</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={() => handleMarkAsRead(notification.id)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        notification.read
                          ? 'bg-white border-blue-200'
                          : 'bg-blue-50 border-blue-400'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-blue-900 font-bold text-sm">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-blue-700 text-sm mb-2">
                            {notification.message}
                          </p>
                          <p className="text-blue-600 text-xs font-medium">
                            {notification.time}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleDismiss(notification.id, e)}
                          className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-red-100 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
