export const API_CONFIG = {
  BASE_URL: 'http://localhost:1337',
  API_TOKEN: import.meta.env.VITE_STRAPI_API_TOKEN || '',
  ENDPOINTS: {
    WORK_CARDS: '/api/work-cards',
  }
} as const;

export const getApiHeaders = () => ({
  'Authorization': `Bearer ${API_CONFIG.API_TOKEN}`,
  'Content-Type': 'application/json',
});
