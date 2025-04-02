
import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  message,
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };
  
  const colorClasses = {
    primary: 'border-t-primary',
    white: 'border-t-white',
  };

  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={spinTransition}
          className={`${sizeClasses.lg} rounded-full border-transparent ${colorClasses.primary} animate-spin`}
        />
        {message && (
          <p className="mt-4 text-foreground font-medium">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={spinTransition}
        className={`${sizeClasses[size]} rounded-full border-transparent ${colorClasses[color]} animate-spin`}
      />
      {message && (
        <p className="mt-2 text-sm text-foreground/80">{message}</p>
      )}
    </div>
  );
}
