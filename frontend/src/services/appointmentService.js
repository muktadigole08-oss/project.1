import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const appointmentService = {
  async createAppointment(appointmentData) {
    const response = await apiClient.post(ENDPOINTS.APPOINTMENTS.BOOK, appointmentData);
    return response.data;
  },

  async getMyAppointments() {
    const response = await apiClient.get(ENDPOINTS.APPOINTMENTS.MY);
    return response.data.data;
  },

  async getAppointmentById(id) {
    const response = await apiClient.get(ENDPOINTS.APPOINTMENTS.DETAIL(id));
    return response.data.data;
  },
};

export default appointmentService;
