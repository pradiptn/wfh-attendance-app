import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // API Gateway

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials: any) => api.post('/auth/login', credentials),
};

export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getOne: (id: number) => api.get(`/employees/${id}`),
  create: (data: any) => api.post('/employees', data),
  update: (id: number, data: any) => api.put(`/employees/${id}`, data),
  delete: (id: number) => api.delete(`/employees/${id}`),
};

export const attendanceAPI = {
  getAll: (userId?: number) => api.get('/attendance', { params: { userId } }),
  create: (data: FormData) => api.post('/attendance', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getDashboard: () => api.get('/attendance/dashboard'),
};

export default api;
