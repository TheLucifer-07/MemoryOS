import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SUGGESTIONS = [
  'Find my trip to Hyderabad',
  'Memories with my college friends',
  'Photos from 2024',
  'That birthday celebration',
  'Conversations with Dad',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading">Search</h1>
        <p className="mt-1.5 text-sm text-text-muted">Find any memory, in your own words.</p>
      </motion.div>

      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="mb-8 max-w-2xl"
      >
        <div className="flex items-center gap-3 rounded-3xl border border-border bg-[#FEFCF8] px-5 py-4 shadow-soft transition-all focus-within:border-heading focus-within:shadow-card">
          <Search size={18} strokeWidth={1.8} className="flex-shrink-0 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe a memory…"
            className="flex-1 bg-transparent text-base text-heading placeholder-text-muted outline-none"
          />
        </div>
      </motion.div>

      {/* Empty state / suggestions */}
      {!query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
            Try searching for
          </p>
          <div className="flex flex-wrap gap-2.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="rounded-pill border border-border bg-[#FEFCF8] px-4 py-2 text-sm font-medium text-text shadow-soft transition-all hover:border-heading/30 hover:text-heading hover:shadow-card"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FEFCF8] border border-border shadow-soft">
              <Search size={22} strokeWidth={1.4} className="text-text-muted" />
            </div>
            <p className="text-sm font-semibold text-heading">Semantic search coming soon</p>
            <p className="mt-1.5 max-w-xs text-sm text-text-muted">
              You'll be able to search your memories using natural language — no tags required.
            </p>
          </div>
        </motion.div>
      )}

      {query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-text-muted"
        >
          Search results for <span className="font-semibold text-heading">"{query}"</span> will appear here once search is connected.
        </motion.div>
      )}
    </div>
  );
}
