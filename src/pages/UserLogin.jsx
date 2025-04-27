import React, { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError"
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeField, setActiveField] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    // Validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      toast.error("Email and password are required");
      setIsLoading(false);
      return;
    }
  
    try {
      // Simulate delay
      setTimeout(async () => {
        try {
          const response = await Axios({
            url: SummaryApi.userLogin.url,
            method: SummaryApi.userLogin.method,
            data: {
              email: formData.email,
              password: formData.password,
            },
          });
  
          if (response.data.success) {
            console.log(response.data.success);
            // Store token and user info
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
  
            toast.success("Login successful! ✅");
            navigate("/"); // uncomment if using react-router
          }
        } catch (apiError) {
          console.error("Login Error:", apiError);
          setError(apiError.response?.data?.message || "Login failed");
          AxiosToastError(apiError); // 🔥 toast error handler
        } finally {
          setIsLoading(false);
        }
      }, 1500); // simulated delay
    } catch (err) {
      console.error("Unexpected Error:", err);
      setError("An error occurred during login");
      toast.error("Something went wrong during login");
      setIsLoading(false);
    }
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
                <LogIn size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="px-8 pt-12 pb-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome Back</h2>
            <p className="text-center text-gray-600 mb-8 text-sm">Sign in to access your account</p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center animate-fadeIn">
                <AlertCircle size={18} className="mr-2 text-red-500 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
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
                      activeField === 'email' ? 'border-blue-500 ring-2 ring-blue-200 shadow-sm' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                    {activeField === 'password' && (
                      <span className="ml-1 inline-block w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                    )}
                  </label>
                  <a href="#" className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${activeField === 'password' ? 'text-blue-500' : 'text-gray-400'}`}>
                    <Lock size={18} className={activeField === 'password' ? 'animate-wiggle' : ''} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg transition-all duration-300 ${
                      activeField === 'password' ? 'border-blue-500 ring-2 ring-blue-200 shadow-sm' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="transition-all duration-300" />
                    ) : (
                      <Eye size={18} className="transition-all duration-300" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
                  />
                  <span className="ml-2 text-sm text-gray-700">Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${
                  isLoading ? 'opacity-90' : 'hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-102'
                }`}
              >
                <span className={`flex items-center transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  <span>Sign In</span>
                  <LogIn size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </span>

                {isLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  </span>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
