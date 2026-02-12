import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, UserPlus, CheckCircle } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import BottomNav from '../../BottomNav';

export default function ComplaintManagementScreen() {
  const navigate = useNavigate();
  const { reports, updateReport } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'assigned' | 'cleaned'>('all');

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(r => r.status === filter);

  const handlePriorityChange = (reportId: string, newPriority: string) => {
    // Update report priority
    console.log(`Updating report ${reportId} priority to ${newPriority}`);
    // Add your update logic here
    updateReport(reportId, { priority: newPriority });
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-6 px-6 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-2xl font-bold">Complaint Management</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'pending', 'assigned', 'cleaned'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                filter === status
                  ? 'bg-white text-blue-700'
                  : 'bg-white/20 text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List */}
      <div className="px-6 py-6 space-y-4">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden shadow-md"
          >
            {/* Image and Priority */}
            <div className="relative">
              <img
                src={report.image}
                alt="Complaint"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  report.priority === 'high' ? 'bg-red-500 text-white' :
                  report.priority === 'medium' ? 'bg-orange-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {report.priority.toUpperCase()}
                </span>
                {report.aiVerified && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    AI Verified
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-800 font-semibold">{report.location}</p>
                  <p className="text-gray-500 text-sm">{report.date}</p>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex items-center gap-3">
                <div className={`flex-1 px-4 py-2 rounded-xl text-center font-semibold ${
                  report.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                  report.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {report.status.toUpperCase()}
                </div>
                
                {report.status === 'pending' && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/admin/assign-staff/${report.id}`)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-md hover:bg-blue-700 transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                    Assign
                  </motion.button>
                )}
              </div>

              {/* Priority Selector */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block text-gray-600 text-sm mb-2">Adjust Priority:</label>
                <select 
                  value={report.priority}
                  onChange={(e) => handlePriorityChange(report.id, e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <BottomNav />
    </div>
  );
}