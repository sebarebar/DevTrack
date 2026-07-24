// ================================================================
// DevTrack — Frontend configuration.
// Centralized API configuration.
// ================================================================

const LOCAL_API_URL = 'http://localhost:3000/api';

const PRODUCTION_API_URL =
  'devtrack-production-107a.up.railway.app';

const isLocalhost =
  location.protocol === 'file:' ||
  location.hostname === 'localhost' ||
  location.hostname === '127.0.0.1';

export const API_BASE_URL = isLocalhost
  ? LOCAL_API_URL
  : PRODUCTION_API_URL;

export const TOKEN_KEY = 'devtrack_token';