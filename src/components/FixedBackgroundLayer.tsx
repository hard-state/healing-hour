'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FixedBackgroundLayerProps {
  isVisible: boolean;
}

export default function FixedBackgroundLayer({ isVisible }: FixedBackgroundLayerProps) {
  return (
    <motion.div
      className="fixed inset-0 w-full h-full object-cover pointer-events-none -z-50"
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Massage Therapy Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
    </motion.div>
  );
}
