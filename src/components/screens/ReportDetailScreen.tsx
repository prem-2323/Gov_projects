import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, Calendar, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../BottomNav';
import StatusTimeline from '../ui/StatusTimeline';
import BeforeAfterSlider from '../ui/BeforeAfterSlider';

export default function ReportDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { reports } = useApp();
  
  const report = reports.find(r => r.id === id) || reports[0];
  // Simulate after image
  const afterImage = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400';

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-5 px-6 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Report Details</h1>
            <p className="text-blue-100 text-xs">ID: #{report.id}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Status Timeline */}
        <StatusTimeline currentStatus={report.status === 'cleaned' ? 'verified' : report.status} />

        {/* Before/After Slider */}
        {report.status === 'cleaned' && (
          <BeforeAfterSlider beforeImage={report.image} afterImage={afterImage} />
        )}

        {/* Location Details */}
        <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Location Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-bold text-blue-900">{report.location}</p>
                <p className="text-blue-600 text-sm font-medium">
                  {report.coordinates.lat.toFixed(4)}, {report.coordinates.lng.toFixed(4)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-bold text-blue-900">Reported On</p>
                <p className="text-blue-600 font-medium">{report.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-bold text-blue-900">Waste Type</p>
                <p className="text-blue-600 font-medium capitalize">{report.wasteType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}