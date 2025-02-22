import React, { useState } from 'react';
import { createPayment } from '../services/api';

const Payment: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted. Processing payment...");

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("User ID not found. Redirecting to login.");
      window.location.href = '/login';
      return;
    }

    try {
      // You may choose to send form details to the backend as well if needed.
      const response = await createPayment(userId);
      console.log("Payment response:", response.data);
      if (response.data.approvalUrl) {
        // Redirect to PayPal
        window.location.href = response.data.approvalUrl;
      } else {
        console.error("No approvalUrl in response.");
        alert("Payment initiation failed. Please try again later.");
      }
    } catch (err: any) {
      console.error("Error creating payment:", err.response?.data || err.message);
      alert("Unable to initiate payment. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full ml-[270px] mt-24 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Subscribe to Our Premium Service</h1>
      <p className="mb-4">
        Please enter your details below and click the button to proceed with the PayPal payment.
        Your subscription costs <strong>$2.00 USD per month</strong>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              placeholder="State"
              value={stateValue}
              onChange={(e) => setStateValue(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              placeholder="ZIP Code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm 
                     text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          {isSubmitting ? 'Processing...' : 'Pay with PayPal'}
        </button>
      </form>
    </div>
  );
};

export default Payment;
