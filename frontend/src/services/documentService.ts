import api from './api';
import { Document } from '../types';

export const documentService = {
  async uploadDocument(clientId: string, caseId: string, file: File): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(
      `/clients/${clientId}/cases/${caseId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async uploadScannedDocument(clientId: string, caseId: string, scannedImage: Blob): Promise<Document> {
    const formData = new FormData();
    formData.append('file', scannedImage, 'scanned-document.jpg');

    const response = await api.post(
      `/clients/${clientId}/cases/${caseId}/documents/scan`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async getDocuments(clientId: string, caseId: string): Promise<Document[]> {
    const response = await api.get(`/clients/${clientId}/cases/${caseId}/documents`);
    return response.data;
  },

  async deleteDocument(clientId: string, caseId: string, documentId: string): Promise<void> {
    await api.delete(`/clients/${clientId}/cases/${caseId}/documents/${documentId}`);
  }
};