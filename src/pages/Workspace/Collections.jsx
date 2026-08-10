import React from 'react';
import { motion } from 'framer-motion';
import { FolderHeart, Plus } from 'lucide-react';

const COLLECTIONS = [
  { id: 1, name: 'College Years', count: 34, description: 'Four years that changed everything.', color: 'from-primary-50 to-primary-100' },
  { id: 2, name: 'Family', count: 28, description: 'The people who made me.', color: 'from-highlight-50 to-highlight-100' },
  { id: 3, name: 'Trips', count: 19, description: "Every place I've been.", color: 'from-secondary-50 to-secondary-100' },
  { id: 4, name: 'Childhood', count: 12, description: 'Before I knew what time was.', color: 'from-primary-50 to-highlight-50' },
  { id: 5, name: 'Friends', count: 41, description: 'The ones who stayed.', color: 'from-secondary-50 to-primary-50' },
  { id: 6, name: 'Important Moments', count: 7, description: 'The days that divided before and after.', color: 'from-highlight-100 to-secondary-50' },
];

export default function CollectionsPage() {
  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex items-start justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading">Collections</h1>
          <p className="mt-1.5 text-sm text-text-muted">Curated chapters of your life.</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-2xl border border-border bg-[#FEFCF8] px-4 py-2.5 text-sm font-semibold text-heading shadow-soft transition-all hover:shadow-card"
        >
          <Plus size={14} strokeWidth={2.5} />
          New collection
        </button>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((col, i) => (
          <motion.button
            key={col.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="group rounded-3xl border border-border/80 bg-[#FEFCF8] text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card overflow-hidden"
          >
            {/* Color band */}
            <div className={`h-20 w-full bg-gradient-to-br ${col.color} flex items-end px-5 pb-3`}>
              <FolderHeart size={20} strokeWidth={1.6} className="text-heading/40" />
            </div>
            <div className="px-5 py-4">
              <h3 className="font-display text-base font-bold text-heading">{col.name}</h3>
              <p className="mt-1 text-sm leading-6 text-text-muted">{col.description}</p>
              <p className="mt-3 text-xs font-semibold text-text-muted">
                {col.count} {col.count === 1 ? 'memory' : 'memories'}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
