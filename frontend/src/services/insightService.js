import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const insightService = {
  async getAllInsights(category = null) {
    const params = category ? { category } : {};
    const response = await apiClient.get(ENDPOINTS.INSIGHTS.LIST, { params });
    return response.data.data;
  },

  async getInsightById(id) {
    const response = await apiClient.get(ENDPOINTS.INSIGHTS.DETAIL(id));
    return response.data.data;
  },
};

export default insightService;
