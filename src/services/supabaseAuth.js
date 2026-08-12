import { requireSupabaseConfig, supabase } from './supabaseClient';

function requireClient() {
  requireSupabaseConfig();
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }
  return supabase;
}

export async function signInWithPassword({ email, password }) {
  const { data, error } = await requireClient().auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data.session;
}

export async function signUpWithPassword({ name, email, password }) {
  const { data, error } = await requireClient().auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        name,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data.session;
}

export async function getCurrentSession() {
  const { data, error } = await requireClient().auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
}

export function onAuthStateChange(callback) {
  return requireClient().auth.onAuthStateChange((_event, session) => callback(session));
}

export async function signOut() {
  const { error } = await requireClient().auth.signOut();
  if (error) throw new Error(error.message);
}
