import React from 'react';
import { Calendar, Edit3, Loader2, MapPin, Trash2, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MemoryDetailModal({ memory, loading, deleting, error, onClose, onEdit, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-heading/25 px-4 py-6 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-[#FEFCF8] p-5 shadow-journal sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Memory</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight text-heading">
              {loading ? 'Loading memory...' : memory?.title}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-2xl p-2 text-text-muted hover:bg-background hover:text-heading" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-2xl border border-status-error/30 bg-status-error/8 px-4 py-3 text-sm text-status-error">
            {error}
          </p>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Loader2 size={16} className="animate-spin" />
            Loading memory details...
          </div>
        )}

        {!loading && memory && (
          <>
            <div className="mb-5 flex flex-wrap gap-3 text-sm text-text-muted">
              {memory.memoryDate && (
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-background px-3 py-1.5">
                  <Calendar size={13} />
                  {formatDate(memory.memoryDate)}
                </span>
              )}
              {(memory.locationName || hasCoordinates(memory)) && (
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-background px-3 py-1.5">
                  <MapPin size={13} />
                  {memory.locationName || coordinateLabel(memory.latitude, memory.longitude)}
                </span>
              )}
            </div>

            <div className="rounded-3xl border border-border bg-background p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-heading">
                {memory.story || memory.description || 'No content saved for this memory.'}
              </p>
            </div>

            {memory.locationName && hasCoordinates(memory) && (
              <div className="mt-4 rounded-2xl border border-border bg-background px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Location saved</p>
                <p className="mt-1 text-sm font-semibold text-heading">{memory.locationName}</p>
                <p className="mt-1 text-xs text-text-muted">{coordinateLabel(memory.latitude, memory.longitude)}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={onDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-status-error/30 px-5 py-3 text-sm font-semibold text-status-error transition hover:bg-status-error/8 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Delete
              </button>
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-heading px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-heading/90"
              >
                <Edit3 size={14} />
                Edit Memory
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

function hasCoordinates(memory) {
  return memory.latitude != null && memory.longitude != null;
}

function coordinateLabel(latitude, longitude) {
  return `${Number(latitude).toFixed(5)}, ${Number(longitude).toFixed(5)}`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T00:00:00`));
}
