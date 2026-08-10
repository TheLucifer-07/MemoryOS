import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function FinalCTA() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden border-t border-border/70 bg-white/55 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />

      <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-pill border border-primary-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-bold text-primary-700 shadow-soft backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.8} />
            Begin Your Legacy Archive Today
          </div>

          <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-heading sm:text-4xl md:text-5xl lg:text-6xl">
            Never let another precious moment fade away.
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-text sm:text-lg">
            Join thousands of early adopters preserving their life's
            conversations, places, and memories in a private, encrypted vault.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              onClick={() =>
                alert('Welcome to MemoryOS! Early access link triggered.')
              }
            >
              Start Free 14-Day Vault Trial
            </Button>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-4 border-y border-border/70 py-5 text-xs font-semibold text-text-muted sm:gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.8} />
              Zero-Knowledge Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-error" strokeWidth={1.8} />
              No Credit Card Required
            </span>
            <span>Cancel Anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
