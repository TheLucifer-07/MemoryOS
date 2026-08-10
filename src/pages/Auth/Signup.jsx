import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function strengthLabel(pw) {
  if (!pw) return null;
  if (pw.length < 6) return { label: 'Too short', color: 'bg-status-error', width: 'w-1/4' };
  if (pw.length < 8) return { label: 'Weak', color: 'bg-status-warning', width: 'w-2/4' };
  if (pw.length < 12 || !/[^a-zA-Z0-9]/.test(pw)) return { label: 'Good', color: 'bg-secondary', width: 'w-3/4' };
  return { label: 'Strong', color: 'bg-status-success', width: 'w-full' };
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const strength = strengthLabel(form.password);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    const result = await signup(form);
    if (result.ok) navigate('/onboarding');
    else setServerError(result.error || 'Something went wrong. Please try again.');
  }

  function handleChange(field) {
    return (e) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
    };
  }

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading">
            Start remembering.
          </h1>
          <p className="mt-2 text-base text-text-muted">
            Create your private space for the moments that matter.
          </p>
        </div>

        {serverError && (
          <div className="mb-5 rounded-2xl border border-status-error/30 bg-status-error/8 px-4 py-3 text-sm text-status-error">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Field
            label="Full name"
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            error={errors.name}
            autoComplete="name"
            placeholder="Your name"
          />
          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
            autoComplete="email"
            placeholder="you@example.com"
          />
          <div>
            <Field
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-text-muted transition-colors hover:text-heading"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            {strength && (
              <div className="mt-2">
                <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                  <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                </div>
                <p className="mt-1 text-xs text-text-muted">{strength.label}</p>
              </div>
            )}
          </div>

          <SubmitButton loading={loading}>Create my MemoryOS</SubmitButton>
        </form>

        <Divider />

        <GoogleButton />

        <p className="mt-6 text-center text-xs text-text-muted">
          By signing up you agree to our{' '}
          <a href="#" className="underline underline-offset-2 hover:text-heading">Terms</a>{' '}
          and{' '}
          <a href="#" className="underline underline-offset-2 hover:text-heading">Privacy Policy</a>.
        </p>

        <p className="mt-4 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold text-heading underline-offset-2 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

function Field({ label, type, value, onChange, error, autoComplete, placeholder, suffix }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-heading">{label}</label>
      <div
        className={`flex items-center rounded-2xl border bg-[#FEFCF8] px-4 py-3 transition-all focus-within:border-heading focus-within:shadow-soft ${
          error ? 'border-status-error' : 'border-border'
        }`}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-heading placeholder-text-muted outline-none"
        />
        {suffix && <span className="ml-2 flex-shrink-0">{suffix}</span>}
      </div>
      {error && <p className="mt-1.5 text-xs text-status-error">{error}</p>}
    </div>
  );
}

function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-pill bg-heading py-3 text-sm font-semibold text-white shadow-card transition-all hover:bg-primary-700 disabled:opacity-60"
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        <>
          {children}
          <ArrowRight size={15} />
        </>
      )}
    </button>
  );
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-medium text-text-muted">or</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function GoogleButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-[#FEFCF8] py-3 text-sm font-semibold text-heading shadow-soft transition-all hover:border-border-hover hover:shadow-card"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}
