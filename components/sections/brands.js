"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const Brands = () => {
  const brands = [
    {
      name: "Bonhoeffer Machines",
      logo: "/logos/bon_letter.png",
      letterLogo: "/letter.png",
      website: "https://bonhoeffer.in",
      description: "Heavy-duty machines for industrial use",
      category: "Parent Company",
      tagline: "Engineered for the toughest jobs",
      gradient: "from-[#989b2e] to-green-500"
    },
    {
      name: "Stronwell",
      logo: "/logos/stronwell_logo.png",
      letterLogo: "/logos/stronwell_letter.png",
      website: "https://stronwell.com",
      description: "Mid-duty for Regular Use",
      category: "Frequently Use",
      tagline: "Built for daily professional use",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Mechnova Machines",
      logo: "/logos/mechnova_logo.png",
      letterLogo: "/logos/mechnova_letter.png",
      website: "https://mechnovamachines.com",
      description: "Light-duty machines for home use",
      category: "Home Use",
      tagline: "Perfect for light jobs and occasional work",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  const hard = [
    {
      name: "Stevron Tools",
      logo: "/logos/stevron_black_logo.png",
      letterLogo: "/logos/stevron_letter.png",
      website: "https://stevrontools.com",
      description: "Premium Tools for Professionals",
      category: "Hardware Division",
      tagline: "Bringing precision to your projects",
      gradient: "from-green-500 to-emerald-500"
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
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

  const logoVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    <section className="py-10 mt-10 sm:mt-30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#989b2e] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#989b2e] to-blue-500 opacity-3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl max-w-3xl xl:max-w-4xl mx-auto font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Find Your Perfect Fit{' '} */}
            Garden & <span className="bg-gradient-to-r from-[#989b2e] to-[#989b2e] bg-clip-text text-transparent">Forestry</span>
            {/* <span className="block bg-gradient-to-r from-[#989b2e] to-[#989b2e] bg-clip-text text-transparent">
              Meet the Brands Built for You
            </span> */}
          </motion.h2>
          
          {/* <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Wondering how these brands differ when they all come from the same Bonhoeffer family? Each one serves a unique purpose and audience—from the everyday home gardener to the heavy-duty industrial operator.
          </motion.p> */}
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              variants={cardVariants}
              className="group relative"
            >
              <Link href={brand.website} target="_blank">
                <div className="bg-white backdrop-blur-sm flex flex-col justify-between h-full rounded-2xl p-5 text-center border border-gray-700/50 hover:border-[#989b2e]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#989b2e]/10 transform hover:-translate-y-2">
                    <div>
                    {/* Category Badge */}
                    {/* <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-gradient-to-r ${brand.gradient} text-white`}>
                    {brand.category}
                    </div> */}

                    {/* Logo Section */}
                    <motion.div
                    variants={logoVariants}
                    className="flex justify-center mb-6"
                    >
                    <div className="relative bg-black/10 rounded-xl w-full h-32 group-hover:scale-105 transition-transform duration-500">
                        <Image
                        src={brand.logo}
                        alt={`${brand.name} Logo`}
                        fill
                        className="object-contain p-4"
                        />
                    </div>
                    </motion.div>

                    {/* Brand Info */}
                    <div className="text-center">
                    {/* <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#989b2e] transition-colors duration-300">
                        {brand.name}
                    </h3> */}
                    
                    {/* <p className="text-gray-900 mb-4 text-xl font-bold">
                        {brand.category}
                    </p> */}
                    
                    <p className="text-gray-900 mb-4 text-xl font-semibold">
                        {brand.description}
                    </p>

                    </div>
                    </div>
                    {/* Visit Website Button */}
                    <motion.button
                        // href={brand.website}
                        // target="_blank"
                        // rel="noopener noreferrer"
                        className={`inline-flex cursor-pointer items-center px-6 py-3 rounded-xl justify-center font-semibold text-white bg-gradient-to-r ${brand.gradient} hover:shadow-lg hover:shadow-current/25 transform hover:scale-105 transition-all duration-300 group-hover:animate-pulse`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {brand.name}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </motion.button>

                    {/* Decorative Elements */}
                    {/* <div className="absolute top-4 right-4 w-8 h-8 opacity-20">
                    <Image
                        src={brand.letterLogo}
                        alt={`${brand.name} Letter`}
                        fill
                        className="object-contain filter brightness-0 invert"
                    />
                    </div> */}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl max-w-3xl xl:max-w-4xl mx-auto font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Find Your Perfect Fit{' '} */}
            Hardware <span className="bg-gradient-to-r from-[#989b2e] to-[#989b2e] bg-clip-text text-transparent">Division</span>
            {/* <span className="block bg-gradient-to-r from-[#989b2e] to-[#989b2e] bg-clip-text text-transparent">
              Meet the Brands Built for You
            </span> */}
          </motion.h2>
          
          {/* <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Wondering how these brands differ when they all come from the same Bonhoeffer family? Each one serves a unique purpose and audience—from the everyday home gardener to the heavy-duty industrial operator.
          </motion.p> */}
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center items-center mx-auto md:w-[50%] lg:w-[30%] my-12"
        >
          {hard.map((brand, index) => (
            <motion.div
              key={brand.name}
              variants={cardVariants}
              className="group w-full relative"
            >
              <Link href={brand.website} target="_blank">
                <div className="bg-white backdrop-blur-sm flex flex-col justify-between h-full rounded-2xl p-5 text-center border border-gray-700/50 hover:border-[#989b2e]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#989b2e]/10 transform hover:-translate-y-2">
                    <div>
                    {/* Category Badge */}
                    {/* <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-gradient-to-r ${brand.gradient} text-white`}>
                    {brand.category}
                    </div> */}

                    {/* Logo Section */}
                    <motion.div
                    variants={logoVariants}
                    className="flex justify-center mb-6"
                    >
                    <div className="relative bg-black/10 rounded-xl w-full h-32 group-hover:scale-105 transition-transform duration-500">
                        <Image
                        src={brand.logo}
                        alt={`${brand.name} Logo`}
                        fill
                        className="object-contain p-4"
                        />
                    </div>
                    </motion.div>

                    {/* Brand Info */}
                    <div className="text-center">
                    {/* <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#989b2e] transition-colors duration-300">
                        {brand.name}
                    </h3> */}
                    
                    {/* <p className="text-gray-900 mb-4 text-xl font-bold">
                        {brand.category}
                    </p> */}
                    
                    <p className="text-gray-900 mb-4 text-xl font-semibold">
                        {brand.description}
                    </p>

                    </div>
                    </div>
                    {/* Visit Website Button */}
                    <motion.button
                        // href={brand.website}
                        // target="_blank"
                        // rel="noopener noreferrer"
                        className={`inline-flex cursor-pointer items-center px-6 py-3 rounded-xl justify-center font-semibold text-white bg-gradient-to-r ${brand.gradient} hover:shadow-lg hover:shadow-current/25 transform hover:scale-105 transition-all duration-300 group-hover:animate-pulse`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {brand.name}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </motion.button>

                    {/* Decorative Elements */}
                    {/* <div className="absolute top-4 right-4 w-8 h-8 opacity-20">
                    <Image
                        src={brand.letterLogo}
                        alt={`${brand.name} Letter`}
                        fill
                        className="object-contain filter brightness-0 invert"
                    />
                    </div> */}
                </div>              
                </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Connection Visualization */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-4 bg-gray-800/30 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-700/30">
            <div className="flex items-center space-x-2">
              {brands.map((brand, index) => (
                <React.Fragment key={brand.name}>
                  <div className="relative w-12 h-12">
                    <Image
                      src={brand.letterLogo}
                      alt={brand.name}
                      fill
                      className="object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  {index < brands.length - 1 && (
                    <svg className="w-6 h-6 text-[#989b2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="text-gray-300 text-sm font-medium">
              United by Excellence
            </div>
          </div>
        </motion.div> */}

        {/* Bottom CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg mb-6">
            Discover the full ecosystem of Bonhoeffer-powered brands
          </p>
          <motion.div
            className="inline-flex items-center space-x-2 text-[#989b2e] font-semibold"
            animate={{ 
              x: [0, 10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span>Explore all brands</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  )
}

export default Brands
