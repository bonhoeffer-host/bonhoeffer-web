'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import BgLayout from '@/components/templates/bgLayout'

function Page() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // HOD data
  const hodData = [
    // { name: "Naveen Bakshi", position: "Head of Supply Chain", image: "https://bonhoeffermachines.com/public/images/about-new/Naveen-Bakshi.webp" },
    { name: "Sachin Sharma", position: "Finance Controller", image: "https://bonhoeffermachines.com/public/images/about-new/Sachin-Sharma.webp" },
    { name: "Sudhanshu Pandey", position: "CEO - India", image: "https://bonhoeffermachines.com/public/images/about-new/Sudhanshu-Pandey.webp" },
    { name: "Rajat Sahni", position: "CEO - LATAM", image: "https://bonhoeffermachines.com/public/images/about-new/Rajat-Sahni.webp" }
    
  ];

  // Differentiators data
  const differentiators = [
    { title: "Global Presence", description: "Operating across 17+ countries with localized support" },
    { title: "Innovation First", description: "Cutting-edge technology and continuous R&D investment" },
    { title: "Quality Assurance", description: "ISO certified processes and rigorous quality control" },
    { title: "Customer Support", description: "24/7 technical support and comprehensive training programs" },
    { title: "Sustainable Solutions", description: "Eco-friendly machinery reducing environmental impact" },
    { title: "Proven Track Record", description: "Over 4500+ successful installations worldwide" }
  ];

  // FAQ data
  const faqs = [
    { question: "When was Bonhoeffer Machines founded?", answer: "Bonhoeffer Machines was established in 2018, initially operating under Heine Corporation Private Limited. Subsequently, the brand was registered with Bonhoeffer Machines Private Limited in 2023. As of 2025, the company commemorates eight years since its inception." },
    { question: "What makes Bonhoeffer Machines different from competitors?", answer: "We combine innovative technology with robust manufacturing, offering comprehensive solutions backed by global support and proven reliability across diverse agricultural environments." },
    { question: "What is your warranty policy?", answer: "We provide 36 months warranty coverage with extensive spare parts availability and rapid response service teams in all our operational regions." },
    { question: "Can your machines be customized for specific requirements?", answer: "Absolutely. We work closely with clients to customize machinery specifications, features, and configurations to meet specific agricultural and operational needs." },
    { question: "How do you ensure quality control?", answer: "Our ISO-certified manufacturing processes include rigorous testing at every stage, quality checkpoints, and final inspection before delivery to ensure consistent performance." }
  ];

  // Office addresses
  const offices = [
    {
      title: "Corporate Office (India)",
      address: "Plot No 756, 2nd Floor, Udyog Vihar, Phase V, Gurugram, Haryana Pin Code: 122001",
      phone: "+91 96675 15523",
      email: "support@bonhoeffermachines.com"
    },
    {
      title: "China Office", 
      address: "NINGBO BONHOEFFER MACHINES IMPORT & EXPORT CO. LTD, Room A163, Building 003(4-1) (4-2), No.1083 Zhongshan East Road, Yinzhou District, Ningbo, Zhejiang, China.",
      phone: "+91 96675 15523",
      email: "support@bonhoeffermachines.com"
    },
    {
      title: "Hong Kong Office",
      address: "HEINE CORPORATION HK PRIVATE LIMITED, RM 1607 TREND CTR 29-31 CHEUNG LEE ST CHAI WAN HONG KONG",
      phone: "+91 96675 15523",
      email: "support@bonhoeffermachines.com"
    }
  ];

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden mt-5 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="https://bonhoeffermachines.com/public/images/about-new/About-us-new-banner.webp"
            alt="About Us Banner"
            fill
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0 bg-black/50" /> */}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-1 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-10 h-10 text-[#989b2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      <section>  
        <motion.div 
          className="relative mt-5 z-10 text-center text-white px-2 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            About <span className='text-[#989b2e]'>Us</span>
          </motion.h1>
          <motion.p 
            className="text-lg xs:text-xl sm:text-xl md:text-2xl max-w-2xl sm:max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Pioneering Innovation Across the Globe
          </motion.p>
        </motion.div>
      </section>

      {/* Company Introduction */}
      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid gap-y-10 md:grid-cols-2 md:gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white">
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
                Welcome to Bonhoeffer Machines - Your Partner in Progress!
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                Our story began in 2018 under the umbrella of Heine Corporation Private Limited. In the initial six years, we took significant strides in the industry, and in 2023, we proudly established Bonhoeffer Machines Private Limited as our distinct brand.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                In this short span, we&apos;ve ventured into over 17 countries, bringing our innovative products to various corners of the world. Starting our operations in Mexico, we&apos;ve expanded our footprint, reaching as far as Panama with our diverse range of high-quality products.
              </p>
            </div>
            <motion.div
              className="relative w-full aspect-[4/3] md:h-96 rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://bonhoeffermachines.com/en/public/images/about-new/Overview.webp"
                alt="Company Introduction"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder's Desk */}
      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid gap-y-10 md:grid-cols-2 md:gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-full aspect-[4/3] md:h-full rounded-2xl overflow-hidden order-2 md:order-1"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://bonhoeffermachines.com/public/images/about-new/Chairman-desk.webp"
                alt="Founder's Desk"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="text-white order-1 md:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
                From the Founder&apos;s Desk
              </h2>
              <div className="space-y-4 text-base sm:text-md text-gray-300 leading-relaxed">
                <p>
                  At Bonhoeffer Machines, our journey is not just about machines; it&apos;s about building lasting partnerships and contributing to the progress of industries worldwide. Join us on this incredible voyage as we continue to grow and make a positive impact with our cutting-edge solutions.
                </p>
                <p>
                  Currently, we proudly operate in Latin America, Central America, and Asia, bringing the innovative solutions of Bonhoeffer Machines to diverse regions. Our extensive product line encompasses over 4500+ items, catering to the specific needs of agriculture, gardening, forestry, and construction across various segments.
                </p>
                <p>
                  At Bonhoeffer Machines, our dynamic team comprises skilled professionals in Sales, Product Development, Marketing, Supply Chain, and Human Resources. Together, we strive to deliver excellence, ensuring that our machines not only meet but exceed the expectations of our valued customers worldwide. Join us as we continue to grow and make a positive impact on industries across the globe.
                </p>
                <div className="mt-6 pt-4 border-t border-gray-600">
                  <p className="font-semibold text-lg sm:text-xl text-[#989b2e]">Varun Gupta</p>
                  <p className="text-gray-400 text-base sm:text-lg">Founder</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid gap-y-10 md:grid-cols-2 md:gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
                Company Overview
              </h2>
              <div className="space-y-4 text-base sm:text-md text-gray-300 leading-relaxed">
                <p>
                  Bonhoeffer is a premium agriculture, forestry, construction, industrial and gardening machinery, spare parts, and tools brand, working in the three major regions of the world - Central America, Latin America, and Asia. We strive to deliver high-quality machinery for durable and efficient use. Taking the simple belief of changing lives with easy and compatible service--Bonhoeffer delivers the best and most professional power machines. Our products meet the needs of tomorrow with their advanced and sustainable equipment which bridges the gap between nature and people.
                </p>
                <p>
                  At Bonhoeffer Machines, we are a prominent provider of high-quality agriculture & industrial machinery and equipment in more than 16 countries. With a strong commitment to innovation and customer satisfaction, we strive to deliver innovative solutions for various industries.
                </p>
              </div>
            </div>
            <motion.div
              className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                className="w-full h-full min-h-[200px]"
                src="https://www.youtube.com/embed/Gb1rKlc_XNw"
                title="Company Overview Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Presence */}
      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid gap-y-10 md:grid-cols-2 md:gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-full aspect-[4/3] md:h-96 rounded-2xl overflow-hidden order-2 md:order-1"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://bonhoeffermachines.com/en/public/images/about-new/our-presence.webp"
                alt="Our Global Presence"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="text-white order-1 md:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
                Our Global Presence
              </h2>
              <div className="space-y-4 text-base sm:text-md text-gray-300 leading-relaxed">
                <p>
                  At Bonhoeffer Machines, we started with a vision to redefine the machinery industry. Our journey is a testament to our commitment to innovation and quality. In every machine we create, we infuse the essence of precision engineering and durability. Our customers deserve nothing less. Our success is deeply rooted in the trust of our customers. We continuously strive to exceed their expectations. Sustainability is not just a trend; it&apos;s our responsibility.
                </p>
                <p>
                  Our machines are designed with the environment in mind. We believe in the power of partnerships. Together, we build a future where efficiency and sustainability go hand in hand. Bonhoeffer Machines is more than a brand; it&apos;s a promise. A promise of quality, sustainability, and a brighter tomorrow.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
              Leadership Team
            </h2>
            <p className="text-lg sm:text-lg text-gray-300 max-w-2xl sm:max-w-3xl mx-auto">
              Meet the visionary leaders driving our company&apos;s success and innovation
            </p>
          </motion.div>

          <div className="grid gap-y-8 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {hodData.map((hod, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 text-center hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={hod.image}
                    alt={hod.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                  {hod.name}
                </h3>
                <p className="text-[#989b2e] font-medium text-sm sm:text-base">
                  {hod.position}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
              What Makes Us Different
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto">
              Our unique approach combines innovation, quality, and customer-centricity to deliver exceptional value
            </p>
          </motion.div>

          <div className="grid gap-y-8 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#989b2e] mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-y-10 md:grid-cols-2 md:gap-16">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 sm:mb-8">
                <Image
                  src="https://bonhoeffermachines.com/public/images/about-new/Philosophy1.webp"
                  alt="Our Vision"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
                Our Vision
              </h2>
              <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed text-base sm:text-md">
                <p>
                  To be the world&apos;s most trusted partner in agricultural innovation, empowering farmers with cutting-edge technology that enhances productivity while preserving our planet&apos;s resources.
                </p>
                <p>
                  We envision a future where sustainable farming practices meet advanced automation, creating a world where agriculture not only feeds the growing population but also nurtures the environment for generations to come.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 sm:mb-8">
                <Image
                  src="https://bonhoeffermachines.com/public/images/about-new/Philosophy2.webp"
                  alt="Our Mission"
                  fill
                  className="object-top object-cover"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
                Our Mission
              </h2>
              <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed text-base sm:text-md">
                <p>
                  To revolutionize agriculture through innovative machinery solutions that enhance productivity, ensure sustainability, and improve the livelihoods of farmers worldwide.
                </p>
                <p>
                  We are committed to delivering superior quality products backed by exceptional service, comprehensive training, and ongoing support that enables our customers to achieve their agricultural goals.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid gap-y-10 md:grid-cols-2 md:gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
                How We Produce
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                <p>
                  Our manufacturing process combines traditional craftsmanship with cutting-edge technology, ensuring every machine meets our rigorous quality standards.
                </p>
                <p>
                  From precision engineering and advanced metallurgy to automated assembly lines and comprehensive testing protocols, we maintain excellence at every stage of production.
                </p>
                <p>
                  Our ISO-certified facilities utilize sustainable practices, advanced quality control systems, and continuous improvement methodologies to deliver products that exceed customer expectations.
                </p>
              </div>
            </div>
            <motion.div
              className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <video
                className="w-full h-full object-cover min-h-[200px]"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://bonhoeffermachines.com/en/public/images/brand-video-updated.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Find answers to common questions about our products and services
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
              >
                <button
                  className="w-full p-2 sm:p-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-200"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white pr-2 sm:pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-[#989b2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: expandedFaq === index ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4 pt-2 sm:pb-6 sm:pt-4">
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-7 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
              Our Global Offices
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto">
              Reach out to us at any of our global locations for support and assistance
            </p>
          </motion.div>

          <div className="grid gap-y-8 md:grid-cols-3 gap-x-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#989b2e] mb-2 sm:mb-4">
                  {office.title}
                </h3>
                <div className="space-y-2 sm:space-y-3 text-gray-300">
                  <p className="text-xs sm:text-sm leading-relaxed">
                    <span className="font-medium">Address:</span><br />
                    {office.address}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-medium">Phone:</span><br />
                    <a href={`tel:${office.phone}`} className="text-[#989b2e] hover:underline">
                      {office.phone}  
                    </a>
                  </p>
                  <p className="text-xs sm:text-sm ">
                    <span className="font-medium">Email:</span><br />
                    <a href={`mailto:${office.email}`} className="text-[#989b2e] hover:underline break-all">
                      {office.email}
                    </a>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </BgLayout>
  )
}

export default Page
