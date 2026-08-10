import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'memoryos_user';

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network latency — replace with real API call
      await new Promise((r) => setTimeout(r, 900));
      if (!email || !password) throw new Error('Please fill in all fields.');
      // Stub: accept any valid-looking credentials
      const userData = { email, name: email.split('@')[0], onboarded: true };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      return { ok: true };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 900));
      if (!name || !email || !password) throw new Error('Please fill in all fields.');
      if (password.length < 8) throw new Error('Password must be at least 8 characters.');
      const userData = { email, name, onboarded: false };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      return { ok: true };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const completeOnboarding = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates, onboarded: true };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, completeOnboarding, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
