'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animationType?: 'fade-up' | 'fade-in' | 'slide-in-right';
}

export function MotionWrapper({ 
  children, 
  delay = 0, 
  className = "",
  animationType = 'fade-up'
}: MotionWrapperProps) {
  
  const variants = {
    'fade-up': {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 }
    },
    'fade-in': {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    'slide-in-right': {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      className={className}
      initial={variants[animationType].initial}
      whileInView={variants[animationType].animate}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
