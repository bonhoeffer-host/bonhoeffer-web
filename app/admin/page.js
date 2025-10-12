'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '@/components/layouts/loading';

// Admin Authentication Component
function AdminAuth({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('adminAuth', 'true');
        onLogin(true);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Authentication error. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-white">Bonhoeffer Machines</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-3 text-white text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#989b2e] hover:bg-[#7a7d24] cursor-pointer text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard({ onLogout }) {
  const router = useRouter();

  const adminSections = [
    {
      id: 'home',
      title: 'Home Page',
      description: 'Manage homepage content and sections',
      path: '/admin/home',
      status: 'coming-soon'
    },
    {
      id: 'products',
      title: 'Products Page',
      description: 'Manage product categories, information, and models',
      path: '/admin/products',
      status: 'active'
    },
    {
      id: 'spare-parts',
      title: 'Spare Parts Page',
      description: 'Manage spare parts categories and models',
      path: '/admin/spare-parts',
      status: 'active'
    },
    {
      id: 'contact',
      title: 'Contact Form',
      description: 'Manage contact form submissions and settings',
      path: '/admin/contact',
      status: 'coming-soon'
    },
    {
      id: 'dealer',
      title: 'Dealer Form',
      description: 'Manage dealer applications and registrations',
      path: '/admin/dealer',
      status: 'coming-soon'
    },
    {
      id: 'career',
      title: 'Career Form',
      description: 'Manage career applications and job postings',
      path: '/admin/career',
      status: 'coming-soon'
    }
  ];

  const handleSectionClick = (section) => {
    if (section.status === 'coming-soon') {
      alert('This feature is coming soon!');
      return;
    }
    router.push(section.path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Bonhoeffer Admin Dashboard</h1>
            </div>
            <button
              onClick={onLogout}
              className="bg-destructive hover:bg-destructive/90 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">What would you like to edit today?</h2>
          <p className="text-white text-lg">Choose a section to manage your website content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: section.id === 'home' ? 0 : 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleSectionClick(section)}
            >
              <div className={`bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 relative overflow-hidden flex flex-row justify-between h-full`}>
                  {/* {section.status === 'coming-soon' && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                      Coming Soon
                    </div>
                  )} */}
                  
                  {/* <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/60 rounded-sm"></div>
                    </div>
                    <div className="text-white/80">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div> */}
                
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{section.description}</p>
                  </div>
                  <div className="text-white/80">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Main Admin Page Component
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onLogin={setIsAuthenticated} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}