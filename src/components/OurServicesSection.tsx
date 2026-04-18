'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Service {
  _id: string;
  name: string;
  image: string;
  description: string;
  order: number;
}

export default function OurServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/services');
      if (!response.ok) throw new Error('API not available');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.log('Backend unavailable, using fallback services data');
      // Gracefully fallback to hardcoded data
      setServices([
        {
          _id: '1',
          name: 'Swedish Massage',
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Relaxing full-body massage using long, smooth strokes to improve circulation and reduce stress.',
          order: 0
        },
        {
          _id: '2',
          name: 'Deep Tissue',
          image: 'https://images.unsplash.com/photo-1662467191034-9cc663f1de92?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Therapeutic massage targeting deeper muscle layers to release chronic tension and alleviate pain.',
          order: 1
        },
        {
          _id: '3',
          name: 'Couples massage',
          image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Romantic side-by-side massage experience for two people to enjoy relaxation together in a serene setting.',
          order: 2
        },
        {
          _id: '4',
          name: 'Aromatherapy',
          image: 'https://images.unsplash.com/photo-1598556146869-aeb261893c35?q=80&w=1197&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Essential oil massage combining therapeutic touch with aromatic benefits for mind and body.',
          order: 3
        },
        {
          _id: '5',
          name: 'Sports Massage',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Specialized techniques for athletes to prevent injury and enhance performance and recovery.',
          order: 4
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-warm-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-matte-black mb-4">
            Our
            <span className="text-soft-gold"> Services</span>
          </h2>
          
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Discover our range of therapeutic massage treatments designed to restore balance and wellbeing
          </p>
        </motion.div>

        {/* Services Flip Cards Container */}
        <div className="overflow-x-auto pb-4 md:overflow-visible max-w-full">
          <div className="flex gap-6 md:grid md:grid-cols-5 md:gap-8 min-w-max md:min-w-0">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flip-card"
                style={{
                  backgroundColor: 'transparent',
                  width: '190px',
                  height: '254px',
                  perspective: '1000px',
                  fontFamily: 'Inter, sans-serif',
                  flexShrink: 0
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className="flip-card-inner"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.8s',
                    transformStyle: 'preserve-3d',
                    transform: hoveredCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of Card */}
                  <div 
                    className="flip-card-front"
                    style={{
                      boxShadow: '0 8px 14px 0 rgba(0,0,0,0.2)',
                      position: 'absolute',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                      border: '2px solid #D4AF37',
                      borderRadius: '1rem',
                      padding: '1rem',
                      background: 'linear-gradient(120deg, #F5E6D3 60%, #FAF1E6 88%, #F8E8D8 40%, rgba(212, 175, 55, 0.603) 48%)',
                      color: '#1A1A1A'
                    }}
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-soft-gold">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 style={{ fontSize: '1.5em', fontWeight: '900', textAlign: 'center', margin: '0' }} className="text-matte-black">
                      {service.name}
                    </h3>
                    <p className="text-charcoal text-sm mt-2">Hover to learn more</p>
                  </div>
                  
                  {/* Back of Card */}
                  <div 
                    className="flip-card-back"
                    style={{
                      boxShadow: '0 8px 14px 0 rgba(0,0,0,0.2)',
                      position: 'absolute',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                      border: '2px solid #D4AF37',
                      borderRadius: '1rem',
                      padding: '1rem',
                      background: 'linear-gradient(120deg, #FFAE91 30%, #D4AF37 88%, #F5E6D3 40%, #FFB9A0 78%)',
                      color: 'white',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <h3 style={{ fontSize: '1.5em', fontWeight: '900', textAlign: 'center', margin: '0', marginBottom: '0.75rem' }}>
                      {service.name}
                    </h3>
                    <p className="text-white/90 text-sm px-4 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Mobile scroll indicators */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(212, 175, 55, 0.1);
          border-radius: 3px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 3px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #B8941F;
        }
      `}</style>
    </section>
  );
}
