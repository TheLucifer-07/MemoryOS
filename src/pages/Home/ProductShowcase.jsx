import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  MapPin,
  Users,
  FolderHeart,
  Search,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function ProductShowcase() {
  const experiences = [
    {
      id: 'timeline',
      title: 'Timeline Stream',
      icon: Clock,
      tagline: 'Your life in a continuous chronological memory feed.',
      desc: 'Browse memories as they naturally unfolded. Filter by emotion, season, or location with zero effort.',
      mockupData: {
        heading: 'Timeline Stream • August 2026',
        items: [
          { time: 'Today, 2:15 PM', text: 'Coffee with Sarah at Sightglass', tag: '📍 San Francisco' },
          { time: 'Yesterday, 8:30 PM', text: 'Stargazing at Marin Headlands', tag: '✨ 4 Photos Linked' },
          { time: 'Aug 2, 2026', text: 'Finished reading "Klara and the Sun"', tag: '📚 Book Note' },
        ],
      },
    },
    {
      id: 'map',
      title: 'Memory Map',
      icon: MapPin,
      tagline: 'See everywhere you’ve been and what happened there.',
      desc: 'An interactive world map populated by your memories. Zoom into any coffee shop in Paris or beach in Maui.',
      mockupData: {
        heading: 'Global Memory Map • 142 Pins',
        items: [
          { time: '📍 Shibuya, Tokyo', text: '18 Memories (Ramen, Temples, Arcades)', tag: 'July 2026' },
          { time: '📍 Paris, France', text: '32 Memories (Louvre, Cafe de Flore)', tag: 'May 2025' },
          { time: '📍 Big Sur, California', text: '9 Memories (Camping & Sunset)', tag: 'Sept 2024' },
        ],
      },
    },
    {
      id: 'people',
      title: 'People Graph',
      icon: Users,
      tagline: 'Relive every shared memory with the people you love.',
      desc: 'Click on Maya, Mom, or Alex to see your entire history together — every shared photo, quote, and trip.',
      mockupData: {
        heading: 'People Graph • Connected Relationships',
        items: [
          { time: '👤 Maya Lin', text: '48 Shared Memories • Last seen 2 days ago', tag: 'Best Friend' },
          { time: '👤 Robert (Dad)', text: '112 Shared Memories • 14 Voice Notes', tag: 'Family' },
          { time: '👤 Alex Vance', text: '23 Shared Memories • Project Collaborator', tag: 'Work & Friend' },
        ],
      },
    },
    {
      id: 'collections',
      title: 'Smart Collections',
      icon: FolderHeart,
      tagline: 'Auto-clustered albums created without manual effort.',
      desc: 'MemoryOS automatically groups memories into themes: "Summer Roadtrips", "Favorite Recipes", or "Book Quotes".',
      mockupData: {
        heading: 'Smart Collections • AI Clustered',
        items: [
          { time: '📁 Tokyo 2026 Adventure', text: '42 Photos, 6 Voice Notes, 12 Places', tag: 'Auto-Clustered' },
          { time: '📁 Family Audio Archive', text: '28 Voice Recordings with Transcripts', tag: 'Audio Vault' },
          { time: '📁 Product Design Ideas', text: '19 Sketch Snaps & Audio Brainstorms', tag: 'Work Ideas' },
        ],
      },
    },
    {
      id: 'aisearch',
      title: 'Semantic AI Search',
      icon: Search,
      tagline: 'Instant natural language recall across your entire life.',
      desc: 'Query your memories using conversational language. MemoryOS understands context, time, and emotional nuances.',
      mockupData: {
        heading: 'Semantic Search Engine',
        items: [
          { time: '🔍 "What was the name of the book Dad recommended?"', text: 'Found in voice note from June 12: "The Overstory by Richard Powers"', tag: 'Exact Match' },
          { time: '🔍 "Show moments where I felt super relaxed"', text: 'Retrieved 8 quiet moments near beaches and parks', tag: 'Sentiment Match' },
        ],
      },
    },
  ];

  const [activeTab, setActiveTab] = useState('timeline');
  const currentExp = experiences.find((e) => e.id === activeTab);
  const ActiveIcon = currentExp.icon;

  return (
    <section id="showcase" className="section-pad border-y border-border/70 bg-white/55">
      <div className="mos-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge variant="sage" icon={Sparkles} className="mb-5">
            Interactive Product Showcase
          </Badge>
          <h2 className="editorial-title">
            Explore the MemoryOS Interface.
          </h2>
          <p className="editorial-copy mt-5">
            Five core views engineered to make exploring your past feel as intuitive as browsing today's web.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="mx-auto mb-10 grid max-w-5xl grid-cols-2 gap-2 rounded-[1.75rem] border border-border/80 bg-background/70 p-2 shadow-inset sm:grid-cols-3 lg:grid-cols-5">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            const isActive = activeTab === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                aria-pressed={isActive}
                className={`flex min-h-[3rem] items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-xs font-bold transition-all md:text-sm ${
                  isActive
                    ? 'bg-heading text-white shadow-card'
                    : 'bg-white/60 text-text hover:bg-white hover:text-heading'
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
                <span>{exp.title}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Content Card */}
        <div className="mx-auto max-w-6xl">
          <Card hoverEffect={false} className="premium-panel overflow-hidden rounded-[2rem] bg-background p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentExp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Left Description Pane */}
                <div className="border-b border-border/80 bg-vellum p-6 text-left sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
                  <div className="inline-flex items-center gap-2 rounded-pill border border-primary-200/80 bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                    <ActiveIcon className="h-4 w-4" strokeWidth={1.8} />
                    {currentExp.title}
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight text-heading">
                    {currentExp.tagline}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-text">
                    {currentExp.desc}
                  </p>
                  <div className="mt-8">
                    <span className="inline-flex cursor-pointer items-center text-xs font-bold text-primary-700">
                      Learn how this view works <ChevronRight className="ml-0.5 h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Right Interactive Interface Preview */}
                <div className="bg-white p-4 text-left sm:p-6 lg:col-span-8">
                  <div className="rounded-[1.5rem] border border-border/80 bg-background p-3 shadow-inset">
                    <div className="rounded-[1.2rem] border border-border/80 bg-white">
                      <div className="flex flex-col gap-3 border-b border-border/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-mono text-xs font-bold text-heading">
                          {currentExp.mockupData.heading}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-pill border border-status-success/20 bg-status-success/10 px-3 py-1 text-[11px] font-bold text-status-success">
                          <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
                          Synced
                        </span>
                      </div>

                      <div className="grid gap-3 p-4 md:grid-cols-[1fr_13rem]">
                        <div className="space-y-3">
                          {currentExp.mockupData.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border border-border/80 bg-vellum p-4 transition-colors hover:border-primary-200 hover:bg-white"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <span className="block font-mono text-[10px] text-text-muted">
                                    {item.time}
                                  </span>
                                  <p className="mt-1 text-sm font-semibold leading-6 text-heading">
                                    {item.text}
                                  </p>
                                </div>
                                <span className="shrink-0 rounded-pill border border-primary-200/70 bg-primary-50 px-2.5 py-1 text-[10px] font-bold text-primary-700">
                                  {item.tag}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="rounded-2xl border border-border/80 bg-heading p-4 text-white">
                          <div className="mb-4 flex items-center gap-2 text-xs font-bold text-white/80">
                            <Sparkles className="h-4 w-4 text-highlight" />
                            Context
                          </div>
                          <div className="space-y-3">
                            {['People', 'Places', 'Time', 'Mood'].map((label, idx) => (
                              <div key={label}>
                                <div className="mb-1 flex items-center justify-between text-[11px] text-white/65">
                                  <span>{label}</span>
                                  <span>{92 - idx * 11}%</span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${92 - idx * 11}%` }}
                                    transition={{ duration: 0.55, delay: idx * 0.08 }}
                                    className="h-full rounded-full bg-highlight"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </section>
  );
}
