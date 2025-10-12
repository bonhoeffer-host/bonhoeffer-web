'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminSpareParts() {
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

  const sparePartsSections = [
    {
      id: 'category',
      title: 'Category Management',
      description: 'Manage spare parts categories and organization',
      database: 'spare-parts-category',
      path: '/admin/spare-parts/category'
    },
    {
      id: 'product',
      title: 'Product Management',
      description: 'Manage spare parts products and their details',
      database: 'spare-parts-product',
      path: '/admin/spare-parts/product'
    },
    {
      id: 'model',
      title: 'Model Management',
      description: 'Manage spare parts models and compatibility',
      database: 'spare-parts-model',
      path: '/admin/spare-parts/model'
    }
  ];

  const handleSectionClick = (section) => {
    router.push(section.path);
  };

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
              <h1 className="text-2xl font-bold text-foreground">Spare Parts Management</h1>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Spare Parts Administration</h2>
          <p className="text-muted-foreground text-lg">Manage your spare parts catalog, categories, and models</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sparePartsSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleSectionClick(section)}
            >
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-[#989b2e] rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">{section.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{section.description}</p>
                
                <div className="mt-4 flex items-center text-[#989b2e] text-sm">
                  <div className="w-2 h-2 bg-[#989b2e] rounded-full mr-2"></div>
                  Manage Data
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-muted-foreground text-sm">Spare Parts Sections</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground">CRUD</div>
            <div className="text-muted-foreground text-sm">Full Operations</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground">Live</div>
            <div className="text-muted-foreground text-sm">Real-time Sync</div>
          </div>
        </div>
      </main>
    </div>
  );
}