import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Utensils,
  Car,
  Baby,
  Volume2,
  Coffee,
  Sparkles,
  Camera,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function LifeHappensFast() {
  const moments = [
    {
      title: 'First Day of College',
      subtitle: 'August 2021 • Campus Quad',
      description:
        'The nervous laughter, unpacking boxes, and meeting room 402.',
      icon: GraduationCap,
      color: 'bg-status-warning/10 text-status-warning',
    },
    {
      title: 'Voice Note from Dad',
      subtitle: 'March 14 • 1m 42s',
      description: '"Just calling to check in... remember to take a breath."',
      icon: Volume2,
      color: 'bg-ai-50 text-ai-600',
    },
    {
      title: 'Late Night Family Dinner',
      subtitle: 'December 24 • Home',
      description: 'Grandma’s recipe, clanking glasses, and stories told twice.',
      icon: Utensils,
      color: 'bg-status-error/10 text-status-error',
    },
    {
      title: 'Coastal Road Trip',
      subtitle: 'Pacific Coast Hwy • Sunset',
      description: 'Windows down, sea breeze, and a playlist you still keep.',
      icon: Car,
      color: 'bg-primary-50 text-primary-700',
    },
    {
      title: 'Child’s First Steps',
      subtitle: 'Living Room • 10:14 AM',
      description: 'Three wobbly steps toward the couch, followed by applause.',
      icon: Baby,
      color: 'bg-status-warning/10 text-status-warning',
    },
    {
      title: 'Coffee with an Old Friend',
      subtitle: 'Corner Cafe • 2 Hours',
      description:
        'Picking up right where you left off, like no time had passed.',
      icon: Coffee,
      color: 'bg-primary-50 text-primary-700',
    },
  ];

  return (
    <section className="section-pad border-y border-border/70 bg-white/55">
      <div className="mos-container">
        {/* Section Header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Badge variant="sage" icon={Sparkles} className="mb-5">
              Life Happens Fast
            </Badge>
            <h2 className="editorial-title">
              Moments you never want to lose.
            </h2>
          </div>
          <p className="editorial-copy max-w-2xl lg:justify-self-end">
            Life isn't measured in gigabytes or camera rolls. It's measured in
            conversations, places, laughter, and the people who matter most.
          </p>
        </div>

        {/* Visual Memory Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {moments.map((item, index) => {
            const Icon = item.icon;
            const featured = index === 0 || index === 3;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={featured ? 'lg:row-span-2' : ''}
              >
                <Card
                  className={`group flex h-full flex-col justify-between rounded-3xl ${
                    featured
                      ? 'min-h-[20rem] bg-vellum p-7 md:p-8'
                      : 'min-h-[14rem] bg-white/75 p-6'
                  }`}
                >
                  <div>
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className={`rounded-2xl p-3 ${item.color}`}>
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <span className="max-w-[10rem] text-right text-xs font-semibold leading-5 text-text-muted">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-extrabold leading-tight text-heading transition-colors group-hover:text-primary-700">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-border/70 pt-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Camera className="h-3.5 w-3.5 text-primary" />
                      Preserved in MemoryOS
                    </span>
                    <span className="font-semibold text-primary-700 opacity-0 transition-opacity group-hover:opacity-100">
                      Preserved forever
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
