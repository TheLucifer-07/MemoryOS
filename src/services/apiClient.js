const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(path, { token, method = 'GET', body } = {}) {
  if (!token) throw new Error('You are not signed in.');
  if (!API_BASE_URL) throw new Error('MemoryOS API URL is not configured.');

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
  memory: (token, id) => apiRequest(`/memories/${id}`, { token }),
  createMemory: (token, body) => apiRequest('/memories', { token, method: 'POST', body }),
  updateMemory: (token, id, body) => apiRequest(`/memories/${id}`, { token, method: 'PUT', body }),
  deleteMemory: (token, id) => apiRequest(`/memories/${id}`, { token, method: 'DELETE' }),
  mapMemories: (token) => apiRequest('/memories/map', { token }),
  timeline: (token) => apiRequest('/timeline', { token }),
  search: (token, query) => apiRequest(`/search?q=${encodeURIComponent(query)}`, { token }),
  mapsConfig: (token) => apiRequest('/locations/maps-config', { token }),
  geocode: (token, locationName) => apiRequest('/locations/geocode', { token, method: 'POST', body: { locationName } }),
  reverseGeocode: (token, latitude, longitude) => apiRequest('/locations/reverse-geocode', {
    token,
    method: 'POST',
    body: { latitude, longitude },
  }),
};
