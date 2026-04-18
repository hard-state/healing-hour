'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './ui/Button';

export default function ContactSection() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your inquiry! We will contact you soon.');
        setFormData({
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
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error connecting to the server.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-warm-cream via-amber-50 to-yellow-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-soft-gold rounded-full filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-soft-gold to-yellow-400 mx-auto mb-8"
          />
          
          <h2 className="font-elegant text-5xl md:text-6xl font-bold text-matte-black mb-6 leading-tight">
            Get in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-gold to-yellow-400"> Touch</span>
          </h2>
          
          <p className="text-xl text-charcoal max-w-3xl mx-auto leading-relaxed">
            Ready to experience ultimate relaxation? We're here to help you begin your wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-soft-gold/20 hover:shadow-3xl transition-all duration-300">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full mb-4">
                  <svg className="w-8 h-8 text-matte-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-elegant text-3xl font-bold text-matte-black mb-2">
                  Book Your Massage
                </h3>
                <p className="text-charcoal">
                  Fill in the details below
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold/20 focus:border-soft-gold transition-all duration-300 placeholder-charcoal/50 text-matte-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold/20 focus:border-soft-gold transition-all duration-300 placeholder-charcoal/50 text-matte-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      required
                      className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold/20 focus:border-soft-gold transition-all duration-300 placeholder-charcoal/50 text-matte-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold/20 focus:border-soft-gold transition-all duration-300 placeholder-charcoal/50 text-matte-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-matte-black mb-1">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold/20 focus:border-soft-gold transition-all duration-300 placeholder-charcoal/50 text-matte-black"
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
                    <label className="block text-sm font-medium text-matte-black mb-1">
                      Location of Service
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Your address or location"
                      required
                      className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold/20 focus:border-soft-gold transition-all duration-300 placeholder-charcoal/50 text-matte-black"
                    />
                  </div>
                </div>

                {/* Massage Type */}
                <div>
                  <label className="block text-sm font-medium text-matte-black mb-2">
                    ✨ Massage Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      'Swedish Massage',
                      'Deep Tissue',
                      'Therapeutic full body massage',
                      'Aromatherapy',
                      'Couples massage',
                      'Reflexology',
                      'Other'
                    ].map((type) => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="massageType"
                          value={type}
                          checked={formData.massageType === type}
                          onChange={handleChange}
                          className="w-4 h-4 text-soft-gold focus:ring-soft-gold"
                          required
                        />
                        <span className="text-sm text-charcoal">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-matte-black mb-2">
                    Duration
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['60 minutes', '90 minutes', '120 minutes'].map((duration) => (
                      <label key={duration} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="duration"
                          value={duration}
                          checked={formData.duration === duration}
                          onChange={handleChange}
                          className="w-4 h-4 text-soft-gold focus:ring-soft-gold"
                          required
                        />
                        <span className="text-sm text-charcoal">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferred Therapist */}
                <div>
                  <label className="block text-sm font-medium text-matte-black mb-1">
                    Preferred Therapist
                  </label>
                  <input
                    type="text"
                    name="preferredTherapist"
                    value={formData.preferredTherapist}
                    onChange={handleChange}
                    placeholder="If you have a preference, let us know"
                    className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold/20 focus:border-soft-gold transition-all duration-300 placeholder-charcoal/50 text-matte-black"
                  />
                </div>

                {/* Had Massage Before */}
                <div>
                  <label className="block text-sm font-medium text-matte-black mb-2">
                    Have You Had a Massage Before?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hadMassageBefore"
                        value="Yes"
                        checked={formData.hadMassageBefore === 'Yes'}
                        onChange={handleChange}
                        className="w-4 h-4 text-soft-gold focus:ring-soft-gold"
                        required
                      />
                      <span className="text-sm text-charcoal">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hadMassageBefore"
                        value="No"
                        checked={formData.hadMassageBefore === 'No'}
                        onChange={handleChange}
                        className="w-4 h-4 text-soft-gold focus:ring-soft-gold"
                        required
                      />
                      <span className="text-sm text-charcoal">No</span>
                    </label>
                  </div>
                </div>

                {/* Message Box */}
                <div>
                  <label className="block text-sm font-medium text-matte-black mb-2">
                    ✨ Message Box
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Anything you'd like us to know before your session? How can we make your experience special?"
                    className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-soft-gold/20 focus:border-soft-gold transition-all duration-300 placeholder-charcoal/50 text-matte-black resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-soft-gold/50"
                >
                  Send Your Inquiry
                </motion.button>
              </form>

              {/* Confidentiality Note */}
              <div className="mt-6 text-center">
                <p className="text-xs text-charcoal/60 italic">
                  All inquiries are handled with the utmost discretion and confidentiality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Contact Info */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-soft-gold/20 hover:shadow-3xl transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full mb-4">
                  <svg className="w-8 h-8 text-matte-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-elegant text-3xl font-bold text-matte-black mb-2">
                  Quick Contact
                </h3>
                <p className="text-charcoal">
                  Multiple ways to reach us
                </p>
              </div>
              
              <div className="space-y-6">
                <motion.a
                  href="tel:00447843018518"
                  whileHover={{ x: 10, scale: 1.05 }}
                  className="flex items-center space-x-4 p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 hover:border-soft-gold hover:bg-gradient-to-r hover:from-soft-gold/10 hover:to-yellow-400/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-matte-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-matte-black text-lg">Phone</p>
                    <p className="text-charcoal font-medium">00447843018518</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.tiktok.com/@healing.touch64"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10, scale: 1.05 }}
                  className="flex items-center space-x-4 p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 hover:border-soft-gold hover:bg-gradient-to-r hover:from-soft-gold/10 hover:to-yellow-400/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-matte-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.89.01 5.77-.02 8.64-.08 1.36-.54 2.71-1.35 3.77-.8 1.06-1.96 1.79-3.22 2.11-1.27.33-2.64.29-3.88-.15-1.11-.39-2.11-1.08-2.84-1.96-.75-.89-1.23-1.99-1.39-3.13-.16-1.05-.14-2.13.08-3.16.22-1.03.67-2 1.33-2.8.66-.8 1.51-1.44 2.47-1.81.85-.33 1.77-.46 2.68-.41.01 1.32.02 2.64.01 3.96-.5-.15-1.05-.24-1.57-.12-.52.12-.99.45-1.25.92-.26-.47-.31 1.04-.18 1.56.13.52.45.98.91 1.25.46.27 1.02.33 1.54.2.52-.13.98-.45 1.25-.91.27-.46.33-1.02.2-1.54-.13-.52-.45-.98-.91-1.25-.46-.27-1.02-.33-1.54-.2.01-1.32.02-2.64.01-3.96.5.15 1.05.24 1.57.12.52-.12.99-.45 1.25-.92.26-.47.31-1.04.18-1.56z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-matte-black text-lg">TikTok</p>
                    <p className="text-charcoal font-medium">@healing.touch64</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/healingtouch642026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10, scale: 1.05 }}
                  className="flex items-center space-x-4 p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 hover:border-soft-gold hover:bg-gradient-to-r hover:from-soft-gold/10 hover:to-yellow-400/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-matte-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-matte-black text-lg">Instagram</p>
                    <p className="text-charcoal font-medium">@healingtouch642026</p>
                  </div>
                </motion.a>
              </div>
            </div>

          
            {/* Emergency Booking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-soft-gold to-yellow-400 rounded-3xl p-8 text-center shadow-xl"
            >
              <h3 className="font-elegant text-2xl font-bold text-matte-black mb-4">
                Need an urgent appointment?
              </h3>
              <p className="text-matte-black/80 mb-6">
                Call us directly for same-day bookings
              </p>
              <Button size="lg" href="tel:00447843018518" className="bg-matte-black text-white hover:bg-charcoal">
                Call Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
