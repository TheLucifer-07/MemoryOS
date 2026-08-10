import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, MapPin, Calendar, User, Tag } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function Solution() {
  const sampleQueries = [
    {
      query: 'Where did I have that matcha latte in Shibuya?',
      answer: 'Found 1 memory from your Tokyo trip on July 18, 2026.',
      location: 'Blue Bottle Coffee, Shibuya, Tokyo',
      date: 'July 18, 2026 at 3:45 PM',
      people: 'With Maya',
      tags: ['#Tokyo2026', '#Coffee', '#Travel'],
      icon: MapPin,
    },
    {
      query: 'What were Dad’s recommendations for house painting?',
      answer: 'Extracted from voice note "Weekend Call with Dad".',
      location: 'Home Studio',
      date: 'May 12, 2026',
      people: 'Dad (Robert)',
      tags: ['#HomeImprovement', '#VoiceNote', '#Family'],
      icon: Calendar,
    },
    {
      query: 'Show me photos with Maya near mountain trails',
      answer: 'Found 4 moments clustered around Yosemite National Park.',
      location: 'Yosemite, Valley Trail',
      date: 'October 4, 2025',
      people: 'With Maya & Alex',
      tags: ['#Outdoors', '#Yosemite', '#Hiking'],
      icon: User,
    },
  ];

  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  const activeResult = sampleQueries[activeQueryIndex];

  return (
    <section id="solution" className="section-pad border-y border-border/70 bg-white/55">
      <div className="mos-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Badge variant="sage" icon={Sparkles} className="mb-5">
            AI-Powered Memory Engine
          </Badge>
          <h2 className="editorial-title">
            Ask questions like you're talking to your own brain.
          </h2>
          <p className="editorial-copy mt-5">
            No tags to memorize. No folder structures to maintain. Just type or speak naturally, and MemoryOS retrieves the exact moment in milliseconds.
          </p>
        </div>

        {/* Live Interactive Prompt Demo Card */}
        <div className="mx-auto max-w-5xl">
          <Card hoverEffect={false} className="premium-panel rounded-[2rem] bg-background p-4 sm:p-6 md:p-8">
            {/* Search Input Simulation Bar */}
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-4 shadow-soft">
              <Search className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.8} />
              <input
                type="text"
                readOnly
                aria-label="Current memory search query"
                value={activeResult.query}
                className="w-full cursor-default bg-transparent text-sm font-semibold text-heading focus:outline-none md:text-base"
              />
              <span className="hidden shrink-0 rounded-pill border border-primary-200/80 bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700 sm:inline-block">
                AI Semantic Match
              </span>
            </div>

            {/* Quick Preset Query Buttons */}
            <div className="mt-4 grid gap-2 md:grid-cols-3" role="tablist" aria-label="Sample memory prompts">
              {sampleQueries.map((item, idx) => (
                <button
                  key={item.query}
                  onClick={() => setActiveQueryIndex(idx)}
                  aria-pressed={activeQueryIndex === idx}
                  className={`rounded-2xl border px-3.5 py-3 text-left text-xs font-semibold leading-5 transition-all ${
                    activeQueryIndex === idx
                      ? 'border-heading bg-heading text-white shadow-card'
                      : 'border-border bg-white/70 text-text hover:border-primary-200 hover:bg-white hover:text-heading'
                  }`}
                >
                  {item.query}
                </button>
              ))}
            </div>

            {/* Live Result Cards Display */}
            <div className="mt-7 border-t border-border/70 pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeResult.query}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-3xl border border-border bg-white shadow-card"
                >
                  <div className="flex flex-col gap-3 border-b border-border/80 bg-vellum px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary-700">
                      <Sparkles className="h-4 w-4" strokeWidth={1.8} />
                      <span>{activeResult.answer}</span>
                    </div>
                    <span className="font-mono text-xs text-text-muted">
                      Recall Speed: 14ms
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                        Location
                      </span>
                      <p className="text-sm font-semibold leading-6 text-heading">
                        {activeResult.location}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                        Date & Time
                      </span>
                      <p className="text-sm font-semibold leading-6 text-heading">
                        {activeResult.date}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                        People Linked
                      </span>
                      <p className="text-sm font-semibold leading-6 text-heading">
                        {activeResult.people}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 border-t border-border/70 px-5 py-4">
                    <Tag className="h-3.5 w-3.5 text-text-muted" />
                    {activeResult.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-pill border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-text"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
