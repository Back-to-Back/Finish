import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (username: string, email: string, password: string, role: string) => {
  return axios.post(`${API_URL}/auth/register`, { username, email, password, role });
};

export const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const createPayment = (userId: string) => {
  return axios.post(`${API_URL}/payments/create`, { userId });
};
