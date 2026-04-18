import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
}

export default function GlassPanel({ 
  children, 
  className = '', 
  blur = 'md',
  opacity = 0.1 
}: GlassPanelProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        ${blurClasses[blur]} 
        bg-white/10 
        border border-white/20 
        rounded-2xl 
        shadow-2xl
        ${className}
      `}
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
    >
      {children}
    </motion.div>
  );
}
