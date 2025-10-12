'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '@/components/layouts/loading';

export default function AdminProducts() {
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

  const productSections = [
    {
      id: 'category',
      title: 'Category Management',
      description: 'Manage product categories and their organization',
      database: 'products-category',
      path: '/admin/products/category'
    },
    {
      id: 'info',
      title: 'Product Information',
      description: 'Manage basic product information and details',
      database: 'products-info',
      path: '/admin/products/info'
    },
    {
      id: 'seo',
      title: 'SEO Management',
      description: 'Manage SEO metadata and optimization',
      database: 'products-seo',
      path: '/admin/products/seo'
    },
    {
      id: 'meta',
      title: 'Product Metadata',
      description: 'Manage product metadata and attributes',
      database: 'products-meta',
      path: '/admin/products/meta'
    },
    {
      id: 'model',
      title: 'Product Models',
      description: 'Manage model specifications and details',
      database: 'products-model',
      path: '/admin/products/model'
    },
    {
      id: 'other',
      title: 'Additional Information',
      description: 'Manage additional model information',
      database: 'products-other',
      path: '/admin/products/other'
    },
    {
      id: 'faqs',
      title: 'Product FAQs',
      description: 'Manage frequently asked questions',
      database: 'products-faqs',
      path: '/admin/products/faqs'
    }
  ];

  const handleSectionClick = (section) => {
    router.push(section.path);
  };

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
                className="text-white hover:text-white/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-white">Products Management</h1>
            </div>
            <Link
              href="/admin"
              className="bg-[#989b2e] hover:bg-[#7a7d24] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Products Administration</h2>
          <p className="text-white text-lg">Manage your product catalog, categories, and models</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleSectionClick(section)}
            >
              {/* <div className="bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-[#989b2e] rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <div className="text-white group-hover:text-white/70 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                <p className="text-white text-sm leading-relaxed">{section.description}</p>

                <div className="mt-4 flex items-center text-[#989b2e] text-sm">
                  <div className="w-2 h-2 bg-[#989b2e] rounded-full mr-2"></div>
                  Manage Data
                </div>
              </div> */}

                <div className={`bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 relative overflow-hidden flex flex-row justify-between h-full`}>
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