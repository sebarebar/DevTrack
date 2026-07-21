// ================================================================
// DevTrack — frontend configuration.
// Single place to point the SPA at the backend.
// - Local development uses localhost:3000.
// - In production (GitHub Pages), set PRODUCTION_API_URL to the
//   deployed backend on Render, e.g. 'https://devtrack-api.onrender.com/api'.
// ================================================================

const LOCAL_API_URL = 'http://localhost:3000/api';
const PRODUCTION_API_URL = 'https://YOUR-BACKEND.onrender.com/api';

const isLocalhost =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1';

export const API_BASE_URL = isLocalhost ? LOCAL_API_URL : PRODUCTION_API_URL;

export const TOKEN_KEY = 'devtrack_token';
