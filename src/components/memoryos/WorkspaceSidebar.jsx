import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Clock,
  Map,
  Users,
  FolderHeart,
  Search,
  Sparkles,
  Settings,
  Shield,
  Lock,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryLogo from './MemoryLogo';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/workspace', label: 'Home', icon: Home, end: true },
  { to: '/workspace/timeline', label: 'Timeline', icon: Clock },
  { to: '/workspace/map', label: 'Map', icon: Map },
  { to: '/workspace/people', label: 'People', icon: Users },
  { to: '/workspace/collections', label: 'Collections', icon: FolderHeart },
  { to: '/workspace/search', label: 'Search', icon: Search },
  { to: '/workspace/ai', label: 'AI', icon: Sparkles },
];

const PROFILE_MENU = [
  { label: 'Settings', icon: Settings, to: '/workspace/settings' },
  { label: 'Privacy', icon: Shield, to: '/workspace/privacy' },
  { label: 'Security', icon: Lock, to: '/workspace/security' },
];

function NavItem({ to, label, icon: Icon, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-heading text-white shadow-soft'
            : 'text-text hover:bg-white hover:text-heading hover:shadow-soft'
        }`
      }
    >
      <Icon size={16} strokeWidth={1.8} />
      {label}
    </NavLink>
  );
}

function SidebarContent({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/');
  }

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-heading text-white">
            <MemoryLogo size={18} color="white" />
          </div>
          <span className="font-display text-base font-extrabold tracking-tight text-heading">
            Memory<span className="text-primary">OS</span>
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-xl p-1.5 text-text-muted hover:bg-white hover:text-heading lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4" aria-label="Workspace navigation">
        {NAV.map((item) => (
          <NavItem key={item.to} {...item} onClick={onClose} />
        ))}
      </nav>

      {/* Profile area */}
      <div className="border-t border-border/70 px-3 py-3">
        <button
          type="button"
          onClick={() => setProfileOpen((p) => !p)}
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all hover:bg-white"
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 font-display text-xs font-bold text-primary-700">
            {initials}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold text-heading">{user?.name || 'You'}</p>
            <p className="truncate text-xs text-text-muted">{user?.email || ''}</p>
          </div>
          <ChevronDown
            size={14}
            className={`flex-shrink-0 text-text-muted transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-1 space-y-0.5 pb-1">
                {PROFILE_MENU.map(({ label, icon: Icon, to }) => (
                  <NavLink
                    key={label}
                    to={to}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-text transition-colors hover:bg-white hover:text-heading"
                  >
                    <Icon size={13} strokeWidth={1.8} />
                    {label}
                  </NavLink>
                ))}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-status-error transition-colors hover:bg-status-error/8"
                >
                  <LogOut size={13} strokeWidth={1.8} />
                  Log out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function WorkspaceSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border/70 bg-[#FEFCF8] px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-heading text-white">
            <MemoryLogo size={16} color="white" />
          </div>
          <span className="font-display text-base font-extrabold tracking-tight text-heading">
            Memory<span className="text-primary">OS</span>
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-xl border border-border p-2 text-heading"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-56 flex-shrink-0 border-r border-border/70 bg-[#FEFCF8] lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-heading/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border/70 bg-[#FEFCF8] lg:hidden"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
