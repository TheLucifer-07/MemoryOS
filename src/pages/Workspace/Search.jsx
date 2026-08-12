import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import MemoryCard from '../../components/memoryos/MemoryCard';
import MemoryDetailModal from '../../components/memoryos/MemoryDetailModal';
import MemoryEditorModal from '../../components/memoryos/MemoryEditorModal';
import { useAuth } from '../../context/AuthContext';
import { memoryosApi } from '../../services/apiClient';

const SUGGESTIONS = [
  'Find my trip to Hyderabad',
  'Memories with my college friends',
  'Photos from 2024',
  'That birthday celebration',
  'Conversations with Dad',
];

export default function SearchPage() {
  const { token } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [detailId, setDetailId] = useState(null);
  const [detailMemory, setDetailMemory] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || !token) {
      setResults([]);
      setSearching(false);
      return;
    }

    let cancelled = false;
    const handle = window.setTimeout(async () => {
      setSearching(true);
      setError('');
      try {
        const data = await memoryosApi.search(token, trimmed);
        if (!cancelled) setResults(data.map(toCardMemory));
      } catch (err) {
        if (!cancelled) setError(err.message || 'Search failed.');
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [query, token]);

  async function openMemory(id) {
    setDetailId(id);
    setDetailMemory(null);
    setDetailLoading(true);
    setDetailError('');
    try {
      setDetailMemory(await memoryosApi.memory(token, id));
    } catch (err) {
      setDetailError(err.message || 'Memory could not be opened.');
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleSaved(saved) {
    setEditorOpen(false);
    setDetailMemory(saved);
    setResults((current) => current.map((item) => item.id === saved.id ? toCardMemory(saved) : item));
  }

  async function handleDelete() {
    if (!detailMemory || !window.confirm('Delete this memory? This cannot be undone.')) return;
    setDeleting(true);
    setDetailError('');
    try {
      await memoryosApi.deleteMemory(token, detailMemory.id);
      setResults((current) => current.filter((item) => item.id !== detailMemory.id));
      setDetailId(null);
      setDetailMemory(null);
    } catch (err) {
      setDetailError(err.message || 'Memory could not be deleted.');
    } finally {
      setDeleting(false);
    }
  }

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
          className="mt-4"
        >
          {searching && <p className="text-sm text-text-muted">Searching memories...</p>}
          {error && (
            <p className="rounded-2xl border border-status-error/30 bg-status-error/8 px-4 py-3 text-sm text-status-error">
              {error}
            </p>
          )}
          {!searching && !error && results.length === 0 && (
            <p className="text-sm text-text-muted">
              No memories found for <span className="font-semibold text-heading">"{query}"</span>.
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} onClick={() => openMemory(memory.id)} />
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {editorOpen && (
          <MemoryEditorModal
            mode="edit"
            memory={detailMemory}
            token={token}
            onClose={() => setEditorOpen(false)}
            onSaved={handleSaved}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailId && !editorOpen && (
          <MemoryDetailModal
            memory={detailMemory}
            loading={detailLoading}
            deleting={deleting}
            error={detailError}
            onClose={() => {
              setDetailId(null);
              setDetailMemory(null);
            }}
            onEdit={() => setEditorOpen(true)}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
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
