import React from 'react';
import { motion } from 'framer-motion';

/**
 * Handcrafted Paper Card Primitives
 * Quiet warm surfaces with restrained lift.
 */
export default function Card({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  ...props
}) {
  return (
    <motion.div
      whileHover={
        hoverEffect
          ? {
              y: -5,
              transition: { duration: 0.28, ease: 'easeOut' },
            }
          : {}
      }
      className={`relative rounded-2xl border border-border/80 bg-white/80 p-6 shadow-soft backdrop-blur transition-all duration-300 md:p-8 ${
        hoverEffect ? 'hover:border-primary-200 hover:shadow-card' : ''
      } ${className}`}
      {...props}
    >
      {glow && (
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary-200/20 via-secondary-200/20 to-highlight-200/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
      )}
      {children}
    </motion.div>
  );
}
