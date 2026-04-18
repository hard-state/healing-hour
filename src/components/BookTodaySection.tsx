'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const bookImages = [
  {
    url: 'https://images.unsplash.com/photo-1731597076108-f3bbe268162f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Deep Tissue Massage',
    description: 'Intensive muscle relief and tension release',
    price: '80'
  },
  {
    url: 'https://images.unsplash.com/photo-1570174006460-406fed1f4778?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Swedish Massage',
    description: 'Gentle relaxation and stress reduction',
    price: '60'
  },
  {
    url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Hot Stone Massage',
    description: 'Therapeutic heat for deep muscle relaxation',
    price: '90'
  }
];

export default function BookTodaySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [desktopStyle, setDesktopStyle] = useState<'original' | 'premium'>('original');

  return (
    <section id="book" className="py-20 bg-warm-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-1 bg-soft-gold mx-auto mb-6"
          />
          
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-matte-black mb-4">
            Book Your
            <span className="text-yellow-400"> Session</span>
          </h2>
          
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Explore our range of massage therapies and find the perfect treatment for your needs
          </p>
        </motion.div>

        {/* Desktop Style Toggle */}
        <div className="hidden md:flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-soft-gold via-yellow-400 to-soft-gold rounded-full blur-xl opacity-60"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-soft-gold rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Main Button */}
            <motion.button
              onClick={() => setDesktopStyle(desktopStyle === 'original' ? 'premium' : 'original')}
              className="relative bg-gradient-to-r from-soft-gold via-yellow-400 to-soft-gold text-matte-black px-8 py-4 rounded-full font-bold text-lg shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden group"
              whileHover={{ 
                scale: 1.08, 
                y: -3,
                boxShadow: "0 20px 40px -15px rgba(212, 175, 55, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: [-200, 400]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              
              {/* Button Content */}
              <div className="relative z-10 flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: desktopStyle === 'premium' ? 360 : 0,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 0.6,
                    scale: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                  className="text-2xl"
                >
                  ✨
                </motion.div>
                
                <div className="flex flex-col items-start">
                  <span className="font-bold text-matte-black">
                    {desktopStyle === 'original' ? 'Try Premium View' : 'Classic View'}
                  </span>
                  <span className="text-xs font-medium text-matte-black/80">
                    {desktopStyle === 'original' ? '✨ Enhanced Experience' : '📱 Traditional Layout'}
                  </span>
                </div>
                
                <motion.div
                  animate={{ 
                    x: desktopStyle === 'premium' ? 5 : 0,
                    rotate: desktopStyle === 'premium' ? 180 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className="text-xl"
                >
                  {desktopStyle === 'original' ? '�' : '👈'}
                </motion.div>
              </div>
            </motion.button>
            
            {/* Floating Particles */}
            {desktopStyle === 'original' && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-soft-gold rounded-full"
                    initial={{ 
                      scale: 0,
                      opacity: 0,
                      x: 0,
                      y: 0
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [0, (i - 1) * 30],
                      y: [0, -20 - i * 10]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: i * 0.3,
                      ease: "easeOut"
                    }}
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </div>

        {/* Mobile Style Toggle */}
        <div className="flex md:hidden justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-soft-gold via-yellow-400 to-soft-gold rounded-full blur-xl opacity-60"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-soft-gold rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Main Button */}
            <motion.button
              onClick={() => setDesktopStyle(desktopStyle === 'original' ? 'premium' : 'original')}
              className="relative bg-gradient-to-r from-soft-gold via-yellow-400 to-soft-gold text-matte-black px-6 py-3 rounded-full font-bold text-base shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden group"
              whileHover={{ 
                scale: 1.08, 
                y: -3,
                boxShadow: "0 20px 40px -15px rgba(212, 175, 55, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: [-200, 400]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              
              {/* Button Content */}
              <div className="relative z-10 flex items-center gap-2">
                <motion.div
                  animate={{ 
                    rotate: desktopStyle === 'premium' ? 360 : 0,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 0.6,
                    scale: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                  className="text-lg"
                >
                  ✨
                </motion.div>
                
                <div className="flex flex-col items-start">
                  <span className="font-bold text-matte-black text-sm">
                    {desktopStyle === 'original' ? 'Try Premium' : 'Classic'}
                  </span>
                  <span className="text-xs font-medium text-matte-black/80">
                    {desktopStyle === 'original' ? 'Enhanced' : 'Traditional'}
                  </span>
                </div>
                
                <motion.div
                  animate={{ 
                    x: desktopStyle === 'premium' ? 3 : 0,
                    rotate: desktopStyle === 'premium' ? 180 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className="text-base"
                >
                  {desktopStyle === 'original' ? '👉' : '👈'}
                </motion.div>
              </div>
            </motion.button>
            
            {/* Floating Particles */}
            {desktopStyle === 'original' && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-soft-gold rounded-full"
                    initial={{ 
                      scale: 0,
                      opacity: 0,
                      x: 0,
                      y: 0
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [0, (i - 1) * 20],
                      y: [0, -15 - i * 8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: i * 0.3,
                      ease: "easeOut"
                    }}
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </div>

        {/* Mobile: Conditional Style */}
        <div className="block md:hidden">
          {desktopStyle === 'original' ? (
            // Original Mobile Horizontal Gallery with Click Interactions
            <div className="flex h-80 overflow-hidden rounded-2xl">
              {bookImages.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{
                    flex: activeIndex === index 
                      ? '3 1 0%' 
                      : '1 1 0%',
                    transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out"
                    style={{ backgroundImage: `url(${item.url})` }}
                  />
                  
                  {/* Overlay Content - Visible after 0.5s delay when expanded */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4"
                    animate={{
                      opacity: activeIndex === index ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: activeIndex === index ? 0.5 : 0
                    }}
                  >
                    <div className="text-white">
                      <motion.h3
                        className="font-elegant text-lg md:text-xl font-bold mb-1"
                        animate={{
                          y: activeIndex === index ? 0 : 20,
                          opacity: activeIndex === index ? 1 : 0
                        }}
                        transition={{ 
                          duration: 0.3, 
                          ease: 'easeOut',
                          delay: activeIndex === index ? 0.5 : 0
                        }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      <motion.p
                        className="text-xs md:text-sm mb-2 max-w-xs"
                        animate={{
                          y: activeIndex === index ? 0 : 20,
                          opacity: activeIndex === index ? 1 : 0
                        }}
                        transition={{ 
                          duration: 0.3, 
                          ease: 'easeOut', 
                          delay: activeIndex === index ? 0.6 : 0
                        }}
                      >
                        {item.description}
                      </motion.p>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          y: activeIndex === index ? 0 : 20,
                          opacity: activeIndex === index ? 1 : 0
                        }}
                        transition={{ 
                          duration: 0.3, 
                          ease: 'easeOut', 
                          delay: activeIndex === index ? 0.7 : 0
                        }}
                        className="bg-soft-gold text-matte-black px-4 py-2 rounded-full font-medium text-sm hover:bg-yellow-400 transition-colors"
                      >
                        Book Now - ${item.price}
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Premium Vertical Cards (Mobile Version)
            <div className="space-y-10">
              {bookImages.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 50, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: index * 0.3, ease: "easeOut" }}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  style={{ perspective: "1000px" }}
                >
                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-soft-gold via-yellow-400 to-soft-gold rounded-3xl opacity-0 blur-sm"
                    animate={{
                      opacity: activeIndex === index ? 0.6 : 0,
                      scale: activeIndex === index ? 1.05 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Main Card Container */}
                  <motion.div
                    className="relative bg-gradient-to-br from-warm-cream via-amber-50 to-warm-cream rounded-3xl overflow-hidden shadow-2xl border border-soft-gold/20"
                    animate={{
                      scale: activeIndex === index ? 1.03 : 1,
                      rotateY: activeIndex === index ? 2 : 0
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-soft-gold/20 to-transparent" />
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          backgroundPosition: activeIndex === index ? "0% 50%" : "100% 50%"
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(212, 175, 55, 0.1) 10px,
                            rgba(212, 175, 55, 0.1) 20px
                          )`
                        }}
                      />
                    </div>
                    
                    {/* Image Section with Premium Effects */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.url})` }}
                        animate={{
                          scale: activeIndex === index ? 1.15 : 1.05,
                          filter: activeIndex === index ? "brightness(1.1)" : "brightness(0.9)"
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                      
                      {/* Multi-layer Gradient Overlay */}
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-transparent to-matte-black/50" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-soft-gold/20 via-transparent to-yellow-400/20"
                          animate={{
                            opacity: activeIndex === index ? 0.8 : 0.3
                          }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      
                      {/* Floating Premium Price Badge */}
                      <motion.div
                        animate={{
                          y: activeIndex === index ? [-8, 0, -8] : 0,
                          rotate: activeIndex === index ? [-5, 5, -5] : 0,
                          scale: activeIndex === index ? 1.1 : 1
                        }}
                        transition={{ 
                          duration: activeIndex === index ? 3 : 0.3,
                          repeat: activeIndex === index ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                        className="absolute top-6 right-6"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-soft-gold rounded-full blur-lg opacity-50" />
                          <div className="relative bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-6 py-3 rounded-full font-bold shadow-2xl border-2 border-white/30 backdrop-blur-sm">
                            <span className="text-lg">${item.price}</span>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Luxurious Shimmer Overlay */}
                      {activeIndex === index && (
                        <>
                          <motion.div
                            initial={{ x: -300, rotate: 45 }}
                            animate={{ x: 600, rotate: 45 }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          />
                          <motion.div
                            initial={{ x: -300, rotate: -45 }}
                            animate={{ x: 600, rotate: -45 }}
                            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-soft-gold/20 to-transparent"
                          />
                        </>
                      )}
                    </div>
                    
                    {/* Premium Content Section */}
                    <div className="p-8 relative">
                      {/* Animated Gold Divider */}
                      <motion.div
                        className="absolute top-0 left-8 right-8 h-0.5"
                        animate={{
                          background: activeIndex === index 
                            ? "linear-gradient(90deg, transparent, #D4AF37, #F4E4C1, #D4AF37, transparent)"
                            : "linear-gradient(90deg, transparent, #D4AF37, transparent)"
                        }}
                        transition={{ duration: 0.8 }}
                      />
                      
                      {/* Title with Premium Effects */}
                      <motion.h3
                        className="font-elegant text-4xl font-bold mb-6 mt-4"
                        animate={{
                          color: activeIndex === index ? "#D4AF37" : "#1A1A1A",
                          textShadow: activeIndex === index 
                            ? "0 0 20px rgba(212, 175, 55, 0.3)"
                            : "none",
                          letterSpacing: activeIndex === index ? "0.05em" : "0"
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      {/* Expandable Luxury Content */}
                      <motion.div
                        animate={{
                          height: activeIndex === index ? "auto" : "0",
                          opacity: activeIndex === index ? 1 : 0,
                          marginBottom: activeIndex === index ? "24px" : "0"
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4">
                          <p className="text-charcoal leading-relaxed text-xl font-light">
                            {item.description}
                          </p>
                          
                          {/* Premium Feature Badges */}
                          <div className="flex flex-wrap gap-3 pt-3">
                            {['✨ Luxury', '🌿 Professional', '💆 Relaxing'].map((feature, i) => (
                              <motion.span
                                key={feature}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className="bg-gradient-to-r from-soft-gold/20 to-yellow-400/20 text-soft-gold px-4 py-2 rounded-full text-sm font-semibold border border-soft-gold/30 backdrop-blur-sm"
                              >
                                {feature}
                              </motion.span>
                            ))}
                          </div>
                          
                          {/* Rating Stars */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-1 pt-2"
                          >
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="text-soft-gold text-xl"
                              >
                                ⭐
                              </motion.div>
                            ))}
                            <span className="text-charcoal ml-2 text-sm">(5.0)</span>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      {/* Ultra-Premium Button */}
                      <motion.button
                        className="w-full py-5 rounded-2xl font-bold text-xl transition-all duration-400 relative overflow-hidden group"
                        animate={{
                          background: activeIndex === index
                            ? "linear-gradient(135deg, #D4AF37, #F4E4C1, #D4AF37)"
                            : "linear-gradient(135deg, #1A1A1A, #36454F, #1A1A1A)",
                          color: activeIndex === index ? "#1A1A1A" : "#F5E6D3",
                          scale: activeIndex === index ? 1.02 : 1
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Multiple Shimmer Layers */}
                        {activeIndex === index && (
                          <>
                            <motion.div
                              initial={{ x: -400 }}
                              animate={{ x: 800 }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            />
                            <motion.div
                              initial={{ x: -400 }}
                              animate={{ x: 800 }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-soft-gold/30 to-transparent"
                            />
                          </>
                        )}
                        
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {activeIndex === index ? (
                            <>
                              <span>Book Now</span>
                              <span className="text-2xl font-bold">${item.price}</span>
                            </>
                          ) : (
                            <>
                              <span>Discover</span>
                              <motion.span
                                animate={{ rotate: activeIndex === index ? 360 : 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                ✨
                              </motion.span>
                            </>
                          )}
                        </span>
                      </motion.button>
                      
                      {/* Floating Decorative Elements */}
                      {activeIndex === index && (
                        <>
                          <motion.div
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full shadow-lg"
                          />
                          <motion.div
                            initial={{ scale: 0, rotate: 180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-soft-gold rounded-full shadow-lg"
                          />
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.6 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute top-1/2 -left-1 w-2 h-2 bg-soft-gold rounded-full"
                          />
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.4 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="absolute top-1/3 -right-1 w-1 h-1 bg-yellow-400 rounded-full"
                          />
                        </>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop View - Conditional Style */}
        <div className="hidden md:block">
          {desktopStyle === 'original' ? (
            // Original Horizontal Gallery
            <div className="flex h-96 md:h-[500px] overflow-hidden rounded-2xl">
              {bookImages.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{
                    flex: hoveredIndex === null 
                      ? '1 1 0%' 
                      : hoveredIndex === index 
                        ? '3 1 0%' 
                        : '1 1 0%',
                    transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.url})` }}
                  />
                  
                  {/* Overlay Content - Only visible on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-white">
                      <motion.h3
                        className="font-elegant text-2xl md:text-3xl font-bold mb-2"
                        animate={{
                          y: hoveredIndex === index ? 0 : 20,
                          opacity: hoveredIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      <motion.p
                        className="text-sm md:text-base mb-4 max-w-sm"
                        animate={{
                          y: hoveredIndex === index ? 0 : 20,
                          opacity: hoveredIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                      >
                        {item.description}
                      </motion.p>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          y: hoveredIndex === index ? 0 : 20,
                          opacity: hoveredIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
                        className="bg-soft-gold text-matte-black px-6 py-2 rounded-full font-medium hover:bg-yellow-400 transition-colors"
                      >
                        Book Now - ${item.price}
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Premium Vertical Cards (Desktop Version)
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {bookImages.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 50, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: index * 0.3, ease: "easeOut" }}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  style={{ perspective: "1000px" }}
                >
                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-soft-gold via-yellow-400 to-soft-gold rounded-3xl opacity-0 blur-sm"
                    animate={{
                      opacity: activeIndex === index ? 0.6 : 0,
                      scale: activeIndex === index ? 1.05 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Main Card Container */}
                  <motion.div
                    className="relative bg-gradient-to-br from-warm-cream via-amber-50 to-warm-cream rounded-3xl overflow-hidden shadow-2xl border border-soft-gold/20"
                    animate={{
                      scale: activeIndex === index ? 1.03 : 1,
                      rotateY: activeIndex === index ? 2 : 0
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.url})` }}
                        animate={{
                          scale: activeIndex === index ? 1.15 : 1.05,
                          filter: activeIndex === index ? "brightness(1.1)" : "brightness(0.9)"
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-transparent to-matte-black/50" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-soft-gold/20 via-transparent to-yellow-400/20"
                          animate={{
                            opacity: activeIndex === index ? 0.8 : 0.3
                          }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      
                      {/* Price Badge */}
                      <motion.div
                        animate={{
                          y: activeIndex === index ? [-5, 0, -5] : 0,
                          scale: activeIndex === index ? 1.1 : 1
                        }}
                        transition={{ 
                          duration: activeIndex === index ? 3 : 0.3,
                          repeat: activeIndex === index ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                        className="absolute top-4 right-4"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-soft-gold rounded-full blur-lg opacity-50" />
                          <div className="relative bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-4 py-2 rounded-full font-bold shadow-xl border-2 border-white/30 backdrop-blur-sm">
                            <span className="text-sm">${item.price}</span>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Shimmer Effect */}
                      {activeIndex === index && (
                        <motion.div
                          initial={{ x: -200, rotate: 45 }}
                          animate={{ x: 400, rotate: 45 }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        />
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 relative">
                      {/* Gold Divider */}
                      <motion.div
                        className="absolute top-0 left-4 right-4 h-0.5"
                        animate={{
                          background: activeIndex === index 
                            ? "linear-gradient(90deg, transparent, #D4AF37, #F4E4C1, #D4AF37, transparent)"
                            : "linear-gradient(90deg, transparent, #D4AF37, transparent)"
                        }}
                        transition={{ duration: 0.8 }}
                      />
                      
                      {/* Title */}
                      <motion.h3
                        className="font-elegant text-2xl font-bold mb-4 mt-2"
                        animate={{
                          color: activeIndex === index ? "#D4AF37" : "#1A1A1A",
                          textShadow: activeIndex === index 
                            ? "0 0 20px rgba(212, 175, 55, 0.3)"
                            : "none",
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      {/* Expandable Content */}
                      <motion.div
                        animate={{
                          height: activeIndex === index ? "auto" : "0",
                          opacity: activeIndex === index ? 1 : 0,
                          marginBottom: activeIndex === index ? "16px" : "0"
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3">
                          <p className="text-charcoal leading-relaxed text-base">
                            {item.description}
                          </p>
                          
                          {/* Feature Badges */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {['✨ Luxury', '🌿 Professional'].map((feature, i) => (
                              <motion.span
                                key={feature}
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-gradient-to-r from-soft-gold/20 to-yellow-400/20 text-soft-gold px-3 py-1 rounded-full text-xs font-semibold border border-soft-gold/30 backdrop-blur-sm"
                              >
                                {feature}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Button */}
                      <motion.button
                        className="w-full py-3 rounded-xl font-bold text-lg transition-all duration-400 relative overflow-hidden"
                        animate={{
                          background: activeIndex === index
                            ? "linear-gradient(135deg, #D4AF37, #F4E4C1, #D4AF37)"
                            : "linear-gradient(135deg, #1A1A1A, #36454F, #1A1A1A)",
                          color: activeIndex === index ? "#1A1A1A" : "#F5E6D3",
                        }}
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeIndex === index && (
                          <motion.div
                            initial={{ x: -200 }}
                            animate={{ x: 400 }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          />
                        )}
                        
                        <span className="relative z-10">
                          {activeIndex === index ? `Book Now - $${item.price}` : "Discover"}
                        </span>
                      </motion.button>
                      
                      {/* Decorative Elements */}
                      {activeIndex === index && (
                        <>
                          <motion.div
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full"
                          />
                          <motion.div
                            initial={{ scale: 0, rotate: 180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-soft-gold rounded-full"
                          />
                        </>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-charcoal text-lg">
            All sessions include consultation, customized treatment, and aftercare advice
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {['60 min', '90 min', '120 min'].map((duration) => (
              <motion.div
                key={duration}
                whileHover={{ scale: 1.05 }}
                className="bg-matte-black/10 px-4 py-2 rounded-full text-charcoal font-medium"
              >
                {duration}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
