import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#solution' },
    { name: 'Why MemoryOS', href: '#why-memoryos' },
    { name: 'Security', href: '#security' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 px-3 py-3 transition-all duration-300 sm:px-5"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-pill border px-3.5 py-2.5 transition-all duration-300 sm:px-4 ${
          scrolled
            ? 'border-white/70 bg-white/75 shadow-nav backdrop-blur-2xl'
            : 'border-transparent bg-white/40 backdrop-blur-md'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 rounded-pill pr-2 focus-visible:outline-primary"
          aria-label="MemoryOS home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-heading text-white shadow-card transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-4 w-4 fill-white/15" strokeWidth={1.8} />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight text-heading sm:text-xl">
            Memory<span className="text-primary">OS</span>
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 rounded-pill border border-border/60 bg-white/55 p-1 shadow-inset lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`rounded-pill px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                activeHash === link.href
                  ? 'bg-heading text-white shadow-soft'
                  : 'text-text hover:bg-white hover:text-heading'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/auth/login"
            className="rounded-pill px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-white/65 hover:text-heading"
          >
            Log in
          </a>
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            onClick={() => (window.location.href = '/auth/signup')}
          >
            Sign up
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-full border border-border/70 bg-white/65 p-2.5 text-heading shadow-soft transition-colors hover:bg-white md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation"
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl border border-border/80 bg-white/90 px-4 pb-5 pt-3 shadow-journal backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-3 py-3 text-base font-semibold transition-colors ${
                    activeHash === link.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-text hover:bg-background hover:text-heading'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 border-t border-border/70 pt-4">
                <a
                  href="/auth/login"
                  className="rounded-pill border border-border bg-background py-3 text-center text-sm font-semibold text-heading"
                >
                  Log in
                </a>
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/auth/signup';
                  }}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
