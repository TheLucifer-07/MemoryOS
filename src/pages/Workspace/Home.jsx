import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import MemoryCard from '../../components/memoryos/MemoryCard';

const SAMPLE_MEMORIES = [
  {
    id: 1,
    title: 'Kyoto temple garden walk',
    date: 'Jul 18, 2026',
    location: 'Kyoto, Japan',
    people: ['Maya'],
    story: 'We wandered through the moss garden for two hours without saying much. The silence felt like a gift.',
    tags: ['Travel', 'Japan'],
  },
  {
    id: 2,
    title: 'Dad called about the old house',
    date: 'May 12, 2026',
    location: 'Voice note',
    story: "He described the smell of the kitchen in the morning. I hadn't thought about that in years.",
    tags: ['Family'],
  },
  {
    id: 3,
    title: 'Ocean road trip — Big Sur',
    date: 'Sep 4, 2025',
    location: 'Big Sur, California',
    people: ['Rohan', 'Priya'],
    story: "Pulled over at every overlook. Didn't need a plan.",
    tags: ['Travel', 'Friends'],
  },
  {
    id: 4,
    title: 'Graduation day',
    date: 'May 2024',
    location: 'Hyderabad',
    story: 'Four years compressed into one afternoon. Everyone cried a little.',
    tags: ['College', 'Milestone'],
  },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function WorkspaceHome() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <p className="text-sm font-medium text-text-muted">
          {greeting()}, {firstName}.
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
          Your life, remembered.
        </h1>
      </motion.div>

      {/* Add memory */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        type="button"
        className="mb-10 flex items-center gap-3 rounded-3xl border border-dashed border-border bg-[#FEFCF8] px-6 py-4 text-sm font-semibold text-text-muted shadow-soft transition-all hover:border-heading/40 hover:text-heading hover:shadow-card w-full sm:w-auto"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-heading text-white">
          <Plus size={14} strokeWidth={2.5} />
        </span>
        Add a memory
      </motion.button>

      {/* Recent memories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.16 }}
      >
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-text-muted">
          Recently remembered
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {SAMPLE_MEMORIES.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
            >
              <MemoryCard memory={m} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
