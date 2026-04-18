'use client';

import { motion } from 'framer-motion';
import GlassPanel from './ui/GlassPanel';
import { useState, useEffect } from 'react';

interface LocationData {
  backgroundImage: string;
  address: {
    line1: string;
    line2: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  hours: string;
  mapEmbedUrl: string;
}

export default function LocationSection() {
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        console.log('Fetching location data...');
        const response = await fetch('https://dmtart.pro/healthy/api/location');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Location data fetched:', data);
        setLocationData(data);
      } catch (error) {
        console.error('Error fetching location data:', error);
        // Keep using fallback data on error
      }
    };

    fetchLocationData();
  }, []);

  // Always use fallback data, override with API data if available
  const data = {
    backgroundImage: locationData?.backgroundImage || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    address: {
      line1: locationData?.address?.line1 || 'United Kingdom',
      line2: locationData?.address?.line2 || 'London area'
    },
    contact: {
      phone: locationData?.contact?.phone || '00447843018518',
      email: locationData?.contact?.email || 'Healingtouch64@outlook.com'
    },
    hours: locationData?.hours || 'Monday - Sunday: 9:00 AM - 2:00 AM',
    mapEmbedUrl: locationData?.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.432384928423!2d-0.122920684423873!3d51.51121371806905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ca7d2d3b7b%3A0x4f3b5b5b5b5b5b5b!2sCovent%20Garden%2C%20London%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890'
  };
  return (
    <section id="location" className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)'
        }}
      >
        <div className="absolute inset-0 bg-warm-cream/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Find Us in
            <span className="text-soft-gold"> London</span>
          </h2>
          
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Located in the heart of London, our tranquil wellness center awaits your visit
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <GlassPanel blur="md" opacity={0.15} className="p-8">
              <h3 className="font-elegant text-3xl font-semibold text-matte-black mb-4">
                Our Location
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-soft-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-matte-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-matte-black mb-1">Address</h4>
                    <p className="text-charcoal">
                      {data.address.line1}<br />
                      {data.address.line2}<br />
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100px' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-0.5 bg-soft-gold"
                />

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-soft-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-matte-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-matte-black mb-1">Contact</h4>
                    <p className="text-charcoal">
                      {data.contact.phone}<br />
                      {data.contact.email}
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100px' }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-0.5 bg-soft-gold"
                />

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-soft-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-matte-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-matte-black mb-1">Hours</h4>
                    <p className="text-charcoal">
                      {data.hours}<br />
                    </p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          {/* Right Side - Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-96 lg:h-full min-h-[400px]"
          >
            <GlassPanel blur="md" opacity={0.15} className="h-full overflow-hidden">
              <iframe
                src={data.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
