import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '11102004',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const API = {
  // Auth
  auth: {
    login: (email: string, password: string) =>
      apiClient.post('/auth/login', { email, password }),
    register: (data: any) =>
      apiClient.post('/auth/register', data),
    logout: () =>
      apiClient.post('/auth/logout'),
  },

  // Donors
  donors: {
    getAll: (params?: any) =>
      apiClient.get('/donors', { params }),
    getById: (id: string) =>
      apiClient.get(`/donors/${id}`),
    create: (data: any) =>
      apiClient.post('/donors', data),
    update: (id: string, data: any) =>
      apiClient.put(`/donors/${id}`, data),
    delete: (id: string) =>
      apiClient.delete(`/donors/${id}`),
    search: (params: any) =>
      apiClient.get('/donors/search', { params }),
  },

  // Blood Inventory
  blood: {
    getAll: (params?: any) =>
      apiClient.get('/blood', { params }),
    getById: (id: string) =>
      apiClient.get(`/blood/${id}`),
    create: (data: any) =>
      apiClient.post('/blood', data),
    update: (id: string, data: any) =>
      apiClient.put(`/blood/${id}`, data),
    delete: (id: string) =>
      apiClient.delete(`/blood/${id}`),
  },

  // Blood Requests
  requests: {
    getAll: (params?: any) =>
      apiClient.get('/requests', { params }),
    getById: (id: string) =>
      apiClient.get(`/requests/${id}`),
    create: (data: any) =>
      apiClient.post('/requests', data),
    update: (id: string, data: any) =>
      apiClient.put(`/requests/${id}`, data),
    delete: (id: string) =>
      apiClient.delete(`/requests/${id}`),
    approve: (requestId: number | string) =>
      apiClient.put(`/requests/${requestId}/approve`),
    reject: (requestId: number | string, reason: string) =>
      apiClient.put(`/requests/${requestId}/reject`, { reason }),
  },

  // Blood Tests
  tests: {
    getAll: (params?: any) =>
      apiClient.get('/tests', { params }),
    getById: (id: string) =>
      apiClient.get(`/tests/${id}`),
    create: (data: any) =>
      apiClient.post('/tests', data),
    update: (id: string, data: any) =>
      apiClient.put(`/tests/${id}`, data),
  },

  // Users
  users: {
    getAll: (params?: any) =>
      apiClient.get('/users', { params }),
    getById: (id: string) =>
      apiClient.get(`/users/${id}`),
    create: (data: any) =>
      apiClient.post('/users', data),
    update: (id: string, data: any) =>
      apiClient.put(`/users/${id}`, data),
    delete: (id: string) =>
      apiClient.delete(`/users/${id}`),
  },

  // Reports
  reports: {
    blood: (params?: any) =>
      apiClient.get('/reports/blood', { params }),
    donations: (params?: any) =>
      apiClient.get('/reports/donations', { params }),
    requests: (params?: any) =>
      apiClient.get('/reports/requests', { params }),
    donors: (params?: any) =>
      apiClient.get('/reports/donors', { params }),
    trends: (params?: any) =>
      apiClient.get('/reports/trends', { params }),
  },
};

export default apiClient;
