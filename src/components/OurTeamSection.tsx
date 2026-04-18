'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import GlassPanel from './ui/GlassPanel';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  specialties: string[];
  experience: string;
  order: number;
}

export default function OurTeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/team');
      if (!response.ok) throw new Error('API not available');
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.log('Backend unavailable, using fallback team data');
      // Gracefully fallback to hardcoded data
    } finally {
      setLoading(false);
    }
  };

  // Fallback data if API fails
  const fallbackTeam = [
    {
      name: 'Sarah Mitchell',
      role: 'Lead Massage Therapist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'With over 10 years of experience in therapeutic massage, Sarah specializes in deep tissue and Swedish massage techniques.',
      specialties: ['Deep Tissue', 'Swedish', 'Prenatal', 'Sports Therapy'],
      experience: '10+ years'
    },
    {
      name: 'James Chen',
      role: 'Senior Wellness Specialist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'James brings a unique blend of Eastern and Western massage techniques to his practice.',
      specialties: ['Acupressure', 'Reflexology', 'Hot Stone', 'Chinese Medicine'],
      experience: '8+ years'
    },
    {
      name: 'Emma Williams',
      role: 'Relaxation Expert',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Emma is renowned for her gentle yet effective approach to relaxation massage.',
      specialties: ['Aromatherapy', 'Lymphatic Drainage', 'Craniosacral', 'Wellness Coaching'],
      experience: '6+ years'
    }
  ];

  const displayTeam = teamMembers.length > 0 ? teamMembers : fallbackTeam;

  return (
    <section id="team" ref={ref} className="relative py-20 overflow-hidden ">
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 bg-warm-cream"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-warm-cream/90 to-warm-cream/95" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: textY }}
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
            Our Expert
            <span className="text-soft-gold"> Team</span>
          </h2>
          
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Meet our certified massage therapists dedicated to providing you with the ultimate wellness experience
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="space-y-8 md:space-y-20">
          {displayTeam.map((member: any, index: number) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              {/* Card Container */}
              <motion.div
                className={`relative ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/30 hover:bg-white/40 hover:shadow-3xl transition-all duration-500`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
              >
                {/* Glass reflection effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Background decoration */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-soft-gold/15 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Photo Side */}
                <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full mx-auto rounded-full overflow-hidden border-4 border-white/50 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: "linear"
                      }}
                      style={{ transform: 'skewX(-20deg)' }}
                    />
                  </motion.div>
                  
                  {/* Role Badge */}
                  <motion.div
                    initial={{ scale: 0, y: 20 }}
                    whileInView={{ scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3 + index * 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-2 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm"
                  >
                    {member.role}
                  </motion.div>
                </div>
                
                {/* Text Side */}
                <div className="relative z-10 flex-1 text-left px-2 sm:px-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className="font-elegant text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-matte-black mb-2 group-hover:text-soft-gold transition-colors duration-300"
                  >
                    {member.name}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                    className="text-charcoal leading-relaxed mb-3 text-xs sm:text-sm md:text-base lg:text-lg"
                  >
                    {member.description}
                  </motion.p>
                  
                  {/* Specialties - Desktop Only */}
                  <div className="hidden md:block mb-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                      className="flex flex-wrap gap-2"
                    >
                      {member.specialties.map((specialty: string, i: number) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-soft-gold/20 text-matte-black text-xs rounded-full border border-soft-gold/30 backdrop-blur-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                  
                  {/* Experience - Desktop Only */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                    className="hidden md:flex items-center gap-2 mb-4"
                  >
                    <div className="w-2 h-2 bg-soft-gold rounded-full" />
                    <span className="text-sm text-charcoal font-medium">{member.experience} experience</span>
                  </motion.div>
                  
                  {/* Decorative line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '40px' }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="h-0.5 bg-gradient-to-r from-soft-gold to-yellow-400 mb-3"
                  />
                  
           
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
