import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MiniTrendChartProps {
  data: number[];
  trend: 'up' | 'down';
  percentage: number;
}

export default function MiniTrendChart({ data, trend, percentage }: MiniTrendChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex items-center gap-2">
      <svg width="60" height="24" className="overflow-visible">
        <motion.polyline
          points={points}
          fill="none"
          stroke={trend === 'up' ? '#10B981' : '#EF4444'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </svg>
      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${
        trend === 'up' ? 'bg-green-100' : 'bg-red-100'
      }`}>
        {trend === 'up' ? (
          <TrendingUp className="w-3 h-3 text-green-600" />
        ) : (
          <TrendingDown className="w-3 h-3 text-red-600" />
        )}
        <span className={`text-xs font-bold ${
          trend === 'up' ? 'text-green-700' : 'text-red-700'
        }`}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}
