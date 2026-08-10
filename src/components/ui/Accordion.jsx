import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Accordion Item Component for FAQ Section
 */
export default function Accordion({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/80 py-4 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl py-2 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-extrabold text-heading transition-colors group-hover:text-primary-700 md:text-lg">
          {question}
        </span>
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-all duration-300 ${
            isOpen ? 'rotate-180 bg-heading text-white' : ''
          }`}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.8} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-3 pt-2 text-sm leading-7 text-text md:text-base md:leading-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
