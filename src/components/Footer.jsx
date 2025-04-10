import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="pink-blur-effect">
              <span className="pink-gradient-text text-2xl font-bold">BlogPilot</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              An AI-powered blogging platform that helps you create, manage, 
              and summarize your blog posts with ease.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/blogs" 
                  className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Account
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/login" 
                  className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  href="/register" 
                  className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BlogPilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 