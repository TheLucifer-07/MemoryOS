const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function requireSupabaseConfig() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.');
  }
}

async function supabaseRequest(path, options = {}) {
  requireSupabaseConfig();
  const response = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error_description || data.msg || data.message || 'Authentication failed.');
  }
  return data;
}

export async function signInWithPassword({ email, password }) {
  return supabaseRequest('/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signUpWithPassword({ name, email, password }) {
  return supabaseRequest('/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      data: { full_name: name, name },
    }),
  });
}

export async function signOut(accessToken) {
  if (!accessToken) return;
  await supabaseRequest('/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
