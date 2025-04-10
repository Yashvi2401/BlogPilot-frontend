"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md bg-opacity-95 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-2"
            >
              <div className="pink-blur-effect">
                <span className="pink-gradient-text text-2xl font-bold">BlogPilot</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                pathname === "/" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/blogs" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                pathname === "/blogs" || pathname.startsWith("/blogs/")
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Blogs
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    pathname === "/dashboard" || pathname.startsWith("/dashboard/")
                      ? "text-primary border-b-2 border-primary" 
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  Dashboard
                </Link>
                <button 
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    pathname === "/login"
                      ? "text-primary border-b-2 border-primary" 
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 animate-fade-in">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/" 
                  ? "text-primary bg-pink-50" 
                  : "text-gray-700 hover:text-primary hover:bg-pink-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/blogs" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/blogs" || pathname.startsWith("/blogs/")
                  ? "text-primary bg-pink-50" 
                  : "text-gray-700 hover:text-primary hover:bg-pink-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/dashboard" || pathname.startsWith("/dashboard/")
                      ? "text-primary bg-pink-50" 
                      : "text-gray-700 hover:text-primary hover:bg-pink-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  className="mt-1 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-all duration-300 hover:shadow-md"
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/login"
                      ? "text-primary bg-pink-50" 
                      : "text-gray-700 hover:text-primary hover:bg-pink-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="block w-full mt-1 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-all duration-300 hover:shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 