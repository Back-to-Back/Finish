import React from 'react';
import { Link } from "react-router-dom";
const Dashboard: React.FC = () => {
  return (
    <div className='w-full ml-[270px] mt-24 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1>Members Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <Link to="/create-post" className=""><button className="mt-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Create Post According to Categories </button></Link>
      <Link to="/create-posting" className=""><button className="mt-4 ml-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Create Post According to Sub-Categories </button></Link>
    </div>
  );
};

export default Dashboard;