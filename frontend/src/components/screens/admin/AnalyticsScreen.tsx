import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, TrendingUp, TrendingDown, Award } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import BottomNav from '../../BottomNav';

export default function AnalyticsScreen() {
  const navigate = useNavigate();

  const areaData = [
    { area: 'Anna Nagar', complaints: 45 },
    { area: 'T. Nagar', complaints: 38 },
    { area: 'Adyar', complaints: 32 },
    { area: 'Velachery', complaints: 28 },
    { area: 'Mylapore', complaints: 25 }
  ];

  const wasteTypeData = [
    { name: 'Plastic', value: 35, color: '#ef4444' },
    { name: 'Organic', value: 25, color: '#22c55e' },
    { name: 'Mixed', value: 20, color: '#f97316' },
    { name: 'Paper', value: 12, color: '#3b82f6' },
    { name: 'Metal', value: 8, color: '#8b5cf6' }
  ];

  const staffPerformance = [
    { name: 'Rajesh Kumar', completed: 42, rating: 4.8 },
    { name: 'Priya Sharma', completed: 38, rating: 4.9 },
    { name: 'Amit Patel', completed: 35, rating: 4.7 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-700 pt-12 pb-6 px-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-2xl font-bold">Analytics & Reports</h1>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Key Metrics */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-5 shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm">Resolution Rate</p>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-700">87%</p>
              <p className="text-green-600 text-xs mt-1">+5% from last month</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm">Avg Response Time</p>
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-700">2.4h</p>
              <p className="text-green-600 text-xs mt-1">-0.3h improvement</p>
            </motion.div>
          </div>
        </div>

        {/* Area-wise Complaints */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Area-wise Waste Reports</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="area" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="complaints" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Type Distribution */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Waste Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={wasteTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {wasteTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Staff Performance */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top Performing Staff</h3>
          <div className="space-y-4">
            {staffPerformance.map((staff, index) => (
              <motion.div
                key={staff.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{staff.name}</h4>
                  <p className="text-sm text-gray-600">{staff.completed} tasks completed</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-gray-800">{staff.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg"
        >
          Export Report (PDF)
        </motion.button>
      </div>
      
      <BottomNav />
    </div>
  );
}