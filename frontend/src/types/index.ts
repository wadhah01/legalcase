export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cases: Case[];
}

export interface Case {
  id: string;
  title: string;
  status: 'active' | 'closed' | 'pending';
  clientId: string;
  documents: Document[];
  createdAt: Date;
}

export interface Document {
  id: string;
  title: string;
  caseId: string;
  clientId: string;
  url: string;
  type: string;
  uploadedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}