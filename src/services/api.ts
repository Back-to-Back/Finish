import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api` || "https://finish-jh38.onrender.com/api";

export const register = async (username: string, email: string, password: string, role: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { username, email, password, role },
      { headers: { "Content-Type": "application/json" } } // Added headers here
    );
    return response?.data || {};
  } catch (error) {
    console.error('Registration Error:', error.response?.data || error.message);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return response?.data || {};
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    throw error;
  }
};

export const createPayment = async (userId: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/payments/create`,
      { userId },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error('Payment Creation Error:', error.response?.data || error.message);
    throw error;
  }
};
