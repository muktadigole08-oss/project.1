import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const doctorService = {
  async getAllDoctors(departmentId = null) {
    const params = departmentId ? { departmentId } : {};
    const response = await apiClient.get(ENDPOINTS.DOCTORS.LIST, { params });
    return response.data.data;
  },

  async getDoctorById(id) {
    const response = await apiClient.get(ENDPOINTS.DOCTORS.DETAIL(id));
    return response.data.data;
  },
};

export default doctorService;
