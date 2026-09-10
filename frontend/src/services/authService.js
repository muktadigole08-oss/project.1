import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const authService = {
  async login(credentials) {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data; // ApiResponse<AuthResponse>
  },

  async register(userData) {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  async getCurrentUser() {
    const response = await apiClient.get(ENDPOINTS.AUTH.ME);
    return response.data;
  },
};

export default authService;
