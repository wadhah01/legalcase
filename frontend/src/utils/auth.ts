import { User } from '@/types';

export const getStoredAuth = (): { isAuthenticated: boolean; user: User | null } => {
  const storedAuth = localStorage.getItem('auth');
  if (storedAuth) {
    return JSON.parse(storedAuth);
  }
  return {
    isAuthenticated: false,
    user: null,
  };
};

export const setStoredAuth = (auth: { isAuthenticated: boolean; user: User | null }) => {
  localStorage.setItem('auth', JSON.stringify(auth));
};