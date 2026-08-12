import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MemoryDetailModal from '../../components/memoryos/MemoryDetailModal';
import MemoryEditorModal from '../../components/memoryos/MemoryEditorModal';
import { memoryosApi } from '../../services/apiClient';

export default function TimelinePage() {
  const { token } = useAuth();
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detailId, setDetailId] = useState(null);
  const [detailMemory, setDetailMemory] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [editorMode, setEditorMode] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadTimeline = useCallback(async ({ silent = false } = {}) => {
    if (!token) return;
    if (!silent) setLoading(true);
    setError('');
    try {
      const groups = await memoryosApi.timeline(token);
      setTimeline(toTimeline(groups));
    } catch (err) {
      setError(err.message);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadTimeline();
  }, [loadTimeline]);

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
    setEditorMode(null);
    setDetailMemory(saved);
    setDetailId(saved.id);
    await loadTimeline({ silent: true });
  }

  async function handleDelete() {
    if (!detailMemory || !window.confirm('Delete this memory? This cannot be undone.')) return;
    setDeleting(true);
    setDetailError('');
    try {
      await memoryosApi.deleteMemory(token, detailMemory.id);
      setDetailId(null);
      setDetailMemory(null);
      await loadTimeline({ silent: true });
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
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading">Timeline</h1>
        <p className="mt-1.5 text-sm text-text-muted">Your life, in order.</p>
      </motion.div>

      <div className="max-w-2xl">
        {error && (
          <p className="mb-5 rounded-2xl border border-status-error/30 bg-status-error/8 px-4 py-3 text-sm text-status-error">
            {error}
          </p>
        )}
        {loading && <p className="text-sm text-text-muted">Loading timeline...</p>}
        {!loading && !error && timeline.length === 0 && (
          <p className="text-sm text-text-muted">No dated memories yet.</p>
        )}
        {timeline.map((yearGroup, yi) => (
          <motion.div
            key={yearGroup.year}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: yi * 0.08 }}
            className="mb-10"
          >
            {/* Year marker */}
            <div className="mb-6 flex items-center gap-4">
              <span className="font-display text-2xl font-extrabold text-heading">{yearGroup.year}</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {yearGroup.months.map((monthGroup) => (
              <div key={monthGroup.month} className="mb-8 pl-4">
                {/* Month */}
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {monthGroup.month}
                </p>

                {/* Memories */}
                <div className="relative space-y-3 pl-5">
                  {/* Vertical line */}
                  <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

                  {monthGroup.memories.map((mem) => (
                    <div key={mem.id} className="relative">
                      {/* Dot */}
                      <div className="absolute -left-[21px] top-3.5 h-2.5 w-2.5 rounded-full border-2 border-[#F5F2EC] bg-heading shadow-soft" />

                      <button
                        type="button"
                        onClick={() => openMemory(mem.id)}
                        className="group w-full rounded-2xl border border-border/80 bg-[#FEFCF8] px-4 py-3.5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-border-hover hover:shadow-card"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-sm font-bold text-heading leading-snug">
                            {mem.title}
                          </h3>
                          <span className="flex-shrink-0 text-xs text-text-muted">{mem.date}</span>
                        </div>
                        {mem.location && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-text-muted">
                            <MapPin size={10} strokeWidth={2} />
                            {mem.location}
                          </p>
                        )}
                        {mem.tags?.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {mem.tags.map((t) => (
                              <span key={t} className="rounded-pill border border-border/70 bg-background px-2.5 py-0.5 text-[11px] font-medium text-text-muted">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {editorMode && (
          <MemoryEditorModal
            mode="edit"
            memory={detailMemory}
            token={token}
            onClose={() => setEditorMode(null)}
            onSaved={handleSaved}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailId && !editorMode && (
          <MemoryDetailModal
            memory={detailMemory}
            loading={detailLoading}
            deleting={deleting}
            error={detailError}
            onClose={() => {
              setDetailId(null);
              setDetailMemory(null);
            }}
            onEdit={() => setEditorMode('edit')}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function toTimeline(groups) {
  const yearMap = new Map();
  for (const group of groups) {
    if (!group.year || !group.month) continue;
    const year = String(group.year);
    const month = monthName(group.month);
    if (!yearMap.has(year)) yearMap.set(year, []);
    yearMap.get(year).push({
      month,
      memories: group.memories.map((memory) => ({
        id: memory.id,
        title: memory.title,
        location: memory.locationName,
        date: formatShortDate(memory.memoryDate),
        tags: memory.people?.map((person) => person.name) || [],
      })),
    });
  }
  return Array.from(yearMap.entries()).map(([year, months]) => ({ year, months }));
}

function monthName(month) {
  return new Intl.DateTimeFormat(undefined, { month: 'long' }).format(new Date(2026, month - 1, 1));
}

function formatShortDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(`${value}T00:00:00`));
}
