import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const PLACES = [
  { id: 1, name: 'Hyderabad', type: 'Lived here', count: 24, color: 'bg-primary-100 text-primary-700' },
  { id: 2, name: 'Kyoto', type: 'Visited', count: 3, color: 'bg-secondary-100 text-secondary-600' },
  { id: 3, name: 'Big Sur', type: 'Visited', count: 1, color: 'bg-highlight-100 text-highlight-500' },
  { id: 4, name: 'Mumbai', type: 'Visited', count: 5, color: 'bg-primary-50 text-primary-600' },
];

export default function MapPage() {
  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading">Map</h1>
        <p className="mt-1.5 text-sm text-text-muted">Places where memories happened.</p>
      </motion.div>

      {/* Map placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="mb-8 flex h-72 items-center justify-center rounded-3xl border border-dashed border-border bg-[#FEFCF8] sm:h-96"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-50 text-secondary-600">
            <MapPin size={22} strokeWidth={1.6} />
          </div>
          <p className="text-sm font-semibold text-heading">Interactive map coming soon</p>
          <p className="mt-1 text-xs text-text-muted">Your memories will appear as pins on a world map.</p>
        </div>
      </motion.div>

      {/* Places list */}
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
        Places in your memories
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {PLACES.map((place, i) => (
          <motion.button
            key={place.id}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 + i * 0.05 }}
            className="flex items-center gap-3 rounded-2xl border border-border/80 bg-[#FEFCF8] px-4 py-3.5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold ${place.color}`}>
              <MapPin size={14} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-heading">{place.name}</p>
              <p className="text-xs text-text-muted">{place.type} · {place.count} {place.count === 1 ? 'memory' : 'memories'}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
