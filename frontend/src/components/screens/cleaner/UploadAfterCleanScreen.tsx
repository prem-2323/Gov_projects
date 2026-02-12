import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Camera, Upload, CheckCircle, Award } from 'lucide-react';
import BottomNav from '../../BottomNav';

export default function UploadAfterCleanScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleCapture = () => {
    setCapturedImage('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400');
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsVerified(true);
    }, 2000);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <CheckCircle className="w-20 h-20 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-green-700 mb-3">
            Task Completed!
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            AI verified the cleanup successfully
          </p>
          
          {/* Credit Points Earned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-green-50 border-2 border-green-200 rounded-3xl p-6 mb-8"
          >
            <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-green-800 font-semibold mb-2">Credits Earned</p>
            <p className="text-4xl font-bold text-green-700">+25</p>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/cleaner/dashboard')}
              className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg"
            >
              Back to Dashboard
            </motion.button>
          </div>
        </motion.div>
        
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-orange-500 pt-12 pb-6 px-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-2xl font-bold">Upload After-Clean Photo</h1>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Camera Capture Area */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3 text-lg">
            Take After-Clean Photo
          </label>
          <div className="relative">
            {!capturedImage ? (
              <div className="w-full h-80 bg-gray-200 rounded-3xl flex items-center justify-center border-3 border-dashed border-gray-300">
                <div className="text-center">
                  <Camera className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No photo captured</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="After cleaning"
                  className="w-full h-80 object-cover rounded-3xl shadow-lg"
                />
                <button
                  onClick={() => setCapturedImage(null)}
                  className="absolute top-4 right-4 bg-red-500 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Retake
                </button>
              </div>
            )}
          </div>
          
          {!capturedImage && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCapture}
              className="w-full bg-orange-500 text-white py-5 rounded-2xl font-bold text-xl mt-4 shadow-lg flex items-center justify-center gap-3"
            >
              <Camera className="w-6 h-6" />
              Capture Photo
            </motion.button>
          )}
        </div>

        {/* Upload Button */}
        {capturedImage && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            disabled={isUploading}
            className={`w-full py-5 rounded-2xl font-bold text-xl shadow-lg flex items-center justify-center gap-3 ${
              isUploading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isUploading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Upload className="w-6 h-6" />
                </motion.div>
                Verifying...
              </>
            ) : (
              <>
                <Upload className="w-6 h-6" />
                Upload & Verify
              </>
            )}
          </motion.button>
        )}

        {/* Tips */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5">
          <h4 className="font-bold text-blue-900 mb-3">📸 Photo Guidelines</h4>
          <ul className="text-blue-800 space-y-2">
            <li>• Take photo from same angle as before</li>
            <li>• Ensure area is clearly visible</li>
            <li>• Good lighting is important</li>
            <li>• Show the cleaned area completely</li>
          </ul>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}