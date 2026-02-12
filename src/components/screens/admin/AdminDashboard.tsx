import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle, Clock, TrendingUp, Menu, BarChart3, FileText, Users } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import BottomNav from '../../BottomNav';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { reports } = useApp();

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    cleaned: reports.filter(r => r.status === 'cleaned').length,
    highPriority: reports.filter(r => r.priority === 'high').length
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-700 pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-100 text-lg"
            >
              Admin Dashboard
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-3xl font-bold"
            >
              CleanMap Control
            </motion.h1>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-6 py-8">
        <h3 className="text-xl font-bold text-gray-800 mb-5">Overview</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stats.total}</p>
            <p className="text-gray-600 text-sm">Total Complaints</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stats.pending}</p>
            <p className="text-gray-600 text-sm">Pending Cases</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stats.highPriority}</p>
            <p className="text-gray-600 text-sm">High Priority</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stats.cleaned}</p>
            <p className="text-gray-600 text-sm">Cleaned Today</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <h3 className="text-xl font-bold text-gray-800 mb-5">Quick Actions</h3>
        <div className="space-y-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/complaints')}
            className="w-full bg-white rounded-2xl p-5 shadow-md flex items-center justify-between hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800">Manage Complaints</h4>
                <p className="text-gray-600 text-sm">Review and assign tasks</p>
              </div>
            </div>
            <TrendingUp className="w-6 h-6 text-gray-400" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/analytics')}
            className="w-full bg-white rounded-2xl p-5 shadow-md flex items-center justify-between hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800">Analytics & Reports</h4>
                <p className="text-gray-600 text-sm">View performance metrics</p>
              </div>
            </div>
            <TrendingUp className="w-6 h-6 text-gray-400" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-5 shadow-md flex items-center justify-between hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800">Staff Management</h4>
                <p className="text-gray-600 text-sm">Manage cleaning staff</p>
              </div>
            </div>
            <TrendingUp className="w-6 h-6 text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Heatmap Preview */}
      <div className="px-6 pb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-5">Waste Hotspots</h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-md"
        >
          {/* Simulated Heatmap */}
          <div className="h-48 bg-gradient-to-br from-red-100 via-orange-100 to-green-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(239, 68, 68, 0.5) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)'
            }} />
            <p className="text-gray-700 font-semibold z-10">Heatmap Visualization</p>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">High Activity</span>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-red-400 rounded" />
              <div className="w-4 h-4 bg-orange-400 rounded" />
              <div className="w-4 h-4 bg-green-400 rounded" />
            </div>
            <span className="text-gray-600">Low Activity</span>
          </div>
        </motion.div>
      </div>
      
      <BottomNav />
    </div>
  );
}