import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Film, HeartHandshake, Bot, Network, Archive } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function FutureVision() {
  const visionItems = [
    {
      title: 'Life Replay',
      status: 'Vision Concept',
      desc: 'Immersive temporal playback combining photo series, voice notes, and ambient music into cinematic memory recaps.',
      icon: Film,
    },
    {
      title: 'Relationship Intelligence',
      status: 'In Research',
      desc: 'Subtle reminders to reach out to loved ones based on memory gaps and past conversation cadence.',
      icon: HeartHandshake,
    },
    {
      title: 'Personal Memory Companion',
      status: 'In Alpha',
      desc: 'An empathetic local AI that can converse with you about past experiences, lessons, and personal reflections.',
      icon: Bot,
    },
    {
      title: 'Personal Knowledge Graph',
      status: 'Roadmap',
      desc: 'Graph-based visualization mapping how your ideas, places visited, and people met interconnect over decades.',
      icon: Network,
    },
    {
      title: 'Digital Legacy Vault',
      status: 'Future Vision',
      desc: 'Encrypted multi-generational archival allowing you to pass curated memory vaults down to future generations.',
      icon: Archive,
    },
  ];

  return (
    <section id="future" className="section-pad border-y border-border/70 bg-white/55">
      <div className="mos-container">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Badge variant="sage" icon={Compass} className="mb-5">
            Future Horizon
            </Badge>
            <h2 className="editorial-title">
              The Future of Human Memory.
            </h2>
          </div>
          <p className="editorial-copy max-w-2xl lg:justify-self-end">
            We are building a multi-decade foundation for human memory. Here is a glimpse of where MemoryOS is heading.
          </p>
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {visionItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
              >
                <Card className="group flex h-full min-h-[18rem] flex-col justify-between rounded-3xl border-border/80 bg-background/70 p-5 lg:min-h-[24rem]">
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <div className="rounded-2xl bg-primary-50 p-3 text-primary-700">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <span className="rounded-pill border border-border bg-white/70 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-extrabold leading-tight text-heading">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-border/70 pt-4 text-xs font-bold text-primary-700">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
                    <span>Roadmap R&D</span>
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
