import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, User, CheckCircle, Circle } from 'lucide-react';
import BottomNav from '../../BottomNav';

export default function AssignStaffScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  const staffList = [
    { id: '1', name: 'Rajesh Kumar', availability: 'available', tasksToday: 3, rating: 4.8 },
    { id: '2', name: 'Priya Sharma', availability: 'available', tasksToday: 2, rating: 4.9 },
    { id: '3', name: 'Amit Patel', availability: 'busy', tasksToday: 5, rating: 4.7 },
    { id: '4', name: 'Sunita Devi', availability: 'available', tasksToday: 1, rating: 5.0 },
    { id: '5', name: 'Vikram Singh', availability: 'busy', tasksToday: 6, rating: 4.6 }
  ];

  const handleAssign = () => {
    // Handle assignment logic
    navigate('/admin/complaints');
  };

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
          <div>
            <h1 className="text-white text-2xl font-bold">Assign Staff</h1>
            <p className="text-green-100 text-sm">Select cleaning staff for this task</p>
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="px-6 py-8 space-y-4">
        {staffList.map((staff, index) => (
          <motion.div
            key={staff.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => staff.availability === 'available' && setSelectedStaff(staff.id)}
            className={`bg-white rounded-3xl p-5 shadow-md transition-all ${
              staff.availability === 'available' 
                ? 'cursor-pointer hover:shadow-lg' 
                : 'opacity-50'
            } ${
              selectedStaff === staff.id ? 'ring-4 ring-green-500' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Selection Indicator */}
              <div className="flex-shrink-0">
                {selectedStaff === staff.id ? (
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
              </div>

              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>

              {/* Staff Info */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{staff.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    staff.availability === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {staff.availability === 'available' ? 'Available' : 'Busy'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {staff.tasksToday} tasks today
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {staff.rating}
                </div>
                <div className="text-xs text-gray-500">⭐ Rating</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Assign Button */}
      {selectedStaff && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAssign}
            className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg"
          >
            Assign Task to Staff
          </motion.button>
        </motion.div>
      )}
      
      <BottomNav />
    </div>
  );
}