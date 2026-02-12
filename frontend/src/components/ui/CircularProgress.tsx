import React from 'react';
import { motion } from 'motion/react';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function CircularProgress({ score, size = 120, strokeWidth = 8, label = '' }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-2xl font-bold"
          style={{ color: getColor(score) }}
        >
          {score}%
        </motion.span>
        {label && (
          <span className="text-xs text-blue-600 font-semibold mt-1">{label}</span>
        )}
      </div>
    </div>
  );
}
