export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

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
