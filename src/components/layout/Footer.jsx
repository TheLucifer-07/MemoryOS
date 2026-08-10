import React from 'react';
import { Sparkles, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background pb-12 pt-16 font-sans text-sm text-text">
      <div className="mos-container">
        <div className="grid grid-cols-1 gap-10 border-b border-border/80 pb-12 md:grid-cols-5">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <a href="#" className="flex items-center gap-2.5" aria-label="MemoryOS home">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-heading text-white shadow-card">
                <Sparkles className="h-4 w-4 fill-white/20" strokeWidth={1.8} />
              </div>
              <span className="font-display text-lg font-extrabold text-heading">
                Memory<span className="text-primary">OS</span>
              </span>
            </a>
            <p className="max-w-sm leading-7 text-text">
              An AI-powered Memory Operating System designed to help you
              capture, organize, search, and relive your entire life's memories
              with zero effort.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold text-text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-status-success" />
              <span>All Systems Operational</span>
              <span className="mx-1">•</span>
              <Shield className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span>Zero-Knowledge Encrypted</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-4 font-display text-xs font-extrabold uppercase tracking-wider text-heading">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#showcase" className="transition-colors hover:text-primary-700">
                  Timeline Stream
                </a>
              </li>
              <li>
                <a href="#showcase" className="transition-colors hover:text-primary-700">
                  Memory Map
                </a>
              </li>
              <li>
                <a href="#showcase" className="transition-colors hover:text-primary-700">
                  People Graph
                </a>
              </li>
              <li>
                <a href="#showcase" className="transition-colors hover:text-primary-700">
                  Semantic Search
                </a>
              </li>
              <li>
                <a href="#future" className="transition-colors hover:text-primary-700">
                  Life Replay (Roadmap)
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 font-display text-xs font-extrabold uppercase tracking-wider text-heading">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#why-memoryos" className="transition-colors hover:text-primary-700">
                  About MemoryOS
                </a>
              </li>
              <li>
                <a href="#security" className="transition-colors hover:text-primary-700">
                  Security & Privacy
                </a>
              </li>
              <li>
                <a href="#social-proof" className="transition-colors hover:text-primary-700">
                  Early Access
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary-700">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Resources */}
          <div>
            <h4 className="mb-4 font-display text-xs font-extrabold uppercase tracking-wider text-heading">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="transition-colors hover:text-primary-700">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary-700">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary-700">
                  Data Governance
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary-700">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} MemoryOS Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for human memories with <Heart className="h-3.5 w-3.5 fill-status-error text-status-error" strokeWidth={1.8} />
          </p>
        </div>
      </div>
    </footer>
  );
}
