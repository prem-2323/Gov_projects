import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Edit2, Mail, Phone, MapPin, Calendar, Award, Star, Trophy, Medal, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../BottomNav';
import AchievementBadge from '../ui/AchievementBadge';
import CircularProgress from '../ui/CircularProgress';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user } = useApp();

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-8 px-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <h1 className="text-white text-xl font-bold">Profile</h1>
        </div>

        {/* Profile Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-2 border-2 border-blue-200">
            <User className="w-10 h-10 text-blue-600" strokeWidth={2} />
          </div>
          <h2 className="text-white text-lg font-bold">{user.name}</h2>
          <p className="text-blue-100 capitalize text-xs font-medium">{user.role || 'User'}</p>
        </div>
      </div>

      {/* Profile Info Cards */}
      <div className="px-6 -mt-4 space-y-4">
        {/* Credits Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-blue-100 mb-1 text-xs font-medium">Total Credits</p>
              <p className="text-3xl font-bold">{user.credits}</p>
              <p className="text-blue-100 text-xs mt-1">Clean Citizen Level 2 🌟</p>
            </div>
            <CircularProgress score={75} size={80} strokeWidth={6} label="Profile" />
          </div>
          
          {/* Profile Completeness */}
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100 text-xs">Profile Completeness</span>
              <span className="text-white text-xs font-bold">75%</span>
            </div>
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-white"
              />
            </div>
            <p className="text-blue-100 text-xs mt-2">Add bio and location to complete</p>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-blue-900">Achievements</h3>
            <span className="text-blue-600 text-xs font-bold">6/12 Unlocked</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <AchievementBadge
              type="gold"
              title="First Report"
              description="Submitted first report"
              unlocked={true}
              icon="star"
            />
            <AchievementBadge
              type="silver"
              title="Week Streak"
              description="7 day streak"
              unlocked={true}
              icon="zap"
            />
            <AchievementBadge
              type="bronze"
              title="Team Player"
              description="5 verified reports"
              unlocked={true}
              icon="shield"
            />
            <AchievementBadge
              type="gold"
              title="Clean Hero"
              description="10 cleaned reports"
              unlocked={false}
              icon="trophy"
            />
            <AchievementBadge
              type="platinum"
              title="Elite Citizen"
              description="50 total reports"
              unlocked={false}
              icon="medal"
            />
            <AchievementBadge
              type="gold"
              title="Quick Response"
              description="Same-day cleaning"
              unlocked={false}
              icon="award"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-blue-900">Contact Information</h3>
            <button className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-blue-600 text-xs font-semibold">Email</p>
                <p className="text-blue-900 font-bold text-sm">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-blue-600 text-xs font-semibold">Phone</p>
                <p className="text-blue-900 font-bold text-sm">{user.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-blue-200">
          <h3 className="text-base font-bold text-blue-900 mb-4">Your Statistics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">12</p>
              <p className="text-blue-700 text-xs font-semibold mt-1">Reports</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">8</p>
              <p className="text-blue-700 text-xs font-semibold mt-1">Resolved</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">4</p>
              <p className="text-blue-700 text-xs font-semibold mt-1">Pending</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">67%</p>
              <p className="text-blue-700 text-xs font-semibold mt-1">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={handleEditProfile}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors"
        >
          Edit Profile
        </button>
      </div>
      
      <BottomNav />
    </div>
  );
}