'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useBackgroundVisibility } from '@/contexts/BackgroundVisibilityContext';

export default function AboutPage() {
  const { setBackgroundVisible } = useBackgroundVisibility();
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const scale = useSpring(useTransform(scrollY, [0, 1000], [1, 1.2]));

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    location: '',
    massageType: '',
    duration: '',
    preferredTherapist: '',
    hadMassageBefore: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  React.useEffect(() => {
    setBackgroundVisible(false);
    return () => setBackgroundVisible(true);
  }, [setBackgroundVisible]);

  return (
    <div className="min-h-screen bg-warm-cream relative overflow-hidden">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #D4AF37 2px, transparent 2px),
                               linear-gradient(to bottom, #D4AF37 2px, transparent 2px)`,
              backgroundSize: '40px 40px',
              scale: scale
            }}
          />
        </div>

        {/* Gold floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { left: '10%', top: '20%', delay: 0 },
            { left: '25%', top: '35%', delay: 0.5 },
            { left: '40%', top: '15%', delay: 1 },
            { left: '60%', top: '40%', delay: 1.5 },
            { left: '75%', top: '25%', delay: 2 },
            { left: '85%', top: '50%', delay: 2.5 },
            { left: '15%', top: '60%', delay: 0.3 },
            { left: '30%', top: '70%', delay: 0.8 },
            { left: '50%', top: '55%', delay: 1.3 },
            { left: '70%', top: '65%', delay: 1.8 },
            { left: '90%', top: '30%', delay: 2.3 },
            { left: '5%', top: '45%', delay: 2.8 },
          ].map((particle, index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 bg-soft-gold rounded-full shadow-xl shadow-soft-gold/70"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 3 + index * 0.2,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Static Geometric Shapes with Gold */}
        <div
          className="absolute top-20 left-20 w-32 h-32 border-4 border-soft-gold rotate-45 hidden md:block shadow-2xl shadow-soft-gold/60 bg-soft-gold/10"
        />
        <div
          className="absolute bottom-20 right-20 w-48 h-48 border-4 border-soft-gold rounded-full hidden md:block shadow-2xl shadow-soft-gold/70 bg-soft-gold/5"
        />
        <div
          className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-soft-gold to-soft-gold/60 rounded-lg hidden md:block shadow-2xl shadow-soft-gold/80"
        />
        <div
          className="absolute top-1/3 right-1/4 w-12 h-12 bg-soft-gold rounded-full hidden md:block shadow-xl shadow-soft-gold/60"
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-20 h-20 border-4 border-soft-gold rotate-12 hidden md:block shadow-2xl shadow-soft-gold/50 bg-soft-gold/10"
        />

        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center z-10 px-4"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-elegant text-matte-black mb-6">
              About
              <span className="block text-soft-gold">The Healing Hour</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-soft-gold to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed"
          >
            Where <span className="font-semibold text-soft-gold">relaxation</span>,{' '}
            <span className="font-semibold text-soft-gold">professionalism</span>, and{' '}
            <span className="font-semibold text-soft-gold">care</span> unite in perfect harmony
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12"
          >
            <motion.a
              href="#content"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block p-4 bg-soft-gold/20 rounded-full border border-soft-gold/40"
            >
              <motion.svg
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-6 text-matte-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content Section */}
      <div id="content" className="relative z-10 px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Mission Statement */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-elegant text-matte-black mb-4"
              >
                Our Mission
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-0.5 bg-soft-gold mx-auto"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-soft-gold/15 to-soft-gold/10 rounded-3xl blur-xl" />
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-12 md:p-20 shadow-2xl border-2 border-soft-gold/25">
                <p className="text-2xl md:text-3xl text-center text-charcoal/90 leading-relaxed font-light">
                  We bring <span className="font-bold text-soft-gold">healing</span> directly to you, 
                  transforming your space into a sanctuary of <span className="font-bold text-soft-gold">relaxation</span> 
                  and <span className="font-bold text-soft-gold">renewal</span>.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* Core Values Grid */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-elegant text-matte-black mb-4"
              >
                What Makes Us Different
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-0.5 bg-soft-gold mx-auto"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  label: "MOBILE",
                  title: "Mobile Service",
                  desc: "We bring the spa experience to your doorstep",
                  color: "from-soft-gold/20 to-soft-gold/10"
                },
                {
                  label: "EXPERT",
                  title: "Expert Care",
                  desc: "Certified therapists with years of experience",
                  color: "from-soft-gold/20 to-soft-gold/10"
                },
                {
                  label: "NATURAL",
                  title: "Natural Approach",
                  desc: "Holistic techniques for total wellness",
                  color: "from-soft-gold/20 to-soft-gold/10"
                },
                {
                  label: "PREMIUM",
                  title: "Premium Quality",
                  desc: "Five-star service in every session",
                  color: "from-soft-gold/20 to-soft-gold/10"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group"
                >
                  <div className={`relative bg-gradient-to-br from-white to-warm-cream/50 rounded-2xl p-8 h-full border border-soft-gold/20 shadow-md shadow-soft-gold/10`}>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                      className="mb-6"
                    >
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-soft-gold/20 to-soft-gold/10 rounded-full border border-soft-gold/30 shadow-sm">
                          {index === 0 && (
                            <svg className="w-8 h-8 text-soft-gold" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                          )}
                          {index === 1 && (
                            <svg className="w-8 h-8 text-soft-gold" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          )}
                          {index === 2 && (
                            <svg className="w-8 h-8 text-soft-gold" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          )}
                          {index === 3 && (
                            <svg className="w-8 h-8 text-soft-gold" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-matte-black mb-3 text-center">{item.title}</h3>
                    <p className="text-charcoal/80 text-center leading-relaxed">{item.desc}</p>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-soft-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Detailed Story */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 md:p-20 shadow-2xl border-2 border-soft-gold/25 relative overflow-hidden">
              {/* Enhanced Gold Background Pattern */}
              <div className="absolute inset-0 opacity-8">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #D4AF37, #D4AF37 1px, transparent 1px, transparent 20px),
                                   repeating-linear-gradient(-45deg, #D4AF37, #D4AF37 1px, transparent 1px, transparent 20px)`
                }} />
              </div>
              
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-soft-gold/20 shadow-sm shadow-soft-gold/10" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-soft-gold/20 shadow-sm shadow-soft-gold/10" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-soft-gold/20 shadow-sm shadow-soft-gold/10" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-soft-gold/20 shadow-sm shadow-soft-gold/10" />

              <div className="relative z-10 space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl md:text-4xl font-elegant text-matte-black">Our Story</h3>
                  <p className="text-xl text-charcoal/80 leading-relaxed">
                    In today's fast-paced world, finding time for self-care has become a luxury. 
                    The Healing Hour was born from a simple realization: healing shouldn't be another 
                    stressor in your life.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl md:text-4xl font-elegant text-matte-black">Our Promise</h3>
                  <p className="text-xl text-charcoal/80 leading-relaxed">
                    We deliver exceptional massage therapy directly to you. Our expert therapists 
                    bring everything needed for a transformative experience — from premium oils 
                    to sanitized equipment, creating your personal sanctuary wherever you are.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl md:text-4xl font-elegant text-matte-black">Our Difference</h3>
                  <p className="text-xl text-charcoal/80 leading-relaxed">
                    Every session is tailored to your unique needs. Whether you seek relief from 
                    chronic pain, stress reduction, or pure relaxation, we customize our approach 
                    to ensure you receive exactly what your body and mind need.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <div className="relative inline-block">
              {/* Static gold ring */}
              <div className="absolute inset-0 rounded-full border-8 border-soft-gold/15 border-t-soft-gold/30 border-r-soft-gold/30 shadow-lg shadow-soft-gold/20" />
              
              {/* Gold glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-soft-gold/8 to-soft-gold/5 blur-xl" />
              
              {/* Main content */}
              <div className="relative bg-gradient-to-br from-warm-cream via-white to-warm-cream rounded-full p-16 shadow-2xl border-2 border-soft-gold/30">
                {/* Gold corner decorations */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-soft-gold/30 rotate-45" />
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-soft-gold/30 rotate-45" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-soft-gold/30 rotate-45" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-soft-gold/30 rotate-45" />
                
                <h3 className="text-4xl md:text-5xl font-elegant text-matte-black mb-6 relative z-10">
                  Your Healing Journey
                  <span className="block text-soft-gold text-3xl md:text-4xl mt-2">Begins Now</span>
                </h3>
                <p className="text-xl text-charcoal/80 mb-10 max-w-2xl mx-auto relative z-10">
                  Experience the perfect blend of convenience and luxury
                </p>
                
                {/* Static gold button */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-soft-gold/40 to-soft-gold/30 rounded-full blur-lg" />
                  <motion.a
                    href="#get-in-touch"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative block px-16 py-8 bg-matte-black text-warm-cream font-bold text-xl rounded-full border-2 border-soft-gold/40 hover:border-soft-gold/60 transition-all duration-300 shadow-xl"
                  >
                    <span className="flex items-center">
                      Get In Touch
                      <motion.svg
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-6 ml-3 text-soft-gold"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Get In Touch Form */}
          <motion.section
            id="get-in-touch"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              {/* Static gold decorative header */}
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-soft-gold/8 blur-xl rounded-full" />
                <div className="relative bg-gradient-to-r from-soft-gold/15 to-soft-gold/5 rounded-full px-12 py-6 border border-soft-gold/30">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-elegant text-matte-black"
                  >
                    Get In Touch
                  </motion.h2>
                </div>
              </div>
              
              {/* Static gold underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-2 bg-gradient-to-r from-soft-gold/60 via-soft-gold/40 to-soft-gold/60 mx-auto rounded-full shadow-md shadow-soft-gold/20"
              />
              
              {/* Static gold side accents */}
              <div className="flex justify-center items-center gap-8 mt-6">
                <div className="w-12 h-12 border-2 border-soft-gold/25 rounded-full" />
                <div className="w-8 h-8 bg-soft-gold/20 rounded-full" />
                <div className="w-12 h-12 border-2 border-soft-gold/25 rounded-full" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-soft-gold/25 relative overflow-hidden">
                {/* Gold corner decorations for form */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-soft-gold/20 shadow-sm shadow-soft-gold/10" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-soft-gold/20 shadow-sm shadow-soft-gold/10" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-soft-gold/20 shadow-sm shadow-soft-gold/10" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-soft-gold/20 shadow-sm shadow-soft-gold/10" />
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-matte-black mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-soft-gold/20 rounded-lg focus:ring-2 focus:ring-soft-gold/30 focus:border-soft-gold/30 bg-white/80 shadow-sm shadow-soft-gold/10"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-matte-black mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-soft-gold/20 rounded-lg focus:ring-2 focus:ring-soft-gold/30 focus:border-soft-gold/30 bg-white/80 shadow-sm shadow-soft-gold/10"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-matte-black mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-soft-gold/20 rounded-lg focus:ring-2 focus:ring-soft-gold/30 focus:border-soft-gold/30 bg-white/80 shadow-sm shadow-soft-gold/10"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-matte-black mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-soft-gold/20 rounded-lg focus:ring-2 focus:ring-soft-gold/30 focus:border-soft-gold/30 bg-white/80 shadow-sm shadow-soft-gold/10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-matte-black mb-2">
                        Preferred Time
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-soft-gold/20 rounded-lg focus:ring-2 focus:ring-soft-gold/30 focus:border-soft-gold/30 bg-white/80 shadow-sm shadow-soft-gold/10"
                        required
                      >
                        <option value="">Select a time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                        <option value="11:00 PM">11:00 PM</option>
                        <option value="12:00 AM">12:00 AM</option>
                        <option value="1:00 AM">1:00 AM</option>
                        <option value="2:00 AM">2:00 AM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-matte-black mb-2">
                        Location of Service
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-soft-gold/20 rounded-lg focus:ring-2 focus:ring-soft-gold/30 focus:border-soft-gold/30 bg-white/80 shadow-sm shadow-soft-gold/10"
                        placeholder="Your address or location"
                        required
                      />
                    </div>
                  </div>

                  {/* Massage Type */}
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-3">
                      ✨ Massage Type
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Swedish Massage',
                        'Deep Tissue',
                        'Therapeutic full body massage',
                        'Aromatherapy',
                        'Couples massage',
                        'Reflexology',
                        'Other'
                      ].map((type) => (
                        <label key={type} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="massageType"
                            value={type}
                            checked={formData.massageType === type}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-soft-gold focus:ring-soft-gold"
                            required
                          />
                          <span className="text-charcoal/80">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-3">
                      Duration
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {['60 minutes', '90 minutes', '120 minutes'].map((duration) => (
                        <label key={duration} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="duration"
                            value={duration}
                            checked={formData.duration === duration}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-soft-gold focus:ring-soft-gold"
                            required
                          />
                          <span className="text-charcoal/80">{duration}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Therapist */}
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-2">
                      Preferred Therapist
                    </label>
                    <input
                      type="text"
                      name="preferredTherapist"
                      value={formData.preferredTherapist}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-soft-gold/30 rounded-lg focus:ring-2 focus:ring-soft-gold focus:border-soft-gold/50 bg-white/80 shadow-sm shadow-soft-gold/10"
                      placeholder="If you have a preference, let us know"
                    />
                  </div>

                  {/* Had Massage Before */}
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-3">
                      Have You Had a Massage Before?
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="hadMassageBefore"
                          value="Yes"
                          checked={formData.hadMassageBefore === 'Yes'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-soft-gold focus:ring-soft-gold"
                          required
                        />
                        <span className="text-charcoal/80">Yes</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="hadMassageBefore"
                          value="No"
                          checked={formData.hadMassageBefore === 'No'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-soft-gold focus:ring-soft-gold"
                          required
                        />
                        <span className="text-charcoal/80">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Message Box */}
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-3">
                      ✨ Message Box
                    </label>
                    <div className="space-y-4">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-soft-gold/20 rounded-lg focus:ring-2 focus:ring-soft-gold/30 focus:border-soft-gold/30 bg-white/80 shadow-sm shadow-soft-gold/10"
                        placeholder="Anything you'd like us to know before your session? How can we make your experience special?"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div className="text-center pt-6">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-4 bg-gradient-to-r from-soft-gold to-soft-gold/80 text-matte-black font-semibold rounded-full hover:from-soft-gold/90 hover:to-soft-gold/70 transition-all duration-300 transform shadow-2xl text-lg"
                    >
                      Send Your Inquiry
                    </motion.button>
                  </motion.div>
                </form>

                {/* Confidentiality Note */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-charcoal/50 italic">
                    All inquiries are handled with the utmost discretion and confidentiality.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
