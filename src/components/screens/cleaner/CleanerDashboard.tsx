import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ClipboardList, Navigation, Award, Menu, MapPin, Zap, TrendingUp } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import BottomNav from '../../BottomNav';

export default function CleanerDashboard() {
  const navigate = useNavigate();
  const { user, reports } = useApp();
  
  const assignedTasks = reports.filter(r => r.status === 'assigned');

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-6 px-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-xs font-medium">Good Morning 👋</p>
            <h1 className="text-white text-2xl font-bold">Cleaning Staff</h1>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Menu className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-200">
            <p className="text-blue-700 font-semibold mb-1 text-xs">Assigned Tasks</p>
            <p className="text-3xl font-bold text-blue-600">{assignedTasks.length}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-200">
            <p className="text-blue-700 font-semibold mb-1 text-xs">Credits Earned</p>
            <p className="text-3xl font-bold text-blue-600">{user.credits}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <h3 className="text-base font-bold text-blue-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/cleaner/task/2')}
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <ClipboardList className="w-5 h-5" strokeWidth={2} />
            My Tasks
          </button>
          
          <button
            onClick={() => navigate('/rewards')}
            className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Award className="w-5 h-5" strokeWidth={2} />
            Rewards
          </button>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="px-6 pb-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Today's Tasks</h3>
        <div className="space-y-3">
          {assignedTasks.map((task, index) => (
            <div
              key={task.id}
              onClick={() => navigate(`/cleaner/task/${task.id}`)}
              className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all border-2 border-blue-200"
            >
              <div className="flex gap-3">
                <img
                  src={task.image}
                  alt="Task"
                  className="w-16 h-16 rounded-lg object-cover border-2 border-blue-200"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-bold text-blue-900 text-sm">{task.location}</h4>
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700 border border-red-300' :
                      task.priority === 'medium' ? 'bg-orange-100 text-orange-700 border border-orange-300' :
                      'bg-blue-100 text-blue-700 border border-blue-300'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-medium">{task.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance */}
      <div className="px-6 pb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-blue-100 font-medium text-xs mb-1">This Month</p>
              <p className="text-xl font-bold">24 Tasks Completed</p>
              <p className="text-blue-100 font-medium text-xs mt-1">Keep up the great work!</p>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}