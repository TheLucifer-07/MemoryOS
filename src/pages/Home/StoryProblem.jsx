import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Clock, SearchX, Brain, Sparkles } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function StoryProblem() {
  const storySteps = [
    {
      step: '01',
      title: 'You live an incredible moment',
      desc: 'A quiet coffee in Paris, a late-night talk with a friend, a secret scenic view.',
      icon: Clock,
    },
    {
      step: '02',
      title: 'Time passes by',
      desc: 'Photos sit buried in 40,000 unorganized phone screenshots and camera rolls.',
      icon: SearchX,
    },
    {
      step: '03',
      title: 'The detail disappears',
      desc: 'You forget the name of the cafe, who was there, or why that moment mattered.',
      icon: HelpCircle,
    },
  ];

  return (
    <section className="section-pad relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-primary-100/35 blur-3xl" />
      <div className="mos-container relative">
        {/* Section Title */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <Badge variant="sage" icon={Brain} className="mb-5">
            The Human Reality
          </Badge>
          <h2 className="editorial-title">
            Our brains were made to create memories, not to store filenames.
          </h2>
          <p className="editorial-copy mx-auto mt-5 max-w-2xl">
            Every day, precious conversations, ideas, and places slip through our fingers simply because existing tools force us to organize like computers.
          </p>
        </div>

        {/* Narrative Flow Grid */}
        <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-border md:block" />
          {storySteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative"
              >
                <Card className="relative z-10 flex h-full min-h-[17rem] flex-col justify-between rounded-3xl bg-white/80">
                  <div>
                    <div className="mb-7 flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50 font-mono text-xs font-bold text-primary-700">
                        {item.step}
                      </span>
                      <Icon className="h-5 w-5 text-text-muted" strokeWidth={1.8} />
                    </div>

                    <h3 className="mb-3 font-display text-xl font-extrabold leading-tight text-heading">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-text">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 border-t border-border/70 pt-4 text-xs font-medium text-text-muted">
                    <div className="h-2 w-2 rounded-full bg-status-error" />
                    <span>Traditional app limitation</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* The MemoryOS Pivot Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="premium-panel mx-auto mt-10 max-w-4xl rounded-[2rem] p-6 text-center sm:p-9"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-pill bg-heading px-3.5 py-1.5 text-xs font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5" />
            The MemoryOS Difference
          </div>
          <h3 className="font-display text-2xl font-extrabold text-heading sm:text-3xl">
            MemoryOS never forgets.
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-text sm:text-base">
            By connecting voice notes, photos, text, and locations into an organic memory graph, MemoryOS gives you instant recall whenever you need it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
