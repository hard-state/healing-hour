'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately when component mounts
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2700);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
      // Add class to body to trigger content animations
      document.body.classList.add('loading-complete');
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-500 ${isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'radial-gradient(ellipse at center, #FEF9C3 0%, #F5E6D3 40%, #FEF3C7 70%, #F5E6D3 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Animated particles background */}
      <div className="absolute inset-0">
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
          { left: '65%', top: '30%', delay: 0.9 }
        ].map((particle, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 bg-soft-gold rounded-full opacity-60"
            style={{
              left: particle.left,
              top: particle.top,
              animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Logo with enhanced animations */}
      {showContent && (
        <div className={`logo-container mb-8 ${isFadingOut ? 'fade-out' : ''}`}>
          <div className="logo-wrapper">
            <img 
              src="/logo.jpeg" 
              alt="The Healing Houre Logo"
              className="logo-image m-8"
            />
            {/* Rotating ring around logo */}
            <div className="rotating-ring"></div>
            {/* Pulse waves */}
            <div className="pulse-wave pulse-1"></div>
            <div className="pulse-wave pulse-2"></div>
            <div className="pulse-wave pulse-3"></div>
          </div>
        </div>
      )}
      
      {/* Enhanced text with multiple effects */}
      {showContent && (
        <div className={`loader-container ${isFadingOut ? 'fade-out' : ''}`}>
          <div className="loader">
            <span className="text-main">The Healing Houre</span>
            <div className="text-divider"></div>
            <span className="text-sub">Premium Massage Therapy</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
        }

        .logo-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid #D4AF37;
          box-shadow: 0 0 50px rgba(212, 175, 55, 0.8), 0 0 100px rgba(212, 175, 55, 0.4);
          animation: logoEntrance 2s cubic-bezier(0.175, 0.885, 0.32, 1.275), logoFloat 4s ease-in-out infinite;
          position: relative;
          z-index: 10;
        }

        .rotating-ring {
          position: absolute;
          width: 160px;
          height: 160px;
          border: 3px solid transparent;
          border-top: 3px solid #D4AF37;
          border-right: 3px solid #D4AF37;
          border-radius: 50%;
          animation: rotateRing 2s linear infinite;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
        }

        .pulse-wave {
          position: absolute;
          border: 2px solid #D4AF37;
          border-radius: 50%;
          opacity: 0;
          animation: pulse 3s ease-out infinite;
        }

        .pulse-1 {
          width: 140px;
          height: 140px;
          animation-delay: 0s;
        }

        .pulse-2 {
          width: 160px;
          height: 160px;
          animation-delay: 1s;
        }

        .pulse-3 {
          width: 180px;
          height: 180px;
          animation-delay: 2s;
        }

        .loader-container {
          text-align: center;
        }

        .loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .text-main {
          font-size: 42px;
          font-weight: 700;
          color: #D4AF37;
          font-family: 'Playfair Display', serif;
          text-shadow: 0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4);
          animation: textGlow 2s ease-in-out infinite, textSlideIn 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .text-divider {
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          animation: dividerGrow 1.5s ease-out 0.5s both;
        }

        .text-sub {
          font-size: 18px;
          font-weight: 400;
          color: #D4AF37;
          font-family: 'Inter', sans-serif;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
          animation: textGlow 2s ease-in-out infinite, textSlideIn 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both;
          opacity: 0;
        }

        .logo-container.fade-out, .loader-container.fade-out {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.5s ease-out;
        }

        @media (min-width: 768px) {
          .logo-image {
            width: 150px;
            height: 150px;
          }
          
          .rotating-ring {
            width: 200px;
            height: 200px;
          }
          
          .text-main {
            font-size: 52px;
          }
          
          .text-sub {
            font-size: 22px;
          }
        }

        /* Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.9;
          }
        }

        @keyframes logoEntrance {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes rotateRing {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4);
          }
          50% {
            text-shadow: 0 0 40px rgba(212, 175, 55, 1), 0 0 80px rgba(212, 175, 55, 0.6);
          }
        }

        @keyframes textSlideIn {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }

        @keyframes dividerGrow {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 100px;
            opacity: 1;
          }
        }

        .loader {
          max-width: fit-content;
          color: #D4AF37;
          font-size: 50px;
          font-family: 'Playfair Display', serif;
          position: relative;
          font-style: italic;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.2;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
          animation: textGlow 2s ease-in-out infinite;
        }

        .loader span {
          animation: cut 2s infinite, textFloat 3s ease-in-out infinite;
          transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .loader span:first-child {
          margin-bottom: 8px;
        }

        .loader:hover {
          color: #B8941F;
        }

        .loader::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 6px;
          border-radius: 4px;
          background-color: rgba(212, 175, 55, 0.3);
          top: 0px;
          filter: blur(10px);
          animation: scan 2s infinite;
          left: 0;
          z-index: 0;
          transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .loader::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 5px;
          border-radius: 4px;
          background-color: #D4AF37;
          top: 0px;
          animation: scan 2s infinite;
          left: 0;
          z-index: 1;
          filter: opacity(0.9);
          transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes scan {
          0% {
            top: 0px;
          }
          25% {
            top: 54px;
          }
          50% {
            top: 0px;
          }
          75% {
            top: 54px;
          }
        }

        @keyframes cut {
          0% {
            clip-path: inset(0 0 0 0);
          }
          25% {
            clip-path: inset(100% 0 0 0);
          }
          50% {
            clip-path: inset(0 0 100% 0);
          }
          75% {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 30px rgba(212, 175, 55, 0.3);
          }
          50% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 50px rgba(212, 175, 55, 0.6);
          }
        }

        @keyframes textFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes rotate3D {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(90deg) rotateX(10deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(0deg);
          }
          75% {
            transform: rotateY(270deg) rotateX(-10deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg);
          }
        }

        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .loader {
            font-size: 32px;
          }
          
          @keyframes scan {
            0% {
              top: 0px;
            }
            25% {
              top: 35px;
            }
            50% {
              top: 0px;
            }
            75% {
              top: 35px;
            }
          }
        }
      `}</style>
    </div>
  );
}
