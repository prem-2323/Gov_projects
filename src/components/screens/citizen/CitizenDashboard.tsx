import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Camera, FileText, Map, User, Award, Menu, TrendingUp, Star, Zap, AlertCircle, Clock } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import BottomNav from '../../BottomNav';
import FloatingActionButton from '../../ui/FloatingActionButton';
import CleanlinessScore from '../../ui/CleanlinessScore';
import NotificationBell from '../../ui/NotificationBell';
import AnimatedCounter from '../../ui/AnimatedCounter';
import CircularProgress from '../../ui/CircularProgress';
import MiniTrendChart from '../../ui/MiniTrendChart';
import NotificationPanel from '../../ui/NotificationPanel';

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const actions = [
    {
      id: 'report',
      title: 'Report Waste',
      subtitle: 'Quick Report',
      icon: Camera,
      gradient: 'from-red-500 to-rose-600',
      shadowColor: 'shadow-red-500/40',
      route: '/citizen/report-waste'
    },
    {
      id: 'reports',
      title: 'My Reports',
      subtitle: '12 Total',
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/40',
      route: '/citizen/my-reports'
    },
    {
      id: 'rewards',
      title: 'Rewards',
      subtitle: 'Earn Points',
      icon: Award,
      gradient: 'from-yellow-500 to-orange-500',
      shadowColor: 'shadow-yellow-500/40',
      route: '/rewards'
    },
    {
      id: 'map',
      title: 'Map View',
      subtitle: 'Live Map',
      icon: Map,
      gradient: 'from-green-600 to-emerald-600',
      shadowColor: 'shadow-green-500/40',
      route: '/citizen/map-view'
    },
    {
      id: 'profile',
      title: 'Profile',
      subtitle: 'View Profile',
      icon: User,
      gradient: 'from-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-500/40',
      route: '/profile'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* Notification Panel */}
      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-6 px-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-xs font-medium flex items-center gap-2">
              Good Morning
              <span className="text-blue-200">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated 2m ago
              </span>
            </p>
            <h1 className="text-white text-2xl font-bold">{user.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <Star className="w-5 h-5 text-white" strokeWidth={2} />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-blue-600 flex items-center justify-center text-white text-xs font-bold"
              >
                3
              </motion.span>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Credit Points Card with Animation */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-blue-500" fill="currentColor" />
                <p className="text-blue-600 font-semibold text-xs">Reward Points</p>
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <AnimatedCounter end={user.credits} className="text-4xl font-bold text-blue-700" />
                <MiniTrendChart data={[180, 200, 190, 220, 250]} trend="up" percentage={10} />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-blue-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '62%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                </div>
                <span className="text-blue-700 text-xs font-bold whitespace-nowrap">310 to next</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-blue-200 shadow-lg">
              <Award className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Tasks Section */}
      <div className="px-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 shadow-md mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm mb-1">Urgent: High Priority Area</h3>
              <p className="text-orange-100 text-xs">T Nagar needs immediate attention - 3 pending reports</p>
            </div>
            <button className="px-3 py-2 bg-white rounded-lg text-orange-600 font-bold text-xs hover:bg-orange-50 transition-colors">
              View
            </button>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-6">
        <h3 className="text-base font-bold text-blue-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => navigate(action.route)}
              className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className={`w-11 h-11 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center mb-3`}>
                <action.icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <h4 className="font-bold text-blue-900 text-sm mb-1">{action.title}</h4>
              <p className="text-xs text-blue-600">{action.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Cleanliness Score */}
      <div className="px-6 pb-6">
        <CleanlinessScore score={85} areaName="Anna Nagar" trend="up" />
      </div>

      {/* Stats */}
      <div className="px-6 pb-6">
        <h3 className="text-base font-bold text-blue-900 mb-4">Your Impact</h3>
        <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-blue-900 font-semibold text-sm">Total Reports</span>
            <span className="text-xl font-bold text-blue-600">12</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-blue-900 font-semibold text-sm">Cleaned</span>
            <span className="text-xl font-bold text-blue-600">8</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-blue-900 font-semibold text-sm">Pending</span>
            <span className="text-xl font-bold text-blue-600">4</span>
          </div>
        </div>
      </div>
      
      <FloatingActionButton />
      <BottomNav />
    </div>
  );
}