const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export async function apiRequest(path, { token, method = 'GET', body } = {}) {
  if (!token) throw new Error('You are not signed in.');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || 'MemoryOS API request failed.');
  }
  return data;
}

export const memoryosApi = {
  me: (token) => apiRequest('/auth/me', { token }),
  profile: (token) => apiRequest('/profile', { token }),
  updateProfile: (token, body) => apiRequest('/profile', { token, method: 'PUT', body }),
  memories: (token) => apiRequest('/memories', { token }),
  timeline: (token) => apiRequest('/timeline', { token }),
};
