import React from 'react';

/**
 * MemoryOS Symbol — abstract M formed by two arcs suggesting
 * continuity, time, and personal history. No sparkles, no AI clichés.
 */
export default function MemoryLogo({ size = 36, className = '', color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer ring — continuity / time */}
      <circle cx="18" cy="18" r="15.5" stroke={color} strokeWidth="1.4" strokeOpacity="0.2" />
      {/* Left arc — past */}
      <path
        d="M8.5 25 C8.5 15.5 13.5 11 18 18"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right arc — present */}
      <path
        d="M18 18 C22.5 25 27.5 21 27.5 11"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Anchor dot — the moment */}
      <circle cx="18" cy="18" r="2.4" fill={color} />
    </svg>
  );
}
