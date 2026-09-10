// Dynamically resolve and normalize the API Base URL for Render cloud deployment & local dev
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl || envUrl.trim() === '') {
    return '/api';
  }

  let normalized = envUrl.trim().replace(/\/+$/, '');

  // If provided as hostname only (e.g., medicare-hospital-backend.onrender.com), prepend https://
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://') && !normalized.startsWith('/')) {
    normalized = `https://${normalized}`;
  }

  // Ensure /api path prefix is present to match backend Spring Boot @RequestMapping("/api/...")
  if (!normalized.endsWith('/api')) {
    normalized = `${normalized}/api`;
  }

  return normalized;
};

export const API_BASE_URL = getBaseUrl();

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  DEPARTMENTS: {
    LIST: '/departments',
    DETAIL: (id) => `/departments/${id}`,
    BY_CODE: (code) => `/departments/code/${code}`,
  },
  DOCTORS: {
    LIST: '/doctors',
    DETAIL: (id) => `/doctors/${id}`,
  },
  APPOINTMENTS: {
    BOOK: '/appointments',
    MY: '/appointments/my',
    DETAIL: (id) => `/appointments/${id}`,
    UPDATE_STATUS: (id) => `/appointments/${id}/status`,
  },
  LAB_REPORTS: {
    MY: '/lab-reports/my',
    DETAIL: (id) => `/lab-reports/${id}`,
  },
  INSIGHTS: {
    LIST: '/insights',
    DETAIL: (id) => `/insights/${id}`,
  },
  CONTACT: {
    SUBMIT: '/contact',
  },
};
