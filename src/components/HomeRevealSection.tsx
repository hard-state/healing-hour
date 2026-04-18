'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useBackgroundVisibility } from '@/contexts/BackgroundVisibilityContext';
import Button from '@/components/ui/Button';

export default function HomeRevealSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: 0.5, // Trigger when 50% of section is visible
    once: false,
  });
  const { setBackgroundVisible } = useBackgroundVisibility();

  useEffect(() => {
    setBackgroundVisible(isInView);
  }, [isInView, setBackgroundVisible]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative h-[120vh] bg-transparent"
    >
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Glassmorphism Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-12 md:p-16 shadow-2xl border border-white/20"
          >
            {/* Gold Line Divider */}
            <motion.div
              variants={itemVariants}
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 bg-soft-gold mx-auto mb-6"
            />

            {/* Headline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white mb-4 font-light tracking-wide font-inter"
            >
              Have you booked yet?
            </motion.p>

            {/* Main Heading */}
            <motion.h2
              variants={itemVariants}
              className="font-elegant text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Book <span className="text-soft-gold">Today</span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-inter"
            >
              Experience ultimate relaxation and rejuvenation with our expert massage therapists. 
              Transform your wellness journey with premium therapeutic treatments tailored to your needs.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="inline-block"
            >
              <Button variant="primary" size="lg">
                Book Your Session
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
