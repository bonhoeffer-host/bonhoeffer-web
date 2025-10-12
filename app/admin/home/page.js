'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '@/components/layouts/loading';

export default function AdminHome() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-white">Home Page Management</h1>
            </div>
            <Link
              href="/admin"
              className="bg-[#989b2e] hover:bg-[#989b2e]/70 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          {/* <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-4xl mb-8">
            🏠
          </div> */}

          {/* Title */}
          <h1 className="text-5xl font-bold text-white mb-6">
            Home Page Management
          </h1>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-3 mb-8">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-yellow-300 font-medium">Coming Soon</span>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-5xl mx-auto">
            We&apos;re working on bringing you comprehensive homepage management tools. Soon you&apos;ll be able to edit hero sections, featured products, testimonials, and all homepage content.
          </p>

          {/* Feature Preview */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">✏️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Content Editor</h3>
              <p className="text-gray-300 text-sm">Edit hero text, banners, and promotional content directly from the admin panel.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">🖼️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Media Manager</h3>
              <p className="text-gray-300 text-sm">Upload and organize images, videos, and other media assets for your homepage.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Theme Customizer</h3>
              <p className="text-gray-300 text-sm">Adjust colors, fonts, and layout settings to match your brand identity.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Performance Analytics</h3>
              <p className="text-gray-300 text-sm">Monitor homepage performance, visitor engagement, and conversion metrics.</p>
            </div>
          </div> */}

          {/* Timeline */}
          {/* <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Development Timeline</h3>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Admin Panel Structure - Completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Home Page Editor - In Progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-300">Media Management - Coming Next</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-300">Theme Customization - Future Release</span>
              </div>
            </div>
          </div> */}

          {/* Action Button */}
          <Link
            href="/admin"
            className="inline-flex items-center bg-[#989b2e] hover:bg-[#7a7d24] text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </motion.div>
      </main>
    </div>
  );
}