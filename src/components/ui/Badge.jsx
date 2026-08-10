import React from 'react';

/**
 * Handcrafted Badge Primitives
 */
export default function Badge({
  children,
  variant = 'sage',
  icon: Icon,
  className = '',
}) {
  const variants = {
    sage: 'bg-white/70 text-primary-700 border-primary-200/70 shadow-soft backdrop-blur',
    ai: 'bg-secondary-50 text-secondary-600 border-secondary-200/80',
    neutral: 'bg-white/70 text-text border-border/80',
    dark: 'bg-heading text-white border-transparent',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-pill border ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />}
      <span>{children}</span>
    </span>
  );
}
