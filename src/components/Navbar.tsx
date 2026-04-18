'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from './ui/Button';

const slidingButtonStyles = `
  .sliding-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    background: transparent;
    font-family: "Montserrat", sans-serif;
    box-shadow: none;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #00000070;
    padding: 0;
  }

  .sliding-button:after {
    content: " ";
    width: 0%;
    height: 100%;
    background: #ffd401;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
  }

  .sliding-button:hover::after {
    right: auto;
    left: 0;
    width: 100%;
  }

  .sliding-button span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 12px 20px;
    color: #0000008c;
    font-size: 0.875em;
    font-weight: 700;
    letter-spacing: 0.1em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
    display: block;
  }

  .sliding-button:hover span {
    color: #183153;
    animation: scaleUp 0.3s ease-in-out;
  }

  @keyframes scaleUp {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const pathname = usePathname();

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

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Inject sliding button styles
    if (!document.getElementById('sliding-button-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'sliding-button-styles';
      styleElement.textContent = slidingButtonStyles;
      document.head.appendChild(styleElement);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up styles if needed
      const styleElement = document.getElementById('sliding-button-styles');
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  const handleNavigation = (href: string) => {
    // Close mobile menu first
    setIsOpen(false);
    
    // If we're on the home page and it's a hash link
    if (pathname === '/' && href.startsWith('#')) {
      // Try multiple times to find the element (handles dynamic loading)
      const tryScroll = (attempts = 0) => {
        const element = document.querySelector(href);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        } else if (attempts < 3) {
          // Retry after a short delay (for dynamic content)
          setTimeout(() => tryScroll(attempts + 1), 200);
        } else {
          // If still not found, navigate to home with hash as fallback
          window.location.href = href;
        }
      };
      tryScroll();
    } else if (href.startsWith('#')) {
      // If we're on any other page, navigate to home page with hash
      window.location.href = '/' + href;
    } else {
      // Regular navigation
      window.location.href = href;
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Our Team', href: '#team' },
    { name: 'Location', href: '#location' },
    { name: 'Book Today', href: '#book' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={canAnimate ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.8, delay: canAnimate ? 0.1 : 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
        scrolled 
          ? 'bg-warm-cream/95 backdrop-blur-xl shadow-xl border-b border-black/20' 
          : 'bg-white/20 backdrop-blur-xl shadow-xl border-b border-black/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className={`${!isHoveringLogo ? 'spin-3d' : ''} transition-transform duration-300 cursor-pointer bg-transparent border-none`}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000
              }}
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
            >
              <Image
                src="/logo 7.jpeg"
                alt="Massage Therapy Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className={`transition-colors duration-300 relative group bg-transparent border-none cursor-pointer ${
                    scrolled ? 'text-matte-black' : 'text-warm-cream'
                  }`}
                  whileHover={{ y: -2 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#D4AF37'}
                  onMouseLeave={(e) => e.currentTarget.style.color = scrolled ? '#1A1A1A' : '#FFFFFF'}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#D4AF37' }} />
                </motion.button>
              ))}
            <button className="sliding-button" onClick={() => handleNavigation('#book')}>
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-all duration-300 p-2 rounded-lg ${
              scrolled ? 'text-white bg-matte-black/80' : 'text-white bg-white/20 backdrop-blur-sm'
            } border border-black/30 shadow-lg`}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                className="block w-6 h-0.5 bg-black mb-1.5 transition-all shadow-sm"
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="block w-6 h-0.5 bg-black mb-1.5 transition-all shadow-sm"
              />
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                className="block w-6 h-0.5 bg-black transition-all shadow-sm"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden backdrop-blur-xl mb-3 rounded-lg mt-2 overflow-x-hidden max-w-full ${
                scrolled ? 'bg-warm-cream/95' : 'bg-matte-black/90'
              }`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 max-w-full overflow-x-hidden">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.name}
                    onClick={() => handleNavigation(link.href)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-300 bg-transparent border-none cursor-pointer max-w-full overflow-x-hidden ${
                      scrolled ? 'text-matte-black' : 'text-warm-cream'
                    }`}
                    whileHover={{ x: 10 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#D4AF37';
                      e.currentTarget.style.backgroundColor = scrolled ? 'rgba(26, 26, 26, 0.1)' : 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = scrolled ? '#1A1A1A' : '#FFFFFF';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {link.name}
                  </motion.button>
                ))}
                <div className="px-3 py-2">
                  <Button size="sm" onClick={() => handleNavigation('#book')} className="w-full">
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
