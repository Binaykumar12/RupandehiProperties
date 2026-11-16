// Base API client for Rupandehi Property Hub
// Supports live Supabase/REST backend with graceful local persistence fallback

const BASE_URL = import.meta.env?.VITE_API_URL || '/api';

export async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = localStorage.getItem('rph_auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // If backend endpoint is unavailable, let the calling service utilize its fallback
    throw error;
  }
}
