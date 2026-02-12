import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, Briefcase, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function RoleSelectionScreen() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  const handleRoleSelect = (role: 'citizen' | 'cleaner' | 'admin') => {
    setUser({ ...user, role });
    
    if (role === 'citizen') {
      navigate('/citizen/dashboard');
    } else if (role === 'cleaner') {
      navigate('/cleaner/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen',
      description: 'Report waste in your area',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
      borderColor: 'border-blue-200',
      shadowColor: 'shadow-blue-500/50',
      accentColor: 'text-blue-600'
    },
    {
      id: 'cleaner',
      title: 'Cleaning Staff',
      description: 'Clean assigned locations',
      icon: Briefcase,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
      borderColor: 'border-orange-200',
      shadowColor: 'shadow-orange-500/50',
      accentColor: 'text-orange-600'
    },
    {
      id: 'admin',
      title: 'Government Admin',
      description: 'Monitor & manage waste',
      icon: Shield,
      gradient: 'from-blue-700 to-blue-800',
      bgGradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-gradient-to-br from-blue-700 to-blue-800',
      borderColor: 'border-blue-200',
      shadowColor: 'shadow-blue-500/50',
      accentColor: 'text-blue-700'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-6 px-6 shadow-md">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold mb-1">Choose Your Role</h1>
          <p className="text-blue-100 text-xs">Select how you want to contribute</p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="px-6 py-8 space-y-4">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect(role.id as any)}
            className={`bg-white border-2 ${role.borderColor} rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className={`w-14 h-14 ${role.iconBg} rounded-xl flex items-center justify-center`}>
                <role.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${role.accentColor} mb-1`}>
                  {role.title}
                </h3>
                <p className="text-blue-700 font-medium text-sm">
                  {role.description}
                </p>
              </div>
              
              {/* Arrow */}
              <ArrowRight className={`w-5 h-5 ${role.accentColor}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="px-6 pb-8">
        <div className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <p className="text-blue-700 text-sm font-medium">
              <span className="font-bold text-blue-900">Flexible Access:</span> You can switch roles anytime from settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}