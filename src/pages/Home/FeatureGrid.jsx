import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Mic,
  Sparkles,
  History,
  Users,
  ShieldCheck,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function FeatureGrid() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Conversational Memory Search',
      outcome: 'Ask anything in plain English',
      description:
        'Query your life like you’re talking to a close friend. MemoryOS understands natural time, location, and emotional context.',
      color: 'bg-primary-50 text-primary-700',
    },
    {
      icon: Mic,
      title: 'Multi-Modal Auto-Capture',
      outcome: 'Speak, snap, or save in 1 click',
      description:
        'Seamlessly combine voice transcripts, high-res photos, text snippets, and location check-ins into unified memory cards.',
      color: 'bg-ai-50 text-ai-600',
    },
    {
      icon: Sparkles,
      title: 'Automatic Clustering AI',
      outcome: 'Zero manual tagging required',
      description:
        'Our background AI automatically categorizes and links memories by person, event, or location without manual work.',
      color: 'bg-status-warning/10 text-status-warning',
    },
    {
      icon: History,
      title: 'Time Machine & On This Day',
      outcome: 'Rediscover forgotten milestones',
      description:
        'Receive quiet, thoughtful notifications rediscovering moments from exactly 1 year ago or custom temporal filters.',
      color: 'bg-primary-50 text-primary-700',
    },
    {
      icon: Users,
      title: 'Relationship Knowledge Graph',
      outcome: 'See your full story with someone',
      description:
        'View every shared memory, quote, trip, and voice note connected to specific individuals in your life over time.',
      color: 'bg-status-error/10 text-status-error',
    },
    {
      icon: ShieldCheck,
      title: 'Zero-Knowledge Privacy Vault',
      outcome: 'Your memories stay strictly yours',
      description:
        'Client-side AES-256 encryption ensures your personal memories are never sold, mined, or used to train public AI models.',
      color: 'bg-primary-50 text-primary-700',
    },
  ];

  return (
    <section id="features" className="section-pad bg-background">
      <div className="mos-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Badge variant="sage" icon={Sparkles} className="mb-5">
            Designed for Human Lives
          </Badge>
          <h2 className="editorial-title">
            Six capabilities engineered for total peace of mind.
          </h2>
          <p className="editorial-copy mt-5">
            Every feature is crafted to remove friction between living your life and preserving it.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Card className="group flex h-full min-h-[18rem] flex-col justify-between rounded-3xl bg-white/75 p-6">
                  <div>
                    <div className="mb-7 flex items-start justify-between gap-4">
                      <div className={`rounded-2xl p-3 ${item.color}`}>
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <span className="rounded-pill border border-border/70 bg-vellum px-2.5 py-1 text-[11px] font-bold text-text-muted">
                        {item.outcome}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-extrabold leading-tight text-heading transition-colors group-hover:text-primary-700">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-border/70 pt-4">
                    <span className="h-1.5 w-12 rounded-full bg-primary-200 transition-all group-hover:w-16 group-hover:bg-primary" />
                    <span className="text-xs font-bold text-primary-700 opacity-0 transition-opacity group-hover:opacity-100">
                      Included
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
