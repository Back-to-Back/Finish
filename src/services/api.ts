import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://finish-jh38.onrender.com/api";

export const register = async (username: string, email: string, password: string, role: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password, role });
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error);
    throw error; // Allow calling function to handle error
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const createPayment = async (userId: string) => {
  try {
    const response = await axios.post(`${API_URL}/payments/create`, { userId });
    return response.data;
  } catch (error) {
    console.error('Payment Creation Error:', error);
    throw error;
  }
};
