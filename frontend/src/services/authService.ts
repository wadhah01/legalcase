import api from './api';
import { LoginCredentials, User } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/user');
    return response.data;
  }
};