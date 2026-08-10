import React from 'react';
import { Link } from 'react-router-dom';
import MemoryLogo from '../memoryos/MemoryLogo';

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F2EC]">
      {/* Minimal top bar */}
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-heading no-underline"
          aria-label="MemoryOS home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-heading text-white">
            <MemoryLogo size={20} color="white" />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight text-heading">
            Memory<span className="text-primary">OS</span>
          </span>
        </Link>
      </header>

      {/* Centered form area */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px]">{children}</div>
      </main>

      <footer className="py-6 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} MemoryOS. Your memories stay yours.
      </footer>
    </div>
  );
}
