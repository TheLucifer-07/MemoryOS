import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, EyeOff, HardDrive, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function SecurityTrust() {
  const securityPillars = [
    {
      title: 'End-to-End Encryption',
      desc: 'All memory cards, audio transcripts, and photos are encrypted client-side using AES-256 before leaving your device.',
      icon: Lock,
    },
    {
      title: 'Zero AI Model Mining',
      desc: 'Your memories are strictly private. We never sell, share, or use your personal vault to train public AI models.',
      icon: EyeOff,
    },
    {
      title: 'Local Vault Storage Mode',
      desc: 'Optionally store your complete memory archive entirely on-device with zero cloud synchronization.',
      icon: HardDrive,
    },
    {
      title: 'Full Export & Data Ownership',
      desc: 'Download your raw memory archive anytime in JSON, Markdown, and original media formats. No lock-in.',
      icon: Download,
    },
  ];

  return (
    <section id="security" className="section-pad relative bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-border/70" />
      <div className="mos-container relative">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Badge variant="sage" icon={ShieldCheck} className="mb-5">
            Zero-Knowledge Security
          </Badge>
          <h2 className="editorial-title">
            Your life’s memories belong to you alone.
          </h2>
          <p className="editorial-copy mt-5">
            Privacy isn’t an added feature in MemoryOS — it is the fundamental architectural constraint around which everything is built.
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {securityPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Card className="flex h-full items-start gap-4 rounded-3xl border-border/80 bg-white/80 p-6 sm:p-8">
                  <div className="shrink-0 rounded-2xl bg-heading p-3 text-white shadow-card">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-heading">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-text">
                      {item.desc}
                    </p>
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
