import api from './api';
import { Case } from '../types';

export const caseService = {
  async getCasesByClientId(clientId: string): Promise<Case[]> {
    const response = await api.get(`/clients/${clientId}/cases`);
    return response.data;
  },

  async getCaseById(clientId: string, caseId: string): Promise<Case> {
    const response = await api.get(`/clients/${clientId}/cases/${caseId}`);
    return response.data;
  },

  async createCase(clientId: string, caseData: Omit<Case, 'id'>): Promise<Case> {
    const response = await api.post(`/clients/${clientId}/cases`, caseData);
    return response.data;
  },

  async updateCase(clientId: string, caseId: string, caseData: Partial<Case>): Promise<Case> {
    const response = await api.put(`/clients/${clientId}/cases/${caseId}`, caseData);
    return response.data;
  },

  async updateCaseStatus(clientId: string, caseId: string, status: 'active' | 'pending' | 'archived'): Promise<Case> {
    const response = await api.patch(`/clients/${clientId}/cases/${caseId}/status`, { status });
    return response.data;
  },

  async deleteCase(clientId: string, caseId: string): Promise<void> {
    await api.delete(`/clients/${clientId}/cases/${caseId}`);
  }
};