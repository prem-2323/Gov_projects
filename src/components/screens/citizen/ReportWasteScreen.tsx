import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, ChevronLeft, Send, Sparkles, Check } from 'lucide-react';
import BottomNav from '../../BottomNav';
import { Trash2, X, FileText } from 'lucide-react';

export default function ReportWasteScreen() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);
  const [wasteType, setWasteType] = useState('');
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiConfidence, setAiConfidence] = useState(0);

  const handleTakePhoto = () => {
    // Simulate image capture
    setPhoto('https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400');
    
    // Start AI analysis
    setIsAnalyzing(true);
    setWasteType('');
    setAiConfidence(0);
    
    // Simulate AI detection process
    setTimeout(() => {
      const detectedTypes = ['plastic', 'food', 'electronic', 'construction', 'paper'];
      const randomType = detectedTypes[Math.floor(Math.random() * detectedTypes.length)];
      const confidence = Math.floor(Math.random() * 15) + 85; // 85-100%
      
      setWasteType(randomType);
      setAiConfidence(confidence);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getWasteTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      plastic: 'Plastic Waste',
      food: 'Food Waste',
      electronic: 'Electronic Waste',
      construction: 'Construction Waste',
      paper: 'Paper Waste'
    };
    return labels[type] || type;
  };

  const handleSubmit = () => {
    navigate('/citizen/ai-verification');
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-5 px-6 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Report Waste</h1>
            <p className="text-blue-100 text-xs">Help keep your area clean</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-6 space-y-5">
        {/* Photo Upload */}
        <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-sm">
          <label className="block text-blue-900 font-bold mb-3 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            Take Photo
          </label>
          
          {!photo ? (
            <button
              onClick={handleTakePhoto}
              className="w-full py-16 border-2 border-dashed border-blue-300 rounded-3xl bg-blue-50 hover:bg-blue-100 transition-colors flex flex-col items-center justify-center gap-3"
            >
              <Camera className="w-12 h-12 text-blue-500" strokeWidth={1.5} />
              <span className="text-blue-700 font-semibold">Tap to take photo</span>
              <span className="text-blue-600 text-xs">AI will detect waste type automatically</span>
            </button>
          ) : (
            <div className="relative">
              <img src={photo} alt="Waste" className="w-full h-64 object-cover rounded-3xl border-2 border-blue-200" />
              <button
                onClick={() => {
                  setPhoto(null);
                  setWasteType('');
                  setAiConfidence(0);
                  setIsAnalyzing(false);
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* AI Detection Result */}
        {photo && (
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-sm">
            <label className="block text-blue-900 font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              AI Waste Detection
            </label>
            
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative mb-4">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <Sparkles className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-blue-700 font-semibold">Analyzing image...</p>
                <p className="text-blue-600 text-sm mt-1">AI is detecting waste type</p>
              </div>
            ) : wasteType ? (
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-700 font-semibold text-sm">Detection Complete</span>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-600 font-bold text-xs">{aiConfidence}% Confident</span>
                    </div>
                  </div>
                  <p className="text-blue-700 text-sm">AI has successfully identified the waste type</p>
                </div>
                
                <button
                  onClick={handleTakePhoto}
                  className="w-full py-2 text-blue-600 font-semibold text-sm hover:bg-blue-50 rounded-2xl transition-colors"
                >
                  Retake Photo
                </button>
              </div>
            ) : null}
          </div>
        )}

        {/* Waste Type - Detected by AI */}
        {wasteType && !isAnalyzing && (
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-sm">
            <label className="block text-blue-900 font-bold mb-3 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-blue-600" />
              Waste Type
            </label>
            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl border-2 border-blue-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs font-semibold mb-1">AI Detected</p>
                  <p className="text-white font-bold text-lg capitalize">{getWasteTypeLabel(wasteType)}</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-sm">
          <label className="block text-blue-900 font-bold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Location
          </label>
          
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="text-blue-900 font-semibold text-sm">Current Location</p>
              <p className="text-blue-600 text-xs">13.0827° N, 80.2707° E</p>
            </div>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
              Change
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-sm">
          <label className="block text-blue-900 font-bold mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any additional details..."
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none bg-white resize-none text-blue-900"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!photo || !wasteType || isAnalyzing}
          className="w-full bg-blue-600 text-white py-3 rounded-3xl font-semibold shadow-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          {isAnalyzing ? 'Analyzing...' : 'Submit Report'}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}