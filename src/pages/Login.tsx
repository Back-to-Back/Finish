import React, { useState } from 'react';
import { login } from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call login API
      const response = await login(email, password);
  
      // Store token, userId, role, and isPaid in localStorage (if needed)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('role', response.data.role);
  
      // Redirect based on role and payment status
      if (response.data.role === 'member') {
        if (response.data.isPaid) {
          window.location.href = '/dashboard'; // Only go to dashboard if paid
        } else {
          window.location.href = '/payment'; // Otherwise, send back to payment/registration
        }
      } else if (response.data.role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (err: any) {
      alert(err.response?.data || err.message);
    }
  };

  return (
    <div className="w-full ml-[270px] mt-24 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your unique password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                     text-sm font-medium rounded-md text-white bg-indigo-600 
                     hover:bg-indigo-700 focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
