'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../layouts/header';
import Footer from '../layouts/footer';


// Centralized Global Particle System (consistent across all pages)
const GlobalParticles = React.memo(function GlobalParticles() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Create particles with better visibility
  const particles = Array.from({ length: 20 }, (_, i) => {
    // Create a grid-like distribution to ensure even spread
    const gridX = (i % 5) * 20 + Math.random() * 15; // 5 columns, 0-80% + random offset
    const gridY = Math.floor(i / 5) * 25 + Math.random() * 20; // 4 rows, 0-75% + random offset
    
    return {
      id: i,
      initialX: gridX,
      initialY: gridY,
      size: Math.random() * 3 + 4, // 2-5px size
      duration: Math.random() * 4 + 6, // 6-10 seconds
      delay: Math.random() * 8, // 0-8 second delay
    };
  });
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-[#989b2e] rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0.6, 0.8, 0],
            scale: [0, 1, 1.3, 1, 0],
            y: [0, -50, -100, -50, 0],
            x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
});

function BgLayout({ children, className = "" }) {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Global Background Overlay - Black to Transparent to Black */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />
      
      {/* Global Chainsaw Cursor */}
      {/* <GlobalChainsawCursor /> */}
      
      {/* Centralized Particle System */}
      <GlobalParticles />
      
      <header className="relative z-50">
        <Header />
      </header>

      <main className={`relative z-20 ${className}`}>
        {children}
      </main>

      <footer className="relative z-20">
        <Footer />
      </footer>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #989b2e #23272a;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #989b2e 60%, #23272a 100%);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </section>
  );
}

export default BgLayout;