import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="animated-gradient-bg"></div>
        <div className="floating-blur floating-blur-1"></div>
        <div className="floating-blur floating-blur-2"></div>
        <div className="floating-blur floating-blur-3"></div>
        <div className="pink-blur-effect"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          <div className="text-center animate-slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              <span className="pink-gradient-text">Transform Your Ideas</span>
              <br />
              Into Amazing Blog Posts
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-500 mb-10">
              BlogPilot helps you create, manage, and summarize your blog posts with AI assistance.
              Focus on your ideas while we handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white pink-gradient-bg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow hover:shadow-md transform hover:-translate-y-1"
              >
                Explore Blogs
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="fill-current text-gray-50" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1440V0C1440 0 1082.89 48 720 48C357.11 48 0 0 0 0V48Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Bloggers
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-500">
              Everything you need to create and manage your blog content efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="h-12 w-12 rounded-full pink-gradient-bg flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Blog Creation</h3>
              <p className="text-gray-500">
                Create beautiful blog posts with a simple and intuitive interface. Add tags to categorize your content.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="h-12 w-12 rounded-full pink-gradient-bg flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Summaries</h3>
              <p className="text-gray-500">
                Get automatic AI-generated summaries of your blog posts, making it easier for readers to preview your content.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="h-12 w-12 rounded-full pink-gradient-bg flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-8.599A5 5 0 105.5 15H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search & Discovery</h3>
              <p className="text-gray-500">
                Find blogs by keywords, tags, or authors. Efficient search capabilities help readers discover your content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 sm:px-12 lg:px-16 bg-opacity-90 relative">
              <div className="pink-blur-effect absolute top-0 right-0"></div>
              <div className="relative max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-white">
                  Ready to start your blogging journey?
                </h2>
                <p className="mt-4 text-lg text-pink-100">
                  Join BlogPilot today and experience the power of AI-assisted blogging.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-pink-50 transition-colors duration-200 shadow-lg transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    Sign up for free
                  </Link>
                  <Link
                    href="/blogs"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-200 shadow-lg transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    Explore Blogs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
