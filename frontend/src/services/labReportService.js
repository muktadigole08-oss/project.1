import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const labReportService = {
  async getMyLabReports() {
    const response = await apiClient.get(ENDPOINTS.LAB_REPORTS.MY);
    return response.data.data;
  },

  async getReportById(id) {
    const response = await apiClient.get(ENDPOINTS.LAB_REPORTS.DETAIL(id));
    return response.data.data;
  },
};

export default labReportService;
