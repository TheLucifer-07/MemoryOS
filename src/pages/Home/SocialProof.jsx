import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function SocialProof() {
  const testimonials = [
    {
      quote:
        'MemoryOS feels like having a second brain that never sleeps. I found an audio note from 2 years ago in under 3 seconds.',
      author: 'Elena Rostova',
      role: 'Design Director & Early Tester',
      avatar: 'ER',
    },
    {
      quote:
        'As someone who travels constantly, MemoryOS map stream is the single best way I have found to preserve where I have been.',
      author: 'Marcus Vance',
      role: 'Photographer & Creator',
      avatar: 'MV',
    },
    {
      quote:
        'The zero-knowledge encryption gave me the confidence to store my personal journals and voice notes without fear.',
      author: 'Sarah Chen',
      role: 'Privacy Researcher',
      avatar: 'SC',
    },
  ];

  const stats = [
    { label: 'Memories Preserved', value: '1.2M+' },
    { label: 'Recall Latency', value: '< 15ms' },
    { label: 'Private Memory Vaults', value: '14,000+' },
    { label: 'Data Encryption', value: '256-Bit' },
  ];

  return (
    <section
      id="social-proof"
      className="section-pad border-y border-border/70 bg-white/55"
    >
      <div className="mos-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Badge variant="sage" icon={Users} className="mb-5">
            Early Adopter Community
          </Badge>
          <h2 className="editorial-title">
            Trusted by creators, thinkers, and explorers.
          </h2>
          <p className="editorial-copy mt-5">
            See how early community members are using MemoryOS to archive their
            personal lives.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mx-auto mb-14 grid max-w-5xl grid-cols-2 overflow-hidden rounded-[2rem] border border-border/80 bg-white/80 shadow-journal backdrop-blur md:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="border-b border-r border-border/70 p-6 text-center last:border-r-0 md:border-b-0"
            >
              <span className="block font-display text-3xl font-extrabold text-heading md:text-4xl">
                {stat.value}
              </span>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Grid Placeholder */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="flex h-full min-h-[18rem] flex-col justify-between rounded-3xl border-border/80 bg-background/80">
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <Quote className="h-6 w-6 text-primary-300" strokeWidth={1.8} />
                    <div className="flex items-center gap-1 text-warning">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-warning" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm italic leading-7 text-text">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-heading font-display text-xs font-bold text-white shadow-soft">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-extrabold text-heading">
                      {item.author}
                    </h4>
                    <span className="text-[11px] text-text-muted">
                      {item.role}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
