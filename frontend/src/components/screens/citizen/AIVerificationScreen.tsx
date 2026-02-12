import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, Loader2, Award, Sparkles } from 'lucide-react';
import { ChevronLeft, Brain, Camera } from 'lucide-react';
import BottomNav from '../../BottomNav';

export default function AIVerificationScreen() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
            <h1 className="text-white text-xl font-bold">AI Verification</h1>
            <p className="text-blue-100 text-xs">Analyzing your report...</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-6">
        {/* Verification Status */}
        <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300">
              <Sparkles className="w-7 h-7 text-blue-600" strokeWidth={2} fill="currentColor" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-blue-900 mb-1">Verification Complete</h2>
              <p className="text-blue-600 text-xs font-medium">Your report has been verified by AI</p>
            </div>
          </div>

          {/* Verification Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900 font-semibold">Image Quality</span>
              </div>
              <span className="text-blue-600 font-bold">Good</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900 font-semibold">Waste Detected</span>
              </div>
              <span className="text-blue-600 font-bold">Yes</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900 font-semibold">Location Verified</span>
              </div>
              <span className="text-blue-600 font-bold">Valid</span>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            AI Analysis
          </h3>
          <p className="text-blue-700 mb-4 font-medium text-sm">
            The AI system has detected plastic waste in the uploaded image. The waste appears to be scattered in a public area.
          </p>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-900 font-semibold mb-2 text-sm">Recommended Action:</p>
            <p className="text-blue-700 text-xs">
              This waste requires immediate attention. A cleaning crew will be assigned to this location within 24 hours.
            </p>
          </div>
        </div>

        {/* Credits Earned */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs mb-1">Credits Earned</p>
              <p className="text-3xl font-bold">+50</p>
            </div>
            <Award className="w-14 h-14 opacity-20" strokeWidth={1.5} />
          </div>
          <p className="text-blue-100 text-xs mt-3">Thank you for making your area cleaner!</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/citizen/dashboard')}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Done
          </button>
          
          <button
            onClick={() => navigate('/citizen/report-waste')}
            className="w-full bg-white border-2 border-blue-200 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Report Another
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}