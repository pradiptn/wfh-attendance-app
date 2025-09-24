import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    api.post('/auth/register', { email, password, name }),
};

export const attendanceAPI = {
  create: (formData: FormData) =>
    api.post('/attendance', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getAll: () => api.get('/attendance'),
};

export default api;
