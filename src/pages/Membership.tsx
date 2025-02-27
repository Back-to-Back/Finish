import {Link} from "react-router-dom";

const Membership = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">Unlock Exclusive Benefits with Our Membership</h1>
        <p className="text-gray-600 mt-2 text-center max-w-2xl">
          Join our membership program and gain access to premium content, ad-free reading, and a community of passionate learners.
        </p>
  
        {/* Membership Plans */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {/* Free Plan */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center border">
            <h2 className="text-xl font-semibold text-gray-800">Free Plan</h2>
            <p className="text-gray-600 mt-2">Access to articles.</p>
            <p className="text-2xl font-bold text-gray-800 mt-4">Free</p>
            <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
            <Link to="/register" className="block nav-link">
              Join for Free(Register as User/Guest)
            </Link>
            </button>
          </div>
  
          {/* Premium Plan */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-blue-500">
            <h2 className="text-xl font-semibold text-gray-800">Premium Plan</h2>
            <p className="text-gray-600 mt-2">Full access to exclusive content & ad-free experience.</p>
            <p className="text-2xl font-bold text-gray-800 mt-4">$2/month</p>
            <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
              Subscribe Now
            </button>
          </div>
        </div>
  
        {/* Why Join Section */}
        <div className="mt-12 bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Why Become a Member?</h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li>✅ Exclusive content & deep insights.</li>
            <li>✅ Ad-free, seamless reading experience.</li>
            <li>✅ Create your own post.</li>
            <li>✅ Early access to new posts & updates.</li>
          </ul>
        </div>
  
        {/* Call-to-Action */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Ready to elevate your reading experience?</h3>
          <button className="mt-3 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">
            <Link to="/register" className="block nav-link">
                Get Started Today(Register as Member)
            </Link> 
          </button>
        </div>
      </div>
    );
  };
  
  export default Membership;
  