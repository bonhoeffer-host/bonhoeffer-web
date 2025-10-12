'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminContact() {
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#989b2e]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Contact Form Management</h1>
            </div>
            <Link
              href="/admin"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg transition-colors"
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
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#989b2e] rounded-lg mb-8">
            <div className="w-12 h-12 bg-white rounded-sm"></div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Contact Form Management
          </h1>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-3 mb-8">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-yellow-300 font-medium">Coming Soon</span>
          </div>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
            Your contact form management system is in development. Soon you&apos;ll have full control over form submissions, automated responses, and customer inquiries.
          </p>

          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-white mb-2">Message Inbox</h3>
              <p className="text-gray-300 text-sm">View, organize, and respond to customer inquiries from a centralized inbox.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-2">Auto-Responders</h3>
              <p className="text-gray-300 text-sm">Set up automated email responses and acknowledgment messages.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h3>
              <p className="text-gray-300 text-sm">Track form submission rates, response times, and customer satisfaction.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Form Builder</h3>
              <p className="text-gray-300 text-sm">Customize form fields, validation rules, and submission workflows.</p>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Current Contact Form Status</h3>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Form Submissions</span>
                <span className="text-green-400 font-semibold">Active ✅</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Notifications</span>
                <span className="text-green-400 font-semibold">Working ✅</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Admin Dashboard</span>
                <span className="text-yellow-400 font-semibold">In Progress 🚧</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Analytics</span>
                <span className="text-gray-400 font-semibold">Planned 📋</span>
              </div>
            </div>
          </div>

          {/* Temporary Notice */}
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-6 mb-8">
            <h4 className="text-lg font-semibold text-blue-300 mb-2">📝 Temporary Solution</h4>
            <p className="text-gray-300 text-sm">
              Contact form submissions are currently being processed and sent via email. 
              Check your email inbox for new inquiries while we develop the admin dashboard.
            </p>
          </div>

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