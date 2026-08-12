import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { memoryosApi } from '../../services/apiClient';

const COLORS = [
  'bg-primary-100 text-primary-700',
  'bg-secondary-100 text-secondary-600',
  'bg-highlight-100 text-highlight-500',
  'bg-primary-50 text-primary-600',
];

export default function MapPage() {
  const { token } = useAuth();
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadMapMemories() {
      if (!token) return;
      setLoading(true);
      setError('');
      try {
        const data = await memoryosApi.mapMemories(token);
        if (!cancelled) setMemories(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadMapMemories();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const places = useMemo(() => groupPlaces(memories), [memories]);

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
          <p className="mt-1 text-xs text-text-muted">Memories with saved coordinates are ready for the full map view.</p>
        </div>
      </motion.div>

      {/* Places list */}
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
        Places in your memories
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {error && (
          <p className="rounded-2xl border border-status-error/30 bg-status-error/8 px-4 py-3 text-sm text-status-error">
            {error}
          </p>
        )}
        {loading && <p className="text-sm text-text-muted">Loading places...</p>}
        {!loading && !error && places.length === 0 && (
          <p className="text-sm text-text-muted">No memories with saved coordinates yet.</p>
        )}
        {places.map((place, i) => (
          <motion.button
            key={place.id}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 + i * 0.05 }}
            className="flex items-center gap-3 rounded-2xl border border-border/80 bg-[#FEFCF8] px-4 py-3.5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold ${COLORS[i % COLORS.length]}`}>
              <MapPin size={14} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-heading">{place.name}</p>
              <p className="text-xs text-text-muted">{place.coordinates} · {place.count} {place.count === 1 ? 'memory' : 'memories'}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function groupPlaces(memories) {
  const map = new Map();
  for (const memory of memories) {
    const name = memory.locationName || coordinateLabel(memory.latitude, memory.longitude);
    const key = `${name}:${memory.latitude}:${memory.longitude}`;
    const existing = map.get(key) || {
      id: key,
      name,
      coordinates: coordinateLabel(memory.latitude, memory.longitude),
      count: 0,
    };
    existing.count += 1;
    map.set(key, existing);
  }
  return Array.from(map.values());
}

function coordinateLabel(latitude, longitude) {
  return `${Number(latitude).toFixed(3)}, ${Number(longitude).toFixed(3)}`;
}
