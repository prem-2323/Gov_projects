import React from 'react';
import { motion } from 'motion/react';
import { Inbox, PartyPopper, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-reports' | 'all-completed' | 'no-results';
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ 
  type, 
  title, 
  message, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  const getConfig = () => {
    switch (type) {
      case 'no-reports':
        return {
          icon: Inbox,
          defaultTitle: 'No Reports Yet',
          defaultMessage: 'Start by reporting waste in your area to make a difference',
          color: 'text-blue-500',
          bgColor: 'bg-blue-100',
          emoji: '📋'
        };
      case 'all-completed':
        return {
          icon: PartyPopper,
          defaultTitle: 'All Tasks Completed! 🎉',
          defaultMessage: 'Great job! You\'ve finished all your assigned tasks',
          color: 'text-green-500',
          bgColor: 'bg-green-100',
          emoji: '✨'
        };
      case 'no-results':
        return {
          icon: Search,
          defaultTitle: 'No Results Found',
          defaultMessage: 'Try adjusting your filters or search terms',
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          emoji: '🔍'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      {/* Icon */}
      <div className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mb-6 border-4 border-blue-300`}>
        <Icon className={`w-12 h-12 ${config.color}`} strokeWidth={1.5} />
      </div>

      {/* Text content */}
      <div className="text-center max-w-sm">
        <h3 className="text-2xl font-bold text-blue-900 mb-3">
          {title || config.defaultTitle}
        </h3>
        <p className="text-blue-700 mb-6 font-medium">
          {message || config.defaultMessage}
        </p>
      </div>

      {/* Action button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}