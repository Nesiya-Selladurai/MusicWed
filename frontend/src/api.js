import axios from 'axios';

// Use this for client-side API calls.
// In production, the frontend is served from the same origin, so we default to "" and rely on the Ingress routing.
// For local development, Vite proxy (configured in vite.config.js) will forward /api to http://localhost:5000.
export const API_BASE = import.meta.env.VITE_API_URL || '';

export const api = axios.create({
  baseURL: API_BASE,
});
