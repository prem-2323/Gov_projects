import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

export default function FloatingActionButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/citizen/report-waste')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center z-40 border-4 border-white"
      style={{ maxWidth: 'calc(480px - 1.5rem)' }}
    >
      <Camera className="w-6 h-6 text-white" strokeWidth={2} />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 bg-blue-500 rounded-full -z-10"
      />
    </motion.button>
  );
}