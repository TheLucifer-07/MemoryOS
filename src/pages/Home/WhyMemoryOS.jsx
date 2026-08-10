import React from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2, XCircle } from 'lucide-react';
import Badge from '../../components/ui/Badge';

export default function WhyMemoryOS() {
  const comparisons = [
    {
      aspect: 'Core Purpose',
      traditional: 'Store raw files, photos & notes in isolated silos',
      memoryos: 'Understands lived experiences and links them organically',
    },
    {
      aspect: 'Organization Model',
      traditional: 'Manual folders, static tags, and nested trees',
      memoryos: 'Automatic AI memory graph connecting people, places & time',
    },
    {
      aspect: 'Search Capability',
      traditional: 'Exact filename matching ("IMG_4021.jpg")',
      memoryos: 'Natural language semantic recall ("Where did I meet Maya?")',
    },
    {
      aspect: 'Privacy Architecture',
      traditional: 'Cloud servers mining your personal photos for ads',
      memoryos: 'Zero-knowledge client encryption & local storage vaults',
    },
  ];

  return (
    <section id="why-memoryos" className="section-pad bg-background">
      <div className="mos-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Badge variant="sage" icon={Layers} className="mb-5">
            Why an "Operating System"?
          </Badge>
          <h2 className="editorial-title">
            Not another app. An Operating System for your life.
          </h2>
          <p className="editorial-copy mt-5">
            Traditional applications isolate your notes, photos, and voice memos into separate silos. MemoryOS acts as the connective fabric that unifies every dimension of your lived memory.
          </p>
        </div>

        {/* Comparison Table Grid */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border/80 bg-white/80 shadow-journal backdrop-blur">
          <div className="hidden grid-cols-12 border-b border-border/80 bg-vellum px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted md:grid">
            <span className="col-span-3">Dimension</span>
            <span className="col-span-4">Traditional apps</span>
            <span className="col-span-5">MemoryOS</span>
          </div>
          {comparisons.map((item, idx) => (
            <motion.div
              key={item.aspect}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div className="border-b border-border/70 px-5 py-5 last:border-b-0 md:px-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary-700">
                      {item.aspect}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm leading-6 text-text md:col-span-4">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-status-error" strokeWidth={1.8} />
                    <span>{item.traditional}</span>
                  </div>

                  <div className="flex items-start gap-2 rounded-2xl border border-primary-200/80 bg-primary-50/70 p-3.5 text-sm font-semibold leading-6 text-heading md:col-span-5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
                    <span>{item.memoryos}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
