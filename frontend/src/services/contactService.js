import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const contactService = {
  async submitMessage(messageData) {
    const response = await apiClient.post(ENDPOINTS.CONTACT.SUBMIT, messageData);
    return response.data;
  },
};

export default contactService;
