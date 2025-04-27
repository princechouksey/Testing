import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Bell,
  FileText,
  BarChart2,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Set isLoaded to true after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}

      {/* Animated Hero Section */}
      <div
        className="h-189 text-white bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage:
            'url("https://png.pngtree.com/thumb_back/fh260/background/20240721/pngtree-eureka-mind-and-idea-photo-image_16072581.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay to ensure text remains readable */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-1000 ${
            isLoaded ? "opacity-60" : "opacity-0"
          }`}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="flex items-center justify-between absolute top-70">
            <div className="md:w-1/2">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transform transition-all duration-1000 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-16 opacity-0"
                }`}
              >
                Making Our City Better Together
              </h1>
              <p
                className={`text-lg md:text-xl mb-8 transform transition-all duration-1000 delay-300 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-16 opacity-0"
                }`}
              >
                Report issues, track progress, and help improve our community.
                Your voice matters in building a smarter city for everyone.
              </p>
              <div
                className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-16 opacity-0"
                }`}
              >
                <Link
                  to={"/register/complaint"}
                  className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-md text-center hover:scale-105 transition-transform duration-300"
                >
                  Report an Issue
                </Link>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-md border border-white text-center hover:scale-105 transition-transform duration-300">
                  Track Your Complaint
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Animated particles or light effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {isLoaded &&
            Array(5)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-16 rounded-full bg-white/10 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: `${8 + Math.random() * 10}s`,
                  }}
                />
              ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Report any civic issues and help make our city better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Report Issues
                </h3>
                <p className="text-gray-600 mb-4">
                  Report potholes, broken streetlights, garbage collection
                  issues, and more.
                </p>
                <a
                  href="/report"
                  className="flex items-center text-blue-600 font-medium"
                >
                  File a complaint <ChevronRight className="ml-1" size={16} />
                </a>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <Bell size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Track Complaints
                </h3>
                <p className="text-gray-600 mb-4">
                  Get real-time updates on your reported issues and their
                  resolution status.
                </p>
                <a
                  href="#"
                  className="flex items-center text-blue-600 font-medium"
                >
                  Track your complaint{" "}
                  <ChevronRight className="ml-1" size={16} />
                </a>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  City Resources
                </h3>
                <p className="text-gray-600 mb-4">
                  Access information about city services, events, and other
                  public resources.
                </p>
                <a
                  href="#"
                  className="flex items-center text-blue-600 font-medium"
                >
                  View resources <ChevronRight className="ml-1" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Making an Impact
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See how our community is working together to improve our city
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg text-center">
              <div className="text-blue-600 text-4xl font-bold mb-2">1,234</div>
              <div className="text-gray-700">Issues Reported</div>
            </div>
            <div className="p-6 bg-green-50 rounded-lg text-center">
              <div className="text-green-600 text-4xl font-bold mb-2">982</div>
              <div className="text-gray-700">Problems Resolved</div>
            </div>
            <div className="p-6 bg-yellow-50 rounded-lg text-center">
              <div className="text-yellow-600 text-4xl font-bold mb-2">48</div>
              <div className="text-gray-700">Avg. Hours to Fix</div>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg text-center">
              <div className="text-purple-600 text-4xl font-bold mb-2">
                5,670
              </div>
              <div className="text-gray-700">Active Citizens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recent Updates</h2>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              View all updates <ChevronRight className="ml-1" size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Update 1 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <BarChart2 className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    Pothole Repairs Completed
                  </h3>
                  <p className="text-gray-600 mt-1">
                    15 potholes on Main Street have been repaired as reported by
                    citizens last week.
                  </p>
                  <div className="mt-4 text-sm text-gray-500">2 days ago</div>
                </div>
              </div>
            </div>

            {/* Update 2 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Bell className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    Street Light Maintenance
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Scheduled maintenance for street lights in the Downtown area
                    will happen this weekend.
                  </p>
                  <div className="mt-4 text-sm text-gray-500">5 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SmartCity Hub</h3>
              <p className="text-gray-400">
                Making our city cleaner, safer, and more efficient through
                citizen participation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/report" className="text-gray-400 hover:text-white">
                    Report Issue
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Track Complaints
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Services
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 City Hall Road</li>
                <li>Smart City, SC 12345</li>
                <li>help@smartcityhub.com</li>
                <li>+1 (123) 456-7890</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 SmartCity Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
