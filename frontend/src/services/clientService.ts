import api from './api';
import { Client } from '../types';

export const clientService = {
  async getAllClients(): Promise<Client[]> {
    const response = await api.get('/clients');
    return response.data;
  },

  async getClientById(id: string): Promise<Client> {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  async createClient(clientData: Omit<Client, 'id'>): Promise<Client> {
    const response = await api.post('/clients', clientData);
    return response.data;
  },

  async updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
  },

  async deleteClient(id: string): Promise<void> {
    await api.delete(`/clients/${id}`);
  },

  async searchClients(query: string): Promise<Client[]> {
    const response = await api.get(`/clients/search?query=${encodeURIComponent(query)}`);
    return response.data;
  }
};