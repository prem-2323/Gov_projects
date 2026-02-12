import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, MapPin, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import BottomNav from '../../BottomNav';
import { Plus, Minus, Locate } from 'lucide-react';

export default function MapViewScreen() {
  const navigate = useNavigate();
  const { reports } = useApp();
  const [selectedReport, setSelectedReport] = useState(reports[0]);

  const getMarkerColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-screen bg-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-4 px-6 shadow-md z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Live Map</h1>
            <p className="text-blue-100 text-xs">Waste reports in your area</p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Placeholder Map */}
        <div className="absolute inset-0 bg-blue-100">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800" 
            alt="Map" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Map Markers */}
        <div className="absolute inset-0">
          {reports.map((report, index) => (
            <div
              key={report.id}
              className="absolute"
              style={{
                left: `${30 + index * 15}%`,
                top: `${40 + index * 10}%`
              }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                report.status === 'pending' ? 'bg-blue-600' :
                report.status === 'assigned' ? 'bg-orange-500' :
                'bg-blue-500'
              }`}>
                <MapPin className="w-5 h-5 text-white" strokeWidth={2} fill="white" />
              </div>
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="absolute top-4 left-4 bg-white border-2 border-blue-200 rounded-xl p-4 shadow-lg">
          <h3 className="text-blue-900 font-bold mb-3 text-sm">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full border border-white"></div>
              <span className="text-blue-700 text-xs font-semibold">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full border border-white"></div>
              <span className="text-blue-700 text-xs font-semibold">Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <span className="text-blue-700 text-xs font-semibold">Cleaned</span>
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-24 right-4 space-y-2">
          <button className="w-12 h-12 bg-white border-2 border-blue-200 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-50">
            <Plus className="w-5 h-5 text-blue-600" strokeWidth={2} />
          </button>
          <button className="w-12 h-12 bg-white border-2 border-blue-200 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-50">
            <Minus className="w-5 h-5 text-blue-600" strokeWidth={2} />
          </button>
        </div>

        {/* Current Location Button */}
        <button className="absolute bottom-24 left-4 w-12 h-12 bg-blue-600 rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-700">
          <Locate className="w-5 h-5 text-white" strokeWidth={2} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}