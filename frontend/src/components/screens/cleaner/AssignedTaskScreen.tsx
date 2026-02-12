import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, Navigation, Camera, AlertCircle } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import BottomNav from '../../BottomNav';

export default function AssignedTaskScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { reports } = useApp();
  
  const task = reports.find(r => r.id === id) || reports[1];

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
          <h1 className="text-white text-xl font-bold">Task Details</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-5">
        {/* Priority Badge */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-blue-900">Assigned Task</h2>
          <span className={`px-3 py-1 rounded-lg font-bold text-xs ${
            task.priority === 'high' ? 'bg-red-100 text-red-700 border border-red-300' :
            task.priority === 'medium' ? 'bg-orange-100 text-orange-700 border border-orange-300' :
            'bg-blue-100 text-blue-700 border border-blue-300'
          }`}>
            {task.priority.toUpperCase()} PRIORITY
          </span>
        </div>

        {/* Before Photo */}
        <div className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-bold text-blue-900 mb-3">Before-Clean Photo</h3>
          <img
            src={task.image}
            alt="Before cleaning"
            className="w-full h-48 object-cover rounded-lg border-2 border-blue-200"
          />
        </div>

        {/* Location Details */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-blue-200">
          <h3 className="text-sm font-bold text-blue-900 mb-4">Location Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900 text-sm">{task.location}</p>
                <p className="text-blue-600 text-xs font-medium">
                  {task.coordinates.lat.toFixed(4)}, {task.coordinates.lng.toFixed(4)}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900 text-sm">Waste Type</p>
                <p className="text-blue-600 text-xs font-medium capitalize">{task.wasteType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            Navigate to Location
          </button>
          
          <button
            onClick={() => navigate(`/cleaner/upload-after-clean/${task.id}`)}
            className="w-full bg-white border-2 border-blue-200 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Upload After-Clean Photo
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <h4 className="font-bold text-blue-900 mb-3 text-sm">📋 Cleaning Instructions</h4>
          <ul className="text-blue-700 space-y-2 text-sm font-medium">
            <li>• Collect all visible waste materials</li>
            <li>• Ensure proper segregation by type</li>
            <li>• Clean the surrounding area</li>
            <li>• Take clear after-clean photo</li>
            <li>• Upload photo for verification</li>
          </ul>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}