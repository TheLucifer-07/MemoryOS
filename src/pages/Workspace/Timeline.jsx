import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';

const TIMELINE = [
  {
    year: '2026',
    months: [
      {
        month: 'August',
        memories: [
          { id: 1, title: 'Kyoto temple garden walk', location: 'Kyoto, Japan', date: 'Aug 7', tags: ['Travel'] },
        ],
      },
      {
        month: 'July',
        memories: [
          { id: 2, title: 'First day at new studio', location: 'Hyderabad', date: 'Jul 1', tags: ['Career'] },
          { id: 3, title: 'Monsoon evening with Priya', location: 'Banjara Hills', date: 'Jul 14', tags: ['Friends'] },
        ],
      },
      {
        month: 'May',
        memories: [
          { id: 4, title: 'Dad called about the old house', date: 'May 12', tags: ['Family'] },
        ],
      },
    ],
  },
  {
    year: '2025',
    months: [
      {
        month: 'September',
        memories: [
          { id: 5, title: 'Ocean road trip — Big Sur', location: 'California', date: 'Sep 4', tags: ['Travel'] },
        ],
      },
      {
        month: 'December',
        memories: [
          { id: 6, title: "New Year's Eve on the rooftop", location: 'Mumbai', date: 'Dec 31', tags: ['Friends', 'Milestone'] },
        ],
      },
    ],
  },
  {
    year: '2024',
    months: [
      {
        month: 'May',
        memories: [
          { id: 7, title: 'Graduation day', location: 'Hyderabad', date: 'May 18', tags: ['College', 'Milestone'] },
        ],
      },
    ],
  },
];

export default function TimelinePage() {
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
        {TIMELINE.map((yearGroup, yi) => (
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
    </div>
  );
}
