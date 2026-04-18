'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-20 bg-gradient-to-br from-warm-cream via-amber-50 to-yellow-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-soft-gold rounded-full filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-soft-gold to-yellow-400 mx-auto mb-8"
          />
          
          <h2 className="font-elegant text-5xl md:text-6xl font-bold text-matte-black mb-6 leading-tight">
            Why
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-gold to-yellow-400"> Choose Us</span>
          </h2>
          
          <p className="text-xl text-charcoal max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our premium massage therapy services
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Professional Massage Therapy"
                width={1800}
                height={1200}
                className="w-full h-auto object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/20 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute top-6 right-6 bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-6 py-3 rounded-full font-bold shadow-xl"
              >
                Expert Therapists
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full opacity-20 blur-xl"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full opacity-20 blur-xl"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 order-2 lg:order-2"
          >
            {/* Main Description */}
            <div>
              <h3 className="font-elegant text-3xl font-bold text-matte-black mb-4">
                Your Wellness Journey Begins Here
              </h3>
              <p className="text-lg text-charcoal leading-relaxed mb-6">
                At our massage therapy center, we combine ancient healing techniques with modern wellness practices to provide you with an unparalleled relaxation experience. Our expert therapists are dedicated to helping you achieve optimal physical and mental well-being.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-matte-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-matte-black text-lg mb-2">Certified Professionals</h4>
                  <p className="text-charcoal">All our therapists are fully certified and continuously trained in the latest massage techniques.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-matte-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-matte-black text-lg mb-2">Flexible Scheduling</h4>
                  <p className="text-charcoal">Book appointments at your convenience with our extended hours from 9 AM to 2 AM.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-matte-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-matte-black text-lg mb-2">Personalized Care</h4>
                  <p className="text-charcoal">Each session is tailored to your specific needs and preferences for maximum benefit.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-soft-gold to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-matte-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-matte-black text-lg mb-2">Mobile Service</h4>
                  <p className="text-charcoal">Enjoy professional massage therapy in the comfort of your own home or hotel.</p>
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-soft-gold/10 to-yellow-400/10 rounded-2xl p-8 border border-soft-gold/30"
            >
              <h4 className="font-elegant text-2xl font-bold text-matte-black mb-4">
                Ready to Transform Your Well-being?
              </h4>
              <p className="text-charcoal mb-6">
                Join hundreds of satisfied clients who have discovered the healing power of professional massage therapy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#book"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  Book Your Session
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border-2 border-soft-gold text-matte-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-soft-gold hover:text-matte-black transition-all duration-300 text-center"
                >
                  Learn More
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
