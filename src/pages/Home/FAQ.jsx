import React from 'react';
import { HelpCircle } from 'lucide-react';
import Accordion from '../../components/ui/Accordion';
import Badge from '../../components/ui/Badge';

export default function FAQ() {
  const faqs = [
    {
      question: 'How does MemoryOS capture my memories without manual effort?',
      answer:
        'MemoryOS connects to your voice recorder, photos, calendar, and text notes. Using lightweight background AI, it extracts locations, dates, key entities, and sentiment automatically so you never have to tag files manually.',
    },
    {
      question: 'Is my personal data encrypted and secure?',
      answer:
        'Yes. MemoryOS employs client-side AES-256 zero-knowledge encryption. Your memory vaults are encrypted before they leave your device. We cannot read your memories, nor do we ever sell or use your data to train public AI models.',
    },
    {
      question: 'Can I import existing photo libraries and notes?',
      answer:
        'Absolutely. MemoryOS supports 1-click import from Apple Photos, Google Photos, Notion, Markdown files, Apple Voice Memos, and standard audio/video files.',
    },
    {
      question: 'Does MemoryOS work offline?',
      answer:
        'Yes! In Local Vault mode, MemoryOS runs entirely on your local machine using lightweight local models. Your memories remain fully searchable even without an internet connection.',
    },
    {
      question:
        'How is MemoryOS different from Notion, Apple Photos, or Evernote?',
      answer:
        'Traditional apps store separate files in isolated folders. MemoryOS is an Operating System — it builds an organic semantic memory graph connecting voice, text, photos, people, and locations into a unified timeline.',
    },
    {
      question: 'What happens if I want to export my data?',
      answer:
        'You retain full data ownership. You can export your complete memory archive at any time in standard formats (JSON, Markdown, and original raw media) with zero lock-in.',
    },
  ];

  return (
    <section id="faq" className="section-pad bg-background">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Badge variant="sage" icon={HelpCircle} className="mb-5">
            Frequently Asked Questions
          </Badge>
          <h2 className="editorial-title">
            Everything you need to know.
          </h2>
          <p className="editorial-copy mt-5">
            Have questions about privacy, indexing, or offline support? We've
            got answers.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="premium-panel rounded-[2rem] p-5 md:p-8">
          {faqs.map((faq, idx) => (
            <Accordion
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
