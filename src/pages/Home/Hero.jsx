import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Play,
  MapPin,
  Mic,
  Search,
  Calendar,
  Heart,
  ShieldCheck,
  Images,
  Users,
  FolderHeart,
  Brain,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function Hero() {
  const sampleMemories = [
    {
      id: 1,
      title: 'Kyoto temple garden walk',
      location: 'Kyoto, Japan',
      date: 'Jul 18, 2026',
      tag: 'Maya linked',
      icon: MapPin,
      color: 'bg-primary-50 text-primary-700 border-primary-100',
    },
    {
      id: 2,
      title: 'Dad called about the house',
      location: 'Voice note, 2m 14s',
      date: 'May 12, 2026',
      tag: 'Transcript ready',
      icon: Mic,
      color: 'bg-secondary-50 text-secondary-600 border-secondary-100',
    },
    {
      id: 3,
      title: 'Ocean road trip playlist',
      location: 'Big Sur, California',
      date: 'Sep 4, 2025',
      tag: '12 photos',
      icon: Heart,
      color: 'bg-highlight-50 text-highlight-500 border-highlight-100',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background pt-32 sm:pt-36 lg:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-highlight-100/35 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-secondary-100/40 blur-3xl" />

      <div className="mos-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Badge variant="sage" icon={Sparkles}>
                The Operating System for Human Memory
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mt-7 max-w-3xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-heading sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Your life,
              <span className="block text-primary">remembered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="mt-7 max-w-xl text-lg leading-8 text-text sm:text-xl"
            >
              MemoryOS automatically captures, organizes, and connects your
              life's conversations, places, and moments using private AI. Relive
              any moment instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                onClick={() => (window.location.href = '#get-started')}
              >
                Start Your Memory Stream
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={Play}
                iconPosition="left"
                onClick={() => (window.location.href = '#showcase')}
              >
                Watch 2-Min Experience
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.34 }}
              className="mt-10 grid max-w-lg grid-cols-3 gap-3 border-t border-border/80 pt-6"
            >
              {[
                ['14ms', 'natural recall'],
                ['256-bit', 'private vault'],
                ['0 tags', 'manual work'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-xl font-extrabold text-heading">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] border border-white/60 bg-white/30 shadow-glow backdrop-blur-sm" />
            <div className="premium-panel relative overflow-hidden rounded-[1.65rem] p-3 sm:p-4">
              <div className="rounded-[1.35rem] border border-border/80 bg-vellum shadow-inset">
                <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-status-error/75" />
                    <span className="h-2.5 w-2.5 rounded-full bg-status-warning/75" />
                    <span className="h-2.5 w-2.5 rounded-full bg-status-success/75" />
                  </div>
                  <div className="hidden items-center gap-2 rounded-pill border border-border/80 bg-white/75 px-3 py-1.5 text-[11px] font-medium text-text sm:flex">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Local encrypted vault
                  </div>
                </div>

                <div className="grid min-h-[34rem] grid-cols-1 lg:grid-cols-[12rem_1fr]">
                  <aside className="hidden border-r border-border/70 bg-white/45 p-4 lg:block">
                    <div className="mb-6 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-heading text-white">
                        <Sparkles className="h-4 w-4" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold text-heading">
                          MemoryOS
                        </p>
                        <p className="text-[11px] text-text-muted">Vault 2026</p>
                      </div>
                    </div>

                    {[
                      [Calendar, 'Timeline'],
                      [MapPin, 'Places'],
                      [Users, 'People'],
                      [FolderHeart, 'Collections'],
                    ].map(([Icon, label], index) => (
                      <div
                        key={label}
                        className={`mb-1.5 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${
                          index === 0
                            ? 'bg-heading text-white shadow-soft'
                            : 'text-text hover:bg-white'
                        }`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                        {label}
                      </div>
                    ))}
                  </aside>

                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-700">
                          Today in your memory stream
                        </p>
                        <h2 className="mt-1 font-display text-2xl font-extrabold text-heading">
                          August 7
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 rounded-2xl border border-border bg-white px-3.5 py-3 shadow-soft">
                        <Search className="h-4 w-4 text-primary" strokeWidth={1.9} />
                        <span className="text-xs font-medium text-text">
                          Ask: "where was that garden?"
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_15rem]">
                      <div className="space-y-3">
                        {sampleMemories.map((mem, index) => {
                          const Icon = mem.icon;
                          return (
                            <motion.div
                              key={mem.id}
                              animate={{ y: index === 1 ? [0, -4, 0] : 0 }}
                              transition={{
                                duration: 4.8,
                                repeat: index === 1 ? Infinity : 0,
                                ease: 'easeInOut',
                              }}
                              className="group rounded-2xl border border-border/80 bg-white/80 p-3.5 shadow-soft transition-all hover:border-primary-200 hover:shadow-card sm:p-4"
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`rounded-2xl border p-2.5 ${mem.color}`}
                                >
                                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <h3 className="truncate font-display text-sm font-bold text-heading">
                                      {mem.title}
                                    </h3>
                                    <span className="text-[11px] font-medium text-text-muted">
                                      {mem.date}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs text-text">
                                    {mem.location}
                                  </p>
                                  <div className="mt-3 flex items-center justify-between">
                                    <span className="rounded-pill border border-border/70 bg-background px-2.5 py-1 text-[11px] font-semibold text-text">
                                      {mem.tag}
                                    </span>
                                    <span className="text-[11px] font-semibold text-primary-700 opacity-0 transition-opacity group-hover:opacity-100">
                                      Open memory
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        <div className="rounded-2xl border border-border/80 bg-white/75 p-4 shadow-soft">
                          <div className="mb-4 flex items-center justify-between">
                            <span className="text-xs font-bold text-heading">
                              Memory Map
                            </span>
                            <MapPin className="h-4 w-4 text-secondary-600" />
                          </div>
                          <div className="relative h-36 overflow-hidden rounded-2xl bg-secondary-50">
                            <div className="absolute left-6 top-8 h-16 w-24 rounded-full border border-secondary-200 bg-white/50" />
                            <div className="absolute right-5 top-5 h-20 w-20 rounded-full border border-primary-200 bg-white/50" />
                            <div className="absolute bottom-5 left-12 h-2.5 w-2.5 rounded-full bg-primary shadow-glow" />
                            <div className="absolute right-12 top-14 h-2.5 w-2.5 rounded-full bg-secondary shadow-card" />
                            <div className="absolute bottom-8 right-8 h-2.5 w-2.5 rounded-full bg-status-warning shadow-card" />
                          </div>
                        </div>

                        <div className="rounded-2xl border border-border/80 bg-heading p-4 text-white shadow-card">
                          <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                            <Brain className="h-4 w-4 text-highlight" />
                            AI Memory Graph
                          </div>
                          <p className="mt-3 text-sm leading-6 text-white/90">
                            You visited 4 quiet gardens with Maya this year.
                            Cluster into "Japan 2026"?
                          </p>
                          <div className="mt-4 flex gap-2">
                            <span className="rounded-pill bg-white px-3 py-1 text-[11px] font-bold text-heading">
                              Create
                            </span>
                            <span className="rounded-pill border border-white/20 px-3 py-1 text-[11px] font-bold text-white/80">
                              Later
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-4 top-16 hidden items-center gap-2 rounded-2xl border border-border bg-white/90 px-3.5 py-2.5 text-xs font-semibold text-heading shadow-card backdrop-blur sm:flex"
            >
              <Images className="h-4 w-4 text-primary" strokeWidth={1.8} />
              42 photos linked
            </motion.div>

            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 right-8 hidden items-center gap-2 rounded-2xl border border-border bg-white/90 px-3.5 py-2.5 text-xs font-semibold text-heading shadow-card backdrop-blur md:flex"
            >
              <Mic className="h-4 w-4 text-secondary-600" strokeWidth={1.8} />
              Voice transcribed
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-16 border-t border-border/80 pb-12 pt-6 sm:pb-16 lg:pb-20">
          <div className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>Private by design</span>
            <span>Timeline, map, people, collections</span>
            <span>Built for decades of recall</span>
          </div>
        </div>
      </div>
    </section>
  );
}
