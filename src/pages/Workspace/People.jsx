import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

const GROUPS = [
  {
    label: 'Family',
    people: [
      { id: 1, name: 'Dad', memories: 8, initials: 'D' },
      { id: 2, name: 'Mom', memories: 12, initials: 'M' },
    ],
  },
  {
    label: 'Friends',
    people: [
      { id: 3, name: 'Priya', memories: 6, initials: 'P' },
      { id: 4, name: 'Rohan', memories: 4, initials: 'R' },
      { id: 5, name: 'Maya', memories: 9, initials: 'M' },
    ],
  },
  {
    label: 'College',
    people: [
      { id: 6, name: 'Arjun', memories: 3, initials: 'A' },
      { id: 7, name: 'Sneha', memories: 5, initials: 'S' },
    ],
  },
];

const COLORS = [
  'bg-primary-100 text-primary-700',
  'bg-secondary-100 text-secondary-600',
  'bg-highlight-100 text-highlight-500',
  'bg-primary-50 text-primary-600',
];

export default function PeoplePage() {
  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex items-start justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading">People</h1>
          <p className="mt-1.5 text-sm text-text-muted">The people woven through your memories.</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-2xl border border-border bg-[#FEFCF8] px-4 py-2.5 text-sm font-semibold text-heading shadow-soft transition-all hover:shadow-card"
        >
          <UserPlus size={14} strokeWidth={2} />
          Add person
        </button>
      </motion.div>

      <div className="space-y-10">
        {GROUPS.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: gi * 0.08 }}
          >
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              {group.label}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.people.map((person, pi) => (
                <button
                  key={person.id}
                  type="button"
                  className="flex items-center gap-3 rounded-2xl border border-border/80 bg-[#FEFCF8] px-4 py-3.5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl font-display text-sm font-bold ${COLORS[(gi + pi) % COLORS.length]}`}>
                    {person.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-heading">{person.name}</p>
                    <p className="text-xs text-text-muted">
                      {person.memories} {person.memories === 1 ? 'memory' : 'memories'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
