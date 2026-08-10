import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUp } from 'lucide-react';

const CAPABILITIES = [
  { label: 'Find memories', description: 'Locate a specific moment by describing it.' },
  { label: 'Connect memories', description: 'Discover patterns and links across your life.' },
  { label: 'Summarize a period', description: 'Get a quiet reflection on a chapter of your life.' },
  { label: 'Answer questions', description: 'Ask anything about your personal history.' },
];

export default function AIPage() {
  const [input, setInput] = useState('');

  return (
    <div className="flex h-full flex-col px-6 py-8 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading">AI</h1>
        <p className="mt-1.5 text-sm text-text-muted">
          A quiet assistant for your memories. Not the product — just a tool inside it.
        </p>
      </motion.div>

      {/* Capabilities */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {CAPABILITIES.map((cap, i) => (
          <div
            key={cap.label}
            className="rounded-2xl border border-border/80 bg-[#FEFCF8] px-4 py-4 shadow-soft"
          >
            <p className="text-sm font-semibold text-heading">{cap.label}</p>
            <p className="mt-1 text-xs leading-5 text-text-muted">{cap.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Chat area placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.16 }}
        className="flex flex-1 flex-col"
      >
        <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed border-border bg-[#FEFCF8] py-16 text-center">
          <div>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-50 text-secondary-600">
              <Sparkles size={20} strokeWidth={1.6} />
            </div>
            <p className="text-sm font-semibold text-heading">AI memory assistant</p>
            <p className="mt-1.5 max-w-xs text-sm text-text-muted">
              Ask about your memories, find connections, or reflect on a period of your life.
            </p>
            <p className="mt-3 text-xs text-text-muted">Coming soon — AI will connect to your memory vault.</p>
          </div>
        </div>

        {/* Input */}
        <div className="mt-4 flex items-center gap-3 rounded-3xl border border-border bg-[#FEFCF8] px-5 py-3.5 shadow-soft transition-all focus-within:border-heading focus-within:shadow-card">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your memories…"
            className="flex-1 bg-transparent text-sm text-heading placeholder-text-muted outline-none"
          />
          <button
            type="button"
            disabled={!input.trim()}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-heading text-white shadow-soft transition-all hover:bg-primary-700 disabled:opacity-30"
          >
            <ArrowUp size={14} strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
