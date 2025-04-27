import React, { useState } from 'react';
import { User, Mail, Lock, Phone, LogIn, CheckCircle, AlertCircle } from 'lucide-react';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeField, setActiveField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Form Data Submitted:", formData);
      setMessage("Form submitted! (Axios not connected)");
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="w-full max-w-md px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
          <div className="relative h-32 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
              <div className="absolute top-6 right-12 w-16 h-16 bg-white rounded-full opacity-10 transform translate-x-2"></div>
              <div className="absolute top-10 right-20 w-8 h-8 bg-white rounded-full opacity-10"></div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-3">
                <User size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="px-8 pt-12 pb-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Create Account</h2>
            <p className="text-center text-gray-600 mb-8 text-sm">Join our community today</p>

            {message && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center animate-fadeIn">
                <CheckCircle size={18} className="mr-2 text-green-500 flex-shrink-0" />
                <p className="text-sm">{message}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center animate-fadeIn">
                <AlertCircle size={18} className="mr-2 text-red-500 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                  {activeField === 'name' && (
                    <span className="ml-1 inline-block w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                  )}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${activeField === 'name' ? 'text-blue-500' : 'text-gray-400'}`}>
                    <User size={18} className={activeField === 'name' ? 'animate-wiggle' : ''} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                      activeField === 'name' 
                        ? 'border-blue-500 ring-2 ring-blue-200 shadow-sm' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                  {activeField === 'email' && (
                    <span className="ml-1 inline-block w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                  )}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${activeField === 'email' ? 'text-blue-500' : 'text-gray-400'}`}>
                    <Mail size={18} className={activeField === 'email' ? 'animate-wiggle' : ''} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                      activeField === 'email' 
                        ? 'border-blue-500 ring-2 ring-blue-200 shadow-sm' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                  {activeField === 'password' && (
                    <span className="ml-1 inline-block w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                  )}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${activeField === 'password' ? 'text-blue-500' : 'text-gray-400'}`}>
                    <Lock size={18} className={activeField === 'password' ? 'animate-wiggle' : ''} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                      activeField === 'password' 
                        ? 'border-blue-500 ring-2 ring-blue-200 shadow-sm' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
              </div>

              {/* Phone Field */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                  {activeField === 'phone' && (
                    <span className="ml-1 inline-block w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                  )}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${activeField === 'phone' ? 'text-blue-500' : 'text-gray-400'}`}>
                    <Phone size={18} className={activeField === 'phone' ? 'animate-wiggle' : ''} />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+1 (123) 456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                      activeField === 'phone' 
                        ? 'border-blue-500 ring-2 ring-blue-200 shadow-sm' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                    </svg>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <>
                    <LogIn size={18} className="mr-2" />
                    Register
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
