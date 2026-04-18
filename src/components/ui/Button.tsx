import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'primary2' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({ 
  children, 
  onClick, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  target,
  rel
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2";
  
  const variants = {
    primary2: "bg-soft-gold text-black border-2 border-black hover:text-white hover:border-white hover:bg-yellow-400 hover:shadow-lg hover:scale-105",
    primary: "bg-soft-gold text-white border-2 border-white hover:bg-yellow-400 hover:shadow-lg hover:scale-105",
    secondary: "bg-matte-black text-warm-cream hover:bg-gray-800 hover:shadow-lg hover:scale-105",
    outline: "border-2 border-soft-gold text-soft-gold hover:bg-soft-gold hover:text-matte-black hover:shadow-lg hover:scale-105"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonContent = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick}>
      {buttonContent}
    </button>
  );
}
