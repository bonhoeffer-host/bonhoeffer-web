'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import BgLayout from '@/components/templates/bgLayout'

function Page() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // HOD data
  const hodData = [
    
    { name: "Rajat Sahni", position: "CEO - LATAM", image: "/about/hod/Rajat-Sahni.webp" },
    { name: "Sudhanshu Pandey", position: "CEO - India", image: "/about/hod/Sudhanshu-Pandey.webp" },
    { name: "Sachin Sharma", position: "Finance Controller", image: "/about/hod/Sachin-Sharma.webp" }
    
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
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://9lhi1aprmhe38img.public.blob.vercel-storage.com/About-us-new-banner.webp"
            alt="About Us Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <motion.div 
          className="relative z-10 text-center text-white px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="text-2xl md:text-3xl max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Pioneering Innovation Across the Globe
          </motion.p>
        </motion.div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#989b2e]">
                Welcome to Bonhoeffer Machines - Your Partner in Progress!
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Our story began in 2018 under the umbrella of Heine Corporation Private Limited. In the initial six years, we took significant strides in the industry, and in 2023, we proudly established Bonhoeffer Machines Private Limited as our distinct brand.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                In this short span, we&apos;ve ventured into over 17 countries, bringing our innovative products to various corners of the world. Starting our operations in Mexico, we&apos;ve expanded our footprint, reaching as far as Panama with our diverse range of high-quality products.
              </p>
            </div>
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Overview.webp"
                alt="Company Introduction"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder&apos;s Desk */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative h-full rounded-2xl overflow-hidden order-2 md:order-1"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://9lhi1aprmhe38img.public.blob.vercel-storage.com/founder-desk.webp"
                alt="Founder&apos;s Desk"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="text-white order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#989b2e]">
                From the Founder&apos;s Desk
              </h2>
              <div className="space-y-4 text-md text-gray-300 leading-relaxed">
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
                  <p className="font-semibold text-xl text-[#989b2e]">Varun Gupta</p>
                  <p className="text-gray-400 text-lg">Founder</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#989b2e]">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the visionary leaders driving our company&apos;s success and innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hodData.map((hod, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={hod.image}
                    alt={hod.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {hod.name}
                </h3>
                <p className="text-[#989b2e] font-medium">
                  {hod.position}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#989b2e]">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our unique approach combines innovation, quality, and customer-centricity to deliver exceptional value
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-[#989b2e] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
                <Image
                  src="https://9lhi1aprmhe38img.public.blob.vercel-storage.com/vision.webp"
                  alt="Our Vision"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#989b2e]">
                Our Vision
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
                <Image
                  src="https://9lhi1aprmhe38img.public.blob.vercel-storage.com/mission-copy.png"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#989b2e]">
                Our Mission
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
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

      {/* FAQs */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#989b2e]">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
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
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-200"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
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
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#989b2e]">
              Our Global Offices
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Reach out to us at any of our global locations for support and assistance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-[#989b2e] mb-4">
                  {office.title}
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium">Address:</span><br />
                    {office.address}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span><br />
                    <a href={`tel:${office.phone}`} className="text-[#989b2e] hover:underline">
                      {office.phone}  
                    </a>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span><br />
                    <a href={`mailto:${office.email}`} className="text-[#989b2e] hover:underline">
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
