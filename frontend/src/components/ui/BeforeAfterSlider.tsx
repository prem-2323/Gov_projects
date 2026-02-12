import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
        <MoveHorizontal className="w-5 h-5 text-blue-600" />
        Before & After Comparison
      </h3>
      
      <div
        className="relative w-full h-80 rounded-xl overflow-hidden shadow-md border-4 border-blue-200 cursor-col-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* Before Image (Full) */}
        <img
          src={beforeImage}
          alt="Before cleaning"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* After Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={afterImage}
            alt="After cleaning"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-blue-600 shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-600">
            <MoveHorizontal className="w-6 h-6 text-blue-600" strokeWidth={3} />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded-lg font-bold text-sm shadow-md">
          BEFORE
        </div>
        <div className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-md">
          AFTER
        </div>

        {/* Instruction */}
        {!isDragging && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-blue-900/80 text-white rounded-lg text-xs font-semibold">
            👆 Drag to compare
          </div>
        )}
      </div>
    </div>
  );
}