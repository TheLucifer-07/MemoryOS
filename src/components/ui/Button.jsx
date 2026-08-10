import React from 'react';
import { motion } from 'framer-motion';

/**
 * Handcrafted Paper Button Primitives
 * Variants: 'primary' | 'secondary' | 'ghost' | 'outline' | 'ai'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  onClick,
  ...props
}) {
  const baseStyles =
    'group relative inline-flex min-h-10 items-center justify-center overflow-hidden rounded-pill font-sans font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary select-none disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    primary:
      'bg-heading text-white shadow-card hover:bg-primary-hover hover:shadow-journal',
    secondary:
      'bg-white/85 text-heading border border-border/90 shadow-soft backdrop-blur hover:border-primary-200 hover:bg-white hover:text-primary-700 hover:shadow-card',
    ghost:
      'bg-transparent text-text hover:bg-white/65 hover:text-heading',
    outline:
      'bg-transparent text-heading border border-border hover:border-primary-300 hover:bg-white/60 hover:text-primary-700',
    ai:
      'bg-secondary text-white shadow-soft hover:bg-secondary-hover hover:shadow-card',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </motion.button>
  );
}
