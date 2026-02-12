import React from 'react';
import { motion } from 'motion/react';
import { Award, TrendingUp, TrendingDown } from 'lucide-react';
import CircularProgress from './CircularProgress';

interface CleanlinessScoreProps {
  score: number; // 0-100
  areaName: string;
  trend?: 'up' | 'down' | 'stable';
}

export default function CleanlinessScore({ score, areaName, trend = 'up' }: CleanlinessScoreProps) {
  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  const getScoreColor = () => {
    if (score >= 80) return { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' };
    if (score >= 60) return { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' };
    return { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' };
  };

  const colors = getScoreColor();

  return (
    <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-sm">
      <h3 className="text-base font-bold text-blue-900 mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-blue-600" />
        Area Cleanliness Score
      </h3>

      <div className="flex items-center gap-5">
        {/* Circular Progress */}
        <CircularProgress score={score} size={100} strokeWidth={8} />

        {/* Details */}
        <div className="flex-1">
          <p className="text-blue-600 font-semibold mb-1 text-sm">Location</p>
          <p className="text-lg font-bold text-blue-900 mb-3">{areaName}</p>
          
          {/* Rating */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${colors.bg} border-2 ${colors.border} mb-2`}>
            <span className={`text-sm font-bold ${colors.text}`}>
              {getScoreLabel()}
            </span>
          </div>

          {/* Trend */}
          {trend && (
            <div className="flex items-center gap-2 mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : trend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-red-600" />
              ) : null}
              <span className="text-xs font-semibold text-blue-700">
                {trend === 'up' ? '+5% from last week' : trend === 'down' ? '-3% from last week' : 'No change'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}