'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import GlassPanel from './ui/GlassPanel';

const buttonStyles = `
  .button {
    --black-700: hsla(0 0% 12% / 1);
    --border_radius: 9999px;
    --transtion: 0.3s ease-in-out;
    --offset: 2px;

    cursor: pointer;
    position: relative;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    transform-origin: center;

    padding: 1rem 2rem;
    background-color: transparent;

    border: none;
    border-radius: var(--border_radius);
    transform: scale(calc(1 + (var(--active, 0) * 0.1)));

    transition: transform var(--transtion);
  }

  .button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
    height: 100%;
    background-color: var(--black-700);

    border-radius: var(--border_radius);
    box-shadow: inset 0 0.5px hsl(0, 0%, 100%), inset 0 -1px 2px 0 hsl(0, 0%, 0%),
      0px 4px 10px -4px hsla(0 0% 0% / calc(1 - var(--active, 0))),
      0 0 0 calc(var(--active, 0) * 0.375rem) hsl(45, 100%, 50% / 0.75);

    transition: all var(--transtion);
    z-index: 0;
  }

  .button::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
    height: 100%;
    background-color: hsla(45, 100%, 50%, 0.75);
    background-image: radial-gradient(
        at 51% 89%,
        hsla(45, 100%, 60%, 1) 0px,
        transparent 50%
      ),
      radial-gradient(at 100% 100%, hsla(45, 100%, 50%, 1) 0px, transparent 50%),
      radial-gradient(at 22% 91%, hsla(45, 100%, 50%, 1) 0px, transparent 50%);
    background-position: top;

    opacity: var(--active, 0);
    border-radius: var(--border_radius);
    transition: opacity var(--transtion);
    z-index: 2;
  }

  .button:is(:hover, :focus-visible) {
    --active: 1;
  }
  .button:active {
    transform: scale(1);
  }

  .button .dots_border {
    --size_border: calc(100% + 2px);

    overflow: hidden;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: var(--size_border);
    height: var(--size_border);
    background-color: transparent;

    border-radius: var(--border_radius);
    z-index: -10;
  }

  .button .dots_border::before {
    content: "";
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left;
    transform: rotate(0deg);

    width: 100%;
    height: 2rem;
    background-color: white;

    mask: linear-gradient(transparent 0%, white 120%);
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  .button .sparkle {
    position: relative;
    z-index: 10;

    width: 1.75rem;
  }

  .button .sparkle .path {
    fill: currentColor;
    stroke: currentColor;

    transform-origin: center;

    color: hsl(0, 0%, 100%);
  }

  .button:is(:hover, :focus) .sparkle .path {
    animation: path 1.5s linear 0.5s infinite;
  }

  .button .sparkle .path:nth-child(1) {
    --scale_path_1: 1.2;
  }
  .button .sparkle .path:nth-child(2) {
    --scale_path_2: 1.2;
  }
  .button .sparkle .path:nth-child(3) {
    --scale_path_3: 1.2;
  }

  @keyframes path {
    0%,
    34%,
    71%,
    100% {
      transform: scale(1);
    }
    17% {
      transform: scale(var(--scale_path_1, 1));
    }
    49% {
      transform: scale(var(--scale_path_2, 1));
    }
    83% {
      transform: scale(var(--scale_path_3, 1));
    }
  }

  .button .text_button {
    position: relative;
    z-index: 10;

    background-image: linear-gradient(
      90deg,
      hsla(0 0% 100% / 1) 0%,
      hsla(0 0% 100% / var(--active, 0)) 120%
    );
    background-clip: text;

    font-size: 1rem;
    color: transparent;
  }

  .slice {
    --c1: #202020;
    --c2: #FFD700;
    --size-letter: 16px;
    padding: 0.5em 1em;
    font-size: var(--size-letter);

    background-color: transparent;
    border: calc(var(--size-letter) / 6) solid var(--c2);
    border-radius: 9999px;
    cursor: pointer;

    overflow: hidden;
    position: relative;
    transition: 300ms cubic-bezier(0.83, 0, 0.17, 1);
  }

  .slice > .text {
    font-weight: 700;
    color: var(--c2);
    position: relative;
    z-index: 1;
    transition: color 700ms cubic-bezier(0.83, 0, 0.17, 1);
  }

  .slice::after {
    content: "";

    width: 0;
    height: calc(300% + 1em);

    position: absolute;
    translate: -50% -50%;
    inset: 50%;
    rotate: 30deg;

    background-color: var(--c2);
    transition: 1000ms cubic-bezier(0.83, 0, 0.17, 1);
  }

  .slice:hover > .text {
    color: var(--c1);
  }

  .slice:hover::after {
    width: calc(120% + 1em);
  }

  .slice:active {
    scale: 0.98;
    filter: brightness(0.9);
  }
`;

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [canAnimate, setCanAnimate] = useState(false);
  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/hero');
      if (!response.ok) throw new Error('API not available');
      const data = await response.json();
      setHeroData(data);
    } catch (error) {
      console.log('Backend unavailable, using fallback data');
      // Gracefully fallback to hardcoded data
    } finally {
      setLoading(false);
    }
  };

  const carouselImages = heroData?.carouselImages || [
    {
      url: 'https://images.unsplash.com/photo-1676803704427-496b1de33baa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Massage Therapy Session 1'
    },
    {
      url: 'https://images.unsplash.com/photo-1611073615830-9f76902c10fe?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Massage Therapy Session 2'
    },
    {
      url: 'https://images.unsplash.com/photo-1707355274813-633939fbc8e0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Massage Therapy Session 3'
    }
  ];

  const floatingPhotos = heroData?.floatingPhotos || [
    { url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '10%', y: '20%', size: 120, delay: 0 },
    { url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '85%', y: '35%', size: 90, delay: 1 },
    { url: 'https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '80%', y: '70%', size: 80, delay: 2 },
    { url: 'https://images.unsplash.com/photo-1611073615830-9f76902c10fe?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '15%', y: '75%', size: 100, delay: 1.5 },
    { url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '80%', y: '10%', size: 70, delay: 0.5 },
    { url: 'https://images.unsplash.com/photo-1675159364615-38e1f6b62282?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', x: '5%', y: '45%', size: 85, delay: 2.5 }
  ];

  useEffect(() => {
    // Check if loading is complete
    const checkLoadingComplete = () => {
      if (document.body.classList.contains('loading-complete')) {
        setCanAnimate(true);
      } else {
        // Listen for the loading-complete class
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'class' &&
                document.body.classList.contains('loading-complete')) {
              setCanAnimate(true);
              observer.disconnect();
            }
          });
        });
        
        observer.observe(document.body, { attributes: true });
        
        return () => observer.disconnect();
      }
    };

    checkLoadingComplete();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    
    // Inject button styles
    if (!document.getElementById('button-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'button-styles';
      styleElement.textContent = buttonStyles;
      document.head.appendChild(styleElement);
    }
    
    return () => {
      clearInterval(timer);
      // Clean up styles if needed
      const styleElement = document.getElementById('button-styles');
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section id="home" ref={containerRef} className="relative h-screen overflow-hidden ">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {carouselImages.map((image: any, index: number) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 1.1,
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <motion.img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              animate={{
                scale: index === currentIndex ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"
              animate={{
                opacity: index === currentIndex ? [0.7, 0.9, 0.7] : 0.5,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
        
        {/* Floating particles effect */}
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
            { left: '20%', top: '80%', delay: 0.2 },
            { left: '35%', top: '5%', delay: 0.7 },
            { left: '55%', top: '85%', delay: 1.2 },
            { left: '80%', top: '10%', delay: 1.7 },
            { left: '95%', top: '75%', delay: 2.2 },
            { left: '12%', top: '90%', delay: 2.7 },
            { left: '45%', top: '45%', delay: 0.4 },
            { left: '65%', top: '30%', delay: 0.9 },
          ].map((particle, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-soft-gold/30 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
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
        
        {/* Floating Photos */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingPhotos.map((photo: any, index: number) => (
            <motion.div
              key={index}
              className="absolute rounded-full overflow-hidden border-2 border-white/30 shadow-xl"
              style={{
                left: photo.x,
                top: photo.y,
                width: `${photo.size}px`,
                height: `${photo.size}px`,
                transform: `
                  perspective(1000px)
                  rotateY(${mousePosition.x * 15}deg)
                  rotateX(${-mousePosition.y * 15}deg)
                  translateZ(${20 + index * 5}px)
                `,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                delay: photo.delay,
                ease: "easeInOut"
              }}
            >
              <img
                src={photo.url}
                alt={`Floating massage ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={canAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: canAnimate ? 0.3 : 0 }}
          className="text-center px-4 max-w-4xl mx-auto"
        >
          <div className="glass-panel-hero p-6 md:p-12 relative overflow-hidden max-w-2xl md:max-w-4xl mx-auto">
            {/* Blur background layer with slide-in animation */}
            <motion.div 
              className="absolute inset-0"
              initial={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(0px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                clipPath: 'inset(0 100% 0 0)'
              }}
              animate={canAnimate ? {
                backdropFilter: 'blur(24px)',
                clipPath: 'inset(0 0% 0 0)'
              } : {
                backdropFilter: 'blur(0px)',
                clipPath: 'inset(0 100% 0 0)'
              }}
              transition={{ 
                duration: 0.8, 
                delay: canAnimate ? 0.5 : 0,
                ease: 'easeInOut'
              }}
              style={{
                WebkitBackdropFilter: canAnimate ? 'blur(24px)' : 'blur(0px)',
                transition: canAnimate ? 'backdrop-filter 0.8s ease-in-out 0.5s, -webkit-backdrop-filter 0.8s ease-in-out 0.5s, clip-path 0.8s ease-in-out 0.5s' : 'none'
              }}
            />
            
            {/* Content on top */}
            <div className="relative z-10">
            {/* Background decoration */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-soft-gold/5 to-transparent"
              animate={canAnimate ? {
                opacity: [0.3, 0.6, 0.3],
              } : { opacity: 0.3 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Corner decorations */}
            <motion.div
              className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-soft-gold/50"
              animate={canAnimate ? {
                scale: [1, 1.2, 1],
              } : { scale: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-soft-gold/50"
              animate={canAnimate ? {
                scale: [1, 1.2, 1],
              } : { scale: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-soft-gold/50"
              animate={canAnimate ? {
                scale: [1, 1.2, 1],
              } : { scale: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-soft-gold/50"
              animate={canAnimate ? {
                scale: [1, 1.2, 1],
              } : { scale: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />

                        
            <div className="relative z-10">
              <motion.div
                initial={{ width: 0 }}
                animate={canAnimate ? { width: '100px' } : { width: 0 }}
                transition={{ duration: 1, delay: canAnimate ? 0.6 : 0 }}
                className="h-1 bg-soft-gold mx-auto mb-8"
              />
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={canAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: canAnimate ? 0.8 : 0 }}
                className="font-elegant text-3xl md:text-5xl lg:text-7xl font-bold text-warm-cream mb-6 leading-tight"
              >
                {heroData?.mainHeading || 'Premium Massage'}
                <br />
                <span className="text-soft-gold">{heroData?.subHeading || 'Therapy'}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={canAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: canAnimate ? 1 : 0 }}
                className="text-lg md:text-xl lg:text-2xl text-warm-cream/90 mb-8 max-w-xl md:max-w-2xl mx-auto leading-relaxed"
              >
                {heroData?.description || 'Experience ultimate relaxation and rejuvenation with our expert massage therapists in the heart of London'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={canAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: canAnimate ? 1.2 : 0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button className="button">
                  <div className="dots_border"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="sparkle"
                  >
                    <path
                      className="path"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="white"
                      fill="white"
                      d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                    ></path>
                    <path
                      className="path"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="white"
                      fill="white"
                      d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                    ></path>
                    <path
                      className="path"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="white"
                      fill="white"
                      d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24282 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75718 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                    ></path>
                  </svg>
                  <span className="text_button">{heroData?.buttonTexts?.[0] || 'Book Now'}</span>
                </button>
                <button className="slice">
                  <span className="text">{heroData?.buttonTexts?.[1] || 'Learn More'}</span>
                </button>
              </motion.div>
            </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselImages.map((_: any, index: number) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-soft-gold w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
