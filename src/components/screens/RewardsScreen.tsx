import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Star, Award, Gift, TrendingUp, Camera, CheckCircle, Zap, Trophy, Medal } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../BottomNav';

export default function RewardsScreen() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<'earn' | 'redeem'>('earn');

  // Citizen earning activities
  const citizenEarnings = [
    {
      id: 1,
      icon: Camera,
      title: 'Report Waste',
      points: '+50',
      description: 'Submit a verified waste report',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: CheckCircle,
      title: 'AI Verified Report',
      points: '+20',
      description: 'Get AI verification on your report',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      icon: Zap,
      title: 'Quick Response',
      points: '+30',
      description: 'Report cleaned within 24 hours',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 4,
      icon: Trophy,
      title: 'Monthly Champion',
      points: '+200',
      description: 'Top reporter of the month',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  // Cleaner earning activities
  const cleanerEarnings = [
    {
      id: 1,
      icon: CheckCircle,
      title: 'Task Completed',
      points: '+100',
      description: 'Successfully complete assigned task',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: Zap,
      title: 'Quick Completion',
      points: '+50',
      description: 'Complete task before deadline',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      icon: Star,
      title: 'Quality Work',
      points: '+75',
      description: 'Get 5-star rating from citizens',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 4,
      icon: Trophy,
      title: 'Top Performer',
      points: '+300',
      description: 'Most tasks completed this month',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  // Rewards to redeem
  const rewards = [
    {
      id: 1,
      icon: Gift,
      title: 'Gift Voucher',
      points: 500,
      description: '₹500 shopping voucher',
      available: true
    },
    {
      id: 2,
      icon: Medal,
      title: 'Certificate',
      points: 300,
      description: 'Cleanliness Champion Certificate',
      available: true
    },
    {
      id: 3,
      icon: Trophy,
      title: 'Premium Badge',
      points: 1000,
      description: 'Exclusive profile badge',
      available: user.credits >= 1000
    },
    {
      id: 4,
      icon: Award,
      title: 'Community Award',
      points: 2000,
      description: 'Government recognition award',
      available: user.credits >= 2000
    }
  ];

  // Recent points history
  const pointsHistory = [
    {
      id: 1,
      activity: user.role === 'citizen' ? 'Waste Report Submitted' : 'Task Completed',
      points: user.role === 'citizen' ? '+50' : '+100',
      date: '2 hours ago',
      icon: user.role === 'citizen' ? Camera : CheckCircle
    },
    {
      id: 2,
      activity: 'AI Verification Bonus',
      points: '+20',
      date: '1 day ago',
      icon: Zap
    },
    {
      id: 3,
      activity: user.role === 'citizen' ? 'Quick Response Bonus' : 'Quality Work Bonus',
      points: user.role === 'citizen' ? '+30' : '+75',
      date: '3 days ago',
      icon: Star
    }
  ];

  const earningActivities = user.role === 'citizen' ? citizenEarnings : cleanerEarnings;

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-6 px-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Rewards</h1>
            <p className="text-blue-100 text-xs">Earn points and get rewards</p>
          </div>
        </div>

        {/* Points Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-blue-500" fill="currentColor" />
                <p className="text-blue-600 font-semibold text-xs">Total Points</p>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-bold text-blue-700">{user.credits}</h2>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-md">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-green-700 font-semibold text-xs">+15%</span>
                </div>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-blue-200 shadow-lg">
              <Award className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <div className="flex bg-white rounded-xl p-1 mb-6 border-2 border-blue-200 shadow-sm">
          <button
            onClick={() => setActiveTab('earn')}
            className={`flex-1 py-3 rounded-lg font-bold transition-colors ${
              activeTab === 'earn'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600'
            }`}
          >
            Earn Points
          </button>
          <button
            onClick={() => setActiveTab('redeem')}
            className={`flex-1 py-3 rounded-lg font-bold transition-colors ${
              activeTab === 'redeem'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600'
            }`}
          >
            Redeem
          </button>
        </div>

        {/* Earn Points Tab */}
        {activeTab === 'earn' && (
          <div className="space-y-6">
            {/* Earning Activities */}
            <div>
              <h3 className="text-blue-900 font-bold mb-4 text-base">Ways to Earn Points</h3>
              <div className="grid grid-cols-2 gap-4">
                {earningActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: activity.id * 0.1 }}
                    className="bg-white border-2 border-blue-200 rounded-3xl p-4 shadow-sm"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${activity.gradient} rounded-xl flex items-center justify-center mb-3`}>
                      <activity.icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <h4 className="font-bold text-blue-900 text-sm mb-1">{activity.title}</h4>
                    <p className="text-blue-600 text-xs mb-2">{activity.description}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <span className="text-blue-700 font-bold text-sm">{activity.points}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Points History */}
            <div>
              <h3 className="text-blue-900 font-bold mb-4 text-base">Recent Activity</h3>
              <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-sm space-y-3">
                {pointsHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-blue-900 font-semibold text-sm">{item.activity}</p>
                        <p className="text-blue-600 text-xs">{item.date}</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-bold text-sm">{item.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Redeem Tab */}
        {activeTab === 'redeem' && (
          <div className="space-y-4">
            <h3 className="text-blue-900 font-bold mb-4 text-base">Available Rewards</h3>
            {rewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reward.id * 0.1 }}
                className={`bg-white border-2 rounded-3xl p-5 shadow-sm ${
                  reward.available ? 'border-blue-200' : 'border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    reward.available 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gray-300'
                  }`}>
                    <reward.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-900 text-base mb-1">{reward.title}</h4>
                    <p className="text-blue-600 text-sm mb-3">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        <span className="text-blue-900 font-bold text-sm">{reward.points} Points</span>
                      </div>
                      {reward.available ? (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
                          Redeem
                        </button>
                      ) : (
                        <span className="text-gray-500 text-xs font-semibold">Not enough points</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
