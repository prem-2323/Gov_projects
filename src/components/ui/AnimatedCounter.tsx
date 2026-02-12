import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({ end, duration = 1000, suffix = '', className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {count}{suffix}
    </motion.span>
  );
}
