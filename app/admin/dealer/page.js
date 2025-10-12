'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDealer() {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#989b2e]"></div>
      </div>
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
              <h1 className="text-2xl font-bold text-white">Dealer Form Management</h1>
            </div>
            <Link
              href="/admin"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full text-4xl mb-8">
            🤝
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-white mb-6">
            Dealer Form Management
          </h1>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-3 mb-8">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-yellow-300 font-medium">Coming Soon</span>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            The dealer application management system is being developed to streamline your partner onboarding process. Manage applications, approvals, and dealer relationships all in one place.
          </p>

          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-white mb-2">Application Review</h3>
              <p className="text-gray-300 text-sm">Review and process dealer applications with detailed evaluation tools.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Approval Workflow</h3>
              <p className="text-gray-300 text-sm">Streamlined approval process with status tracking and notifications.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">Dealer Directory</h3>
              <p className="text-gray-300 text-sm">Maintain a comprehensive database of approved dealers and their information.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Performance Tracking</h3>
              <p className="text-gray-300 text-sm">Monitor dealer performance, sales metrics, and relationship health.</p>
            </div>
          </div>

          {/* Application Flow Preview */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Dealer Application Flow</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">1</div>
                <h4 className="text-white font-medium mb-1">Application</h4>
                <p className="text-gray-400 text-sm">Dealer submits form</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">2</div>
                <h4 className="text-white font-medium mb-1">Review</h4>
                <p className="text-gray-400 text-sm">Admin evaluates</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">3</div>
                <h4 className="text-white font-medium mb-1">Decision</h4>
                <p className="text-gray-400 text-sm">Approve/Reject</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">4</div>
                <h4 className="text-white font-medium mb-1">Onboarding</h4>
                <p className="text-gray-400 text-sm">Welcome process</p>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Development Roadmap</h3>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Basic Form Structure - Completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Admin Dashboard - In Progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-300">Approval Workflow - Planned</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-300">Dealer Portal - Future</span>
              </div>
            </div>
          </div>

          {/* Temporary Notice */}
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-6 mb-8">
            <h4 className="text-lg font-semibold text-blue-300 mb-2">🚀 What&apos;s Working Now</h4>
            <p className="text-gray-300 text-sm mb-3">
              The dealer application form is live and accepting submissions. Applications are being sent via email notification.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="flex items-center text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Form Submissions Active
              </span>
              <span className="flex items-center text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Email Notifications Working
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/become-a-dealer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live Form
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center bg-[#989b2e] hover:bg-[#7a7d24] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}