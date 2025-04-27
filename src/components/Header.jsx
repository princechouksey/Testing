import React, { useState, useContext, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home or login
  };
  

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">SmartCity Hub</Link>

            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="border-b-2 border-white px-1 py-5 text-sm font-medium">
                Home
              </Link>
              <a href="#" className="border-transparent hover:border-gray-300 border-b-2 px-1 py-5 text-sm font-medium">
                Services
              </a>
              <Link to="/report" className="border-transparent hover:border-gray-300 border-b-2 px-1 py-5 text-sm font-medium">
                Report Issue
              </Link>
              <a href="#" className="border-transparent hover:border-gray-300 border-b-2 px-1 py-5 text-sm font-medium">
                Track Complaints
              </a>
              <a href="#" className="border-transparent hover:border-gray-300 border-b-2 px-1 py-5 text-sm font-medium">
                About
              </a>
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            {!user ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium hidden md:block"
                >
                  Login
                </button>
                <Link to="/register/user" className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium hidden md:block">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium hidden md:block"
              >
                Logout
              </button>
            )}

            {isDropdownOpen && !user && (
              <div className="absolute top-12 right-0 w-40 bg-white text-black rounded-md shadow-md z-50">
                <Link to="/user/login" className="block px-4 py-2 hover:bg-blue-100">
                  Login as User
                </Link>
                <Link to="/admin/login" className="block px-4 py-2 hover:bg-blue-100">
                  Login as Admin
                </Link>
              </div>
            )}

            <button
              onClick={toggleMenu}
              className="md:hidden bg-blue-700 p-2 rounded-md text-blue-200 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-800">
              Home
            </Link>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-800">
              Services
            </a>
            <Link to="/report" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-800">
              Report Issue
            </Link>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-800">
              Track Complaints
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-800">
              About
            </a>

            <div className="block">
              {!user ? (
                <>
                  <div className="px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600">
                    Login / Register
                  </div>
                  <div className="ml-3">
                    <Link to="/login/user" className="block px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-800 rounded-md">
                      Login as User
                    </Link>
                    <Link to="/login/admin" className="block px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-800 rounded-md">
                      Login as Admin
                    </Link>
                  </div>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
