"use client";
import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';

function House() {
  const brands = [
    {
      name: "Bonhoeffer Machines",
      description: "Heavy Duty for Professional Use",
      website: "https://bonhoeffermachines.com",
      logo: "/logos/bonhoeffer_logo.png", 
      gradient: "from-green-500 to-teal-600",
      hoverGradient: "from-green-400 to-teal-500"
    },
   
   {
      name: "Stevron Tools",
      description: "Premium Tools for Professionals",
      website: "https://stevrontools.com",
      logo: "/logo.png",
      gradient: "from-yellow-500 to-orange-600",
      hoverGradient: "from-yellow-400 to-orange-500"
    },
    {
      name: "Mechnova Machines", 
      description: "Light Duty for Home Use",
      website: "https://mechnovamachines.com",
      logo: "/logos/mechnova_logo.png",
      gradient: "from-blue-500 to-purple-600",
      hoverGradient: "from-blue-400 to-purple-500"
    }
  ];

  const brands2 = [
    {
      name: "Stevron Tools",
      description: "Premium Tools for Professionals",
      website: "https://stevrontools.com",
      logo: "/logo.png",
      gradient: "from-yellow-500 to-orange-600",
      hoverGradient: "from-yellow-400 to-orange-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-5 lg:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          {/* <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Our Family
            </span>
          </motion.div> */}

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Find Your Perfect Fit{" "} */}
            Garden & <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Forestry</span>
            {/* <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Meet the Brands Built for You
            </span> */}
          </motion.h2>

          {/* <motion.p
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Wondering how these brands differ when they all come from the same Bonhoeffer family? Each one serves a unique purpose and audience—from the everyday home gardener to the heavy-duty industrial operator.
          </motion.p> */}
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Card */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 hover:bg-black/60 transition-all duration-500 relative overflow-hidden h-full">
                {/* Gradient Overlay */}
                {/* <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div> */}
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  {/* Logo Container */}
                  <motion.div
                    className="w-full h-[50%] mb-6 flex items-center justify-center bg-white/90 rounded-xl group-hover:cursor-pointer backdrop-blur-sm group-hover:bg-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                    //   className="max-w-full max-h-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                    className="max-w-full max-h-full p-4 object-contain group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                    />
                  </motion.div>

                  {/* Brand Info */}
                  <div className="flex-grow">
                    {/* <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {brand.name}
                    </h3> */}
                    <p className="text-white/70 mb-6 text-xl font-semibold">
                      {brand.description}
                    </p>
                  </div>

                  {/* Visit Button */}
                  <Link
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <motion.button
                      className={`w-full cursor-pointer text-xl bg-gradient-to-r ${brand.gradient} hover:bg-gradient-to-r hover:${brand.hoverGradient} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:shadow-lg group-hover:shadow-yellow-400/20`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center">
                        {brand.name}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </motion.button>
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </motion.div>
          ))}
        </div>

        

        {/* Bottom CTA */}
        {/* <motion.div
          variants={itemVariants}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <motion.div
            className="inline-flex items-center space-x-3 text-white/60 text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Innovation</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Quality</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span>Trust</span>
            </div>
          </motion.div>
        </motion.div> */}
      </motion.div>

      {/* Floating Background Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-blue-500/10 rounded-full blur-xl"
      />
    </section>
  );
}

export default House;
