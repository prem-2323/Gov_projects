import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Circle, Clock, Sparkles } from 'lucide-react';

interface StatusTimelineProps {
  currentStatus: 'pending' | 'assigned' | 'cleaned' | 'verified';
}

export default function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const steps = [
    { id: 'pending', label: 'Reported', icon: Circle, color: 'blue' },
    { id: 'assigned', label: 'Assigned', icon: Clock, color: 'blue' },
    { id: 'cleaned', label: 'Cleaned', icon: CheckCircle, color: 'blue' },
    { id: 'verified', label: 'Verified', icon: Sparkles, color: 'blue' }
  ];

  const statusOrder = ['pending', 'assigned', 'cleaned', 'verified'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="relative bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        Progress Timeline
      </h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-8 right-8 h-1 bg-blue-200 rounded-full" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-8 left-8 h-1 bg-blue-600 rounded-full z-10"
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center" style={{ flex: 1 }}>
                {/* Icon Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2, type: 'spring' }}
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center z-20 ${
                    isCompleted ? 'bg-blue-600 border-4 border-white shadow-lg' : 'bg-blue-200 border-4 border-white'
                  }`}
                >
                  <Icon 
                    className={`w-7 h-7 relative z-10 ${isCompleted ? 'text-white' : 'text-blue-400'}`}
                    strokeWidth={2.5}
                    fill={step.id === 'verified' && isCompleted ? 'currentColor' : 'none'}
                  />
                </motion.div>

                {/* Label */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.1 }}
                  className={`mt-3 font-bold text-sm text-center ${
                    isCompleted ? 'text-blue-900' : 'text-blue-400'
                  }`}
                >
                  {step.label}
                </motion.p>

                {/* Current Indicator */}
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-300"
                  >
                    Current
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}