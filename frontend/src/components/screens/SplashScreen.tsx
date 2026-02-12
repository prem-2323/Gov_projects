import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Recycle, Sparkles } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Simple background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Logo - Simple, no glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6"
      >
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
          <div className="relative">
            <Recycle className="w-10 h-10 text-blue-600 absolute" strokeWidth={2} />
            <MapPin className="w-8 h-8 text-blue-500 absolute top-2 left-7" strokeWidth={2} />
          </div>
        </div>
      </motion.div>

      {/* App Name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-3xl font-bold text-white mb-2"
      >
        CleanMap
      </motion.h1>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-sm text-blue-100 font-medium">
          Report. Track. Clean. Protect.
        </p>
        <p className="text-blue-200 text-xs mt-1">Government Waste Management System</p>
      </motion.div>

      {/* Simple loading dots */}
      <div className="absolute bottom-20 flex gap-2">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
          className="w-2 h-2 bg-white rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
          className="w-2 h-2 bg-white rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
          className="w-2 h-2 bg-white rounded-full"
        />
      </div>
    </div>
  );
}