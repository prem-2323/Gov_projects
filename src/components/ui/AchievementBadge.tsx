import React from 'react';
import { motion } from 'motion/react';
import { Award, Star, Trophy, Medal, Shield, Zap } from 'lucide-react';

interface AchievementBadgeProps {
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  title: string;
  description: string;
  unlocked: boolean;
  icon?: 'award' | 'star' | 'trophy' | 'medal' | 'shield' | 'zap';
}

export default function AchievementBadge({ type, title, description, unlocked, icon = 'award' }: AchievementBadgeProps) {
  const getGradient = (type: string) => {
    switch (type) {
      case 'platinum': return 'from-purple-400 to-purple-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getIcon = () => {
    switch (icon) {
      case 'star': return Star;
      case 'trophy': return Trophy;
      case 'medal': return Medal;
      case 'shield': return Shield;
      case 'zap': return Zap;
      default: return Award;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      whileHover={unlocked ? { scale: 1.05 } : {}}
      className={`relative ${unlocked ? '' : 'opacity-50'}`}
    >
      <div className={`p-4 rounded-2xl border-2 ${
        unlocked 
          ? 'bg-white border-blue-300' 
          : 'bg-gray-100 border-gray-300'
      }`}>
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${
          unlocked ? getGradient(type) : 'from-gray-300 to-gray-400'
        } flex items-center justify-center mb-3 mx-auto relative`}>
          <Icon className="w-7 h-7 text-white" strokeWidth={2} fill={unlocked ? 'currentColor' : 'none'} />
          {unlocked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
            >
              <Star className="w-3 h-3 text-white" fill="currentColor" />
            </motion.div>
          )}
          {!unlocked && (
            <div className="absolute inset-0 bg-gray-400/50 rounded-full backdrop-blur-sm" />
          )}
        </div>
        <h3 className={`text-sm font-bold text-center mb-1 ${
          unlocked ? 'text-blue-900' : 'text-gray-500'
        }`}>
          {title}
        </h3>
        <p className={`text-xs text-center ${
          unlocked ? 'text-blue-600' : 'text-gray-400'
        }`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
