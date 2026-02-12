import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import BottomNav from '../../BottomNav';

export default function MyReportsScreen() {
  const navigate = useNavigate();
  const { reports } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'assigned':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'cleaned':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'assigned':
        return 'Assigned';
      case 'cleaned':
        return 'Cleaned';
      default:
        return status;
    }
  };

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
            <h1 className="text-white text-xl font-bold">My Reports</h1>
            <p className="text-blue-100 text-xs">Track your submissions</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border-2 border-blue-200 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600 mb-1">{reports.length}</p>
            <p className="text-blue-700 font-semibold text-xs">Total</p>
          </div>
          <div className="bg-white border-2 border-blue-200 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600 mb-1">
              {reports.filter(r => r.status === 'pending').length}
            </p>
            <p className="text-blue-700 font-semibold text-xs">Pending</p>
          </div>
          <div className="bg-white border-2 border-blue-200 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600 mb-1">
              {reports.filter(r => r.status === 'cleaned').length}
            </p>
            <p className="text-blue-700 font-semibold text-xs">Cleaned</p>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="px-6 space-y-4 pb-6">
        {reports.map((report, index) => (
          <div
            key={report.id}
            className="bg-white border-2 border-blue-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={report.image}
                alt="Waste report"
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-lg font-bold border-2 ${getStatusColor(report.status)}`}>
                {getStatusText(report.status)}
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-blue-900 font-bold text-sm">{report.location}</p>
                  <p className="text-blue-600 text-xs font-medium">
                    {report.coordinates.lat.toFixed(4)}, {report.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <p className="text-blue-700 font-semibold text-sm">{report.date}</p>
              </div>

              {report.priority && (
                <div className="pt-3 border-t-2 border-blue-100 flex items-center justify-between">
                  <span className="text-sm text-blue-700 font-semibold">Priority:</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-lg ${
                    report.priority === 'high' ? 'bg-red-100 text-red-700 border border-red-300' :
                    report.priority === 'medium' ? 'bg-orange-100 text-orange-700 border border-orange-300' :
                    'bg-blue-100 text-blue-700 border border-blue-300'
                  }`}>
                    {report.priority.toUpperCase()}
                  </span>
                </div>
              )}
              
              {/* View Details Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/citizen/report/${report.id}`);
                }}
                className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <BottomNav />
    </div>
  );
}