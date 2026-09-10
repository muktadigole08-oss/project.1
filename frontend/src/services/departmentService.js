import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const departmentService = {
  async getAllDepartments() {
    const response = await apiClient.get(ENDPOINTS.DEPARTMENTS.LIST);
    return response.data.data;
  },

  async getDepartmentById(id) {
    const response = await apiClient.get(ENDPOINTS.DEPARTMENTS.DETAIL(id));
    return response.data.data;
  },

  async getDepartmentByCode(code) {
    const response = await apiClient.get(ENDPOINTS.DEPARTMENTS.BY_CODE(code));
    return response.data.data;
  },
};

export default departmentService;
