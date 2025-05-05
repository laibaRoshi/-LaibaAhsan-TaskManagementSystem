
import api from './api';
import { LoginCredentials, User } from '../lib/types';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    // Store the token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    
    return response.data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (data: RegisterData): Promise<any> => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;
    
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.role === 'admin';
};
