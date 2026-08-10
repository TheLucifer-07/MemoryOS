import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import MemoryCard from '../../components/memoryos/MemoryCard';
import { memoryosApi } from '../../services/apiClient';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function WorkspaceHome() {
  const { user, token } = useAuth();
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const firstName = user?.name?.split(' ')[0] || 'there';

  useEffect(() => {
    let cancelled = false;
    async function loadMemories() {
      if (!token) return;
      setLoading(true);
      setError('');
      try {
        const data = await memoryosApi.memories(token);
        if (!cancelled) setMemories(data.slice(0, 8).map(toCardMemory));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadMemories();
    return () => {
      cancelled = true;
    };
  }, [token]);

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
        {error && (
          <p className="mb-5 rounded-2xl border border-status-error/30 bg-status-error/8 px-4 py-3 text-sm text-status-error">
            {error}
          </p>
        )}
        {loading && <p className="text-sm text-text-muted">Loading memories...</p>}
        {!loading && !error && memories.length === 0 && (
          <p className="text-sm text-text-muted">No memories yet.</p>
        )}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {memories.map((m, i) => (
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

function toCardMemory(memory) {
  return {
    id: memory.id,
    title: memory.title,
    date: formatDate(memory.memoryDate),
    location: memory.locationName,
    people: memory.people?.map((person) => person.name) || [],
    story: memory.story || memory.description,
    tags: [],
  };
}

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T00:00:00`));
}
