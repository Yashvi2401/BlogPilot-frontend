"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaEnvelope, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { getBlogById, getBlogSummary } from "@/services/api";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try { 
        const data = await getBlogById(params.id);
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  // Function to generate a summary
  const generateSummary = async () => {
    setSummaryLoading(true);
    try {
      const data = await getBlogSummary(params.id);
      setSummary(data.summary);
    } catch (err) {
      console.error("Error generating summary:", err);
      setSummary("Unable to generate summary at this time.");
    } finally {
      setSummaryLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="pink-gradient-text text-2xl">Loading blog post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Error</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <Link 
          href="/blogs" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/blogs" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </Link>
        </div>
        
        {/* Blog Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center mb-8 text-gray-500">
            <span>{blog.created_at ? formatDate(blog.created_at) : 'No date available'}</span>
            <span className="mx-2">•</span>
            <span>By {blog.author}</span>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags && blog.tags.split(',').map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-50 text-primary"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
        
        {/* Summary Section */}
        <div className="mb-8 animate-fade-in">
          {summary ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">AI-Generated Summary</h3>
              <p className="text-gray-600">{summary}</p>
            </div>
          ) : (
            <button
              onClick={generateSummary}
              disabled={summaryLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {summaryLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Summary...
                </>
              ) : (
                <>Generate AI Summary</>
              )}
            </button>
          )}
        </div>
        
        {/* Blog Content */}
        <article className="prose prose-lg max-w-none prose-primary animate-fade-in">
          <div dangerouslySetInnerHTML={{ __html: blog.content ? blog.content.replace(/\n/g, '<br />') : '' }} />
        </article>
        
        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title || '')}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <FaTwitter size={24} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors duration-200">
              <FaFacebook size={24} />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
              <FaLinkedin size={24} />
            </a>
            <a href={`mailto:?subject=${encodeURIComponent(blog.title || '')}&body=${encodeURIComponent(`Check out this article: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`} className="text-gray-400 hover:text-red-500 transition-colors duration-200">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}