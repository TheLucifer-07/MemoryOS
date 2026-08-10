import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { memoryosApi } from '../services/apiClient';
import { signInWithPassword, signOut, signUpWithPassword } from '../services/supabaseAuth';

const AuthContext = createContext(null);

const STORAGE_KEY = 'memoryos_session';

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);
  const [user, setUser] = useState(() => loadSession()?.user || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const persistSession = useCallback((nextSession) => {
    if (!nextSession) {
      localStorage.removeItem(STORAGE_KEY);
      setSession(null);
      setUser(null);
      return;
    }

    const authUser = nextSession.user || {};
    const fullName = authUser.user_metadata?.full_name || authUser.user_metadata?.name;
    const userData = {
      id: authUser.id,
      email: authUser.email,
      name: fullName || authUser.email?.split('@')[0] || 'You',
      onboarded: true,
    };

    const stored = {
      accessToken: nextSession.access_token,
      refreshToken: nextSession.refresh_token,
      expiresAt: nextSession.expires_at,
      user: userData,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    setSession(stored);
    setUser(userData);
    return stored;
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function hydrateBackendProfile() {
      if (!session?.accessToken) return;
      try {
        const profile = await memoryosApi.profile(session.accessToken);
        if (cancelled) return;
        setUser((prev) => {
          const updated = {
            ...prev,
            name: profile.displayName || prev?.name,
            profile,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...session, user: updated }));
          return updated;
        });
      } catch {
        // Keep the Supabase session; the backend may simply be offline during local frontend work.
      }
    }
    hydrateBackendProfile();
    return () => {
      cancelled = true;
    };
  }, [session?.accessToken]);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      if (!email || !password) throw new Error('Please fill in all fields.');
      const authSession = await signInWithPassword({ email, password });
      persistSession(authSession);
      await memoryosApi.me(authSession.access_token);
      return { ok: true };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [persistSession]);

  const signup = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      if (!name || !email || !password) throw new Error('Please fill in all fields.');
      if (password.length < 8) throw new Error('Password must be at least 8 characters.');
      const authSession = await signUpWithPassword({ name, email, password });
      if (!authSession.access_token) {
        throw new Error('Check your email to confirm your account, then log in.');
      }
      persistSession(authSession);
      await memoryosApi.updateProfile(authSession.access_token, { displayName: name });
      return { ok: true };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [persistSession]);

  const completeOnboarding = useCallback(async (updates) => {
    if (session?.accessToken && updates?.name) {
      await memoryosApi.updateProfile(session.accessToken, { displayName: updates.name });
    }
    setUser((prev) => {
      const updated = { ...prev, ...updates, onboarded: true };
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...session, user: updated }));
      return updated;
    });
  }, [session]);

  const logout = useCallback(async () => {
    const token = session?.accessToken;
    persistSession(null);
    setError(null);
    try {
      await signOut(token);
    } catch {
      // Local logout should succeed even if Supabase is unreachable.
    }
  }, [persistSession, session?.accessToken]);

  return (
    <AuthContext.Provider value={{ user, token: session?.accessToken, loading, error, login, signup, completeOnboarding, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
