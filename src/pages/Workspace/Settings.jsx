import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Lock } from 'lucide-react';

function StubPage({ icon: Icon, title, description }) {
  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading">{title}</h1>
        <p className="mt-1.5 text-sm text-text-muted">{description}</p>
      </motion.div>
      <div className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-border bg-[#FEFCF8]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F2EC] text-text-muted">
            <Icon size={20} strokeWidth={1.6} />
          </div>
          <p className="text-sm font-semibold text-heading">{title} settings</p>
          <p className="mt-1 text-xs text-text-muted">Coming soon.</p>
        </div>
      </div>
    </div>
  );
}

export function SettingsPage() {
  return <StubPage icon={Settings} title="Settings" description="Manage your MemoryOS preferences." />;
}

export function PrivacyPage() {
  return <StubPage icon={Shield} title="Privacy" description="Your memories are private by design. Control who sees what." />;
}

export function SecurityPage() {
  return <StubPage icon={Lock} title="Security" description="Keep your vault secure." />;
}
