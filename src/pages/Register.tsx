import React, { useState } from 'react';
import { register } from '../services/api';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('guest');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the register API
      const response = await register(username, email, password, role);
      const userId = response?.userId; // Directly access userId
      if (!userId) throw new Error("User ID not returned from server");

      // If role is member, store userId in localStorage and go to /payment
      if (role === 'member') {
        localStorage.setItem('userId', userId);
        window.location.href = '/payment';
      } else {
        window.location.href = '/login';
      } 
    } catch (err: any) {
      alert(err.response?.data || err.message);
    }
  };

  return (
    <div className="w-full mt-24 mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* USERNAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            placeholder="State your Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Set your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Put your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* ROLE SELECT */}
        <div>
          <label className="block text-sm font-medium text-gray-700">State your role please...</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="guest">Guest</option>
            <option value="user">User</option>
            <option value="member">Member</option>
            <option value="admin" disabled>Admin</option>
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                     text-sm font-medium rounded-md text-white bg-indigo-600 
                     hover:bg-indigo-700 focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;