// ================================================================
// DevTrack — Frontend configuration.
// Centralized API configuration.
//
// - During local development, the frontend connects to the local
//   backend running on http://localhost:3000/api.
//
// - In production, the frontend connects to the deployed Railway backend.
//
// The application automatically switches between local and
// production environments based on the current hostname.
// ================================================================

const LOCAL_API_URL = 'http://localhost:3000/api';

const PRODUCTION_API_URL = 'https://devtrack-production-e1d0.up.railway.app/api';

const isLocalhost =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1';

export const API_BASE_URL = isLocalhost
  ? LOCAL_API_URL
  : PRODUCTION_API_URL;

export const TOKEN_KEY = 'devtrack_token';