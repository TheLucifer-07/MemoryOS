import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MemoryLogo from '../../components/memoryos/MemoryLogo';

const INTERESTS = [
  'Family',
  'Friends',
  'Travel',
  'College',
  'Career',
  'Personal milestones',
  'Everything',
];

const variants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();

  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [selected, setSelected] = useState([]);

  function toggleInterest(item) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  function finish() {
    completeOnboarding({ name: displayName || user?.name, interests: selected });
    navigate('/workspace');
  }

  const steps = [
    // Step 0 — Welcome
    <StepWelcome key="welcome" onNext={() => setStep(1)} />,
    // Step 1 — Name
    <StepName
      key="name"
      value={displayName}
      onChange={setDisplayName}
      onNext={() => setStep(2)}
    />,
    // Step 2 — Interests
    <StepInterests
      key="interests"
      selected={selected}
      onToggle={toggleInterest}
      onNext={() => setStep(3)}
    />,
    // Step 3 — Ready
    <StepReady key="ready" name={displayName || user?.name} onEnter={finish} />,
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F2EC] px-4 py-12">
      {/* Logo */}
      <div className="mb-12 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-heading text-white">
          <MemoryLogo size={20} color="white" />
        </div>
        <span className="font-display text-lg font-extrabold tracking-tight text-heading">
          Memory<span className="text-primary">OS</span>
        </span>
      </div>

      {/* Step dots */}
      <div className="mb-10 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? 'w-6 bg-heading' : i < step ? 'w-3 bg-heading/40' : 'w-3 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepWelcome({ onNext }) {
  return (
    <div className="text-center">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-heading">
        Welcome to MemoryOS.
      </h1>
      <p className="mt-4 text-lg leading-8 text-text-muted">
        A place for the moments that make your life yours.
      </p>
      <NextButton onClick={onNext} className="mx-auto mt-10">
        Get started
      </NextButton>
    </div>
  );
}

function StepName({ value, onChange, onNext }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-heading">
        What should we call you?
      </h2>
      <p className="mt-3 text-base text-text-muted">This is how MemoryOS will greet you.</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your name"
        autoFocus
        className="mx-auto mt-8 block w-full max-w-xs rounded-2xl border border-border bg-[#FEFCF8] px-5 py-3.5 text-center text-lg font-semibold text-heading placeholder-text-muted outline-none transition-all focus:border-heading focus:shadow-soft"
      />
      <NextButton onClick={onNext} disabled={!value.trim()} className="mx-auto mt-6">
        Continue
      </NextButton>
    </div>
  );
}

function StepInterests({ selected, onToggle, onNext }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-heading">
        What matters to you?
      </h2>
      <p className="mt-3 text-base text-text-muted">
        We'll shape your MemoryOS around what you care about.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {INTERESTS.map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              className={`flex items-center gap-2 rounded-pill border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                active
                  ? 'border-heading bg-heading text-white shadow-card'
                  : 'border-border bg-[#FEFCF8] text-heading hover:border-heading/40 hover:shadow-soft'
              }`}
            >
              {active && <Check size={13} strokeWidth={2.5} />}
              {item}
            </button>
          );
        })}
      </div>
      <NextButton onClick={onNext} disabled={selected.length === 0} className="mx-auto mt-8">
        Continue
      </NextButton>
    </div>
  );
}

function StepReady({ name, onEnter }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-heading text-white shadow-journal">
        <MemoryLogo size={32} color="white" />
      </div>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-heading">
        Your MemoryOS is ready.
      </h2>
      <p className="mt-3 text-base text-text-muted">
        {name ? `Welcome, ${name}.` : 'Welcome.'} Everything you remember starts here.
      </p>
      <button
        onClick={onEnter}
        className="mx-auto mt-10 flex items-center gap-2 rounded-pill bg-heading px-8 py-3.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-primary-700"
      >
        Enter MemoryOS
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

function NextButton({ children, onClick, disabled, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 rounded-pill bg-heading px-7 py-3 text-sm font-semibold text-white shadow-card transition-all hover:bg-primary-700 disabled:opacity-40 ${className}`}
    >
      {children}
      <ArrowRight size={15} />
    </button>
  );
}
