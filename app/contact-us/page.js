'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BgLayout from '@/components/templates/bgLayout';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Firebase imports commented out since they're not being used
// import { db } from '@/lib/firebase';
// import { collection, addDoc, Timestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const departments = [
	{
		name: 'Sales Department',
		email: 'sales@bonhoeffermachines.com',
		description: 'Product inquiries, pricing, and sales support',
		icon: '💼',
		color: 'from-blue-500 to-blue-600',
	},
	{
		name: 'Customer Support',
		email: 'support@bonhoeffermachines.com',
		description: 'Technical assistance and product guidance',
		icon: '🔧',
		color: 'from-green-500 to-green-600',
	},
	{
		name: 'Human Resources',
		email: 'hr@bonhoeffermachines.com',
		description: 'Career opportunities and employment',
		icon: '👥',
		color: 'from-pink-500 to-pink-600',
	},
];

function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		company: '',
		requirement: '',
		designation: '',
		city: '',
		country: '',
		subject: '',
		message: '',
		productInterest: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showThankYou, setShowThankYou] = useState(false);
	const timeoutRef = useRef(null);
	const router = useRouter();

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// // Submit to formsubmit.co (commented out)
		// const form = document.createElement('form');
		// form.action = 'https://formsubmit.co/amit@bonhoeffermachines.com';
		// form.method = 'POST';
		// form.style.display = 'none';
		// Object.entries({
		//   ...formData,
		//   _subject: 'New Lead from Bonhoeffer Website',
		//   _template: 'table',
		// }).forEach(([key, value]) => {
		//   const input = document.createElement('input');
		//   input.type = 'hidden';
		//   input.name = key;
		//   input.value = value;
		//   form.appendChild(input);
		// });
		// document.body.appendChild(form);
		// form.submit();
		// document.body.removeChild(form);

		// EmailJS integration
		try {
			await emailjs.send(
				'service_wbqtbqe',
				'template_dkqzplt',
				{
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					company: formData.company,
					requirement: formData.requirement,
					designation: formData.designation,
					city: formData.city,
					country: formData.country,
					subject: formData.subject,
					message: formData.message,
					productInterest: formData.productInterest,
					time: new Date().toLocaleString(),
				},
				'QmbN9UWU6FADcCGcz'
			);
			setShowThankYou(true);
			setFormData({
				name: '',
				email: '',
				phone: '',
				company: '',
				requirement: '',
				designation: '',
				city: '',
				country: '',
				subject: '',
				message: '',
				productInterest: '',
			});
		} catch (err) {
			alert('There was an error sending the email.');
		}

		// // Firebase logic (commented out)
		// try {
		//   await addDoc(collection(db, 'contacts'), {
		//     ...formData,
		//     createdAt: Timestamp.now(),
		//   });
		//   setShowThankYou(true);
		//   setFormData({
		//     name: '',
		//     email: '',
		//     phone: '',
		//     company: '',
		//     requirement: '',
		//     designation: '',
		//     city: '',
		//     country: '',
		//     subject: '',
		//     message: '',
		//     productInterest: '',
		//   });
		// } catch (error) {
		//   alert('There was an error submitting the form. Please try again.');
		// }
		setIsSubmitting(false);
	};

	// Redirect to home after 10s or when modal is closed
	useEffect(() => {
		if (showThankYou) {
			timeoutRef.current = setTimeout(() => {
				router.push('/');
			}, 10000);
		}
		return () => clearTimeout(timeoutRef.current);
	}, [showThankYou, router]);

	const closeModal = () => {
		setShowThankYou(false);
		router.push('/');
	};

	return (
		<BgLayout>
			{/* Mobile header spacer for fixed header on mobile/tablet */}
      		<div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

			{/* Hero Section */}
			<section className="relative h-[38vh] sm:h-[44vh] md:h-[50vh] overflow-hidden mt-5">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage:
							'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("https://bonhoeffermachines.com/en/public/images/contact-banner-india.webp")',
					}}
				/>
			</section>

			{/* Introduction Text Section */}
			<section className="py-10 sm:py-14 md:py-20 px-2 sm:px-4">
				<div className="max-w-6xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-5 sm:mb-8">
							Let&apos;s Build Something{' '}
							<span className="text-[#9a9c30]">Powerful Together</span>
						</h2>
						<p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
							At Bonhoeffer Machines, we believe in the power of partnership. Whether you&apos;re looking for cutting-edge industrial equipment, technical support, or exploring new business opportunities, our team is here to help you succeed.
						</p>
						<p className="text-base sm:text-lg text-gray-300 leading-relaxed">
							With decades of experience in manufacturing and exporting high-quality machinery, we&apos;re committed to providing solutions that drive your business forward. Connect with us today and discover how we can power your next project.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Contact Form Section */}
			<section className="py-10 sm:py-14 md:py-20 px-2 sm:px-4">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-8 sm:mb-12"
					>
						<h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
							Send Us a Message
						</h2>
						<p className="text-gray-300 text-base sm:text-lg">
							Fill out the form below and we&apos;ll get back to you within 24 hours
						</p>
					</motion.div>

					<motion.form
						onSubmit={handleSubmit}
						className="bg-gray-800/50 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 md:p-12 border border-gray-700 shadow-2xl relative"
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						style={{
							filter: showThankYou ? 'blur(2px)' : 'none',
							pointerEvents: showThankYou ? 'none' : 'auto',
						}}
					>
						{/* Row 1: Name, Email */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
							<div>
								<label className="block text-white font-medium mb-2">
									Full Name *
								</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
									placeholder="Enter your full name"
								/>
							</div>

							<div>
								<label className="block text-white font-medium mb-2">
									Email Address *
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
									placeholder="your.email@company.com"
								/>
							</div>
						</div>

						{/* Row 2: Phone, Company */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
							<div>
								<label className="block text-white font-medium mb-2">
									Phone Number *
								</label>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
									placeholder="+91 98765 43210"
									required
								/>
							</div>

							<div>
								<label className="block text-white font-medium mb-2">Company</label>
								<input
									type="text"
									name="company"
									value={formData.company}
									onChange={handleInputChange}
									className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
									placeholder="Your company name"
								/>
							</div>
						</div>

						{/* Row 3: Requirement, Product Interest */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
							<div>
								<label className="block text-white font-medium mb-2">
									Requirement *
								</label>
								<select
									name="requirement"
									value={formData.requirement}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
								>
									<option value="">Select requirement type</option>
									<option value="buyer">Buyer</option>
									<option value="dealer">Dealer</option>
								</select>
							</div>

							<div>
								<label className="block text-white font-medium mb-2">
									Product Interest
								</label>
								<select
									name="productInterest"
									value={formData.productInterest}
									onChange={handleInputChange}
									className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
								>
									<option value="">Select a category</option>
									<option value="water-pumps">Water Pumps</option>
									<option value="generators">Generators</option>
									<option value="engines">Engines</option>
									<option value="agricultural">Agricultural Equipment</option>
									<option value="cutting-tools">Cutting Tools</option>
									<option value="other">Other</option>
								</select>
							</div>
						</div>

						{/* Row 4: City, Country */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
							<div>
								<label className="block text-white font-medium mb-2">City</label>
								<input
									type="text"
									name="city"
									value={formData.city}
									onChange={handleInputChange}
									className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
									placeholder="Your city"
								/>
							</div>

							<div>
								<label className="block text-white font-medium mb-2">Country</label>
								<input
									type="text"
									name="country"
									value={formData.country}
									onChange={handleInputChange}
									className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
									placeholder="Your country"
								/>
							</div>
						</div>

						{/* Row 5: Designation (full width) */}
						<div className="mb-4 sm:mb-6">
							<label className="block text-white font-medium mb-2">Designation</label>
							<input
								type="text"
								name="designation"
								value={formData.designation}
								onChange={handleInputChange}
								className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
								placeholder="Your designation/title"
							/>
						</div>

						{/* Row 6: Subject (full width) */}
						<div className="mb-4 sm:mb-6">
							<label className="block text-white font-medium mb-2">Subject *</label>
							<input
								type="text"
								name="subject"
								value={formData.subject}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
								placeholder="What's this about?"
							/>
						</div>

						{/* Row 7: Message (full width) */}
						<div className="mb-6 sm:mb-8">
							<label className="block text-white font-medium mb-2">Message *</label>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleInputChange}
								required
								rows={6}
								className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300 resize-none"
								placeholder="Tell us about your requirements, questions, or how we can help you..."
							/>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full py-3 bg-[#9a9c30] hover:bg-[#7a7d24] text-white font-bold rounded-lg transition-colors text-base sm:text-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{isSubmitting ? 'Submitting...' : 'Submit'}
						</button>
					</motion.form>

					{/* Animated Thank You Modal */}
					<AnimatePresence>
						{showThankYou && (
							<motion.div
								className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<motion.div
									className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center border border-[#989b2e] relative"
									initial={{ scale: 0.8, opacity: 0, y: 60 }}
									animate={{ scale: 1, opacity: 1, y: 0 }}
									exit={{ scale: 0.8, opacity: 0, y: 60 }}
									transition={{ type: 'spring', stiffness: 300, damping: 25 }}
								>
									<button
										onClick={closeModal}
										className="absolute top-4 right-4 text-gray-400 hover:text-[#989b2e] text-2xl font-bold focus:outline-none"
									>
										&times;
									</button>
									<Image
										src="https://bonhoeffermachines.com/en/public/images/Event-Banner.jpg"
										alt="Thank You Banner"
										width={480}
										height={120}
										className="object-cover rounded-xl mx-auto mb-6"
									/>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 }}
									>
										<h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
											Thank you for reaching out to Bonhoeffer!
										</h1>
										<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
											We will get back to you as soon as possible with a response.
											In the meantime, please feel free to explore and know more
											about Bonhoeffer along with its product offerings across the
											various segments.
										</p>
										<p className="text-md text-gray-400 max-w-xl mx-auto mb-2">
											You can also reach out to us at{' '}
											<a
												href="mailto:support@bonhoeffermachines.com"
												className="underline text-[#989b2e]"
											>
												support@bonhoeffermachines.com
											</a>{' '}
											for any urgent queries or requirement of additional
											information.
										</p>
									</motion.div>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</section>

			{/* Contact Information Section */}
			<section className="py-10 sm:py-14 md:py-20 px-2 sm:px-4">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-10 sm:mb-16"
					>
						<h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
							Reach Out to Us
						</h2>
						<p className="text-gray-300 text-base sm:text-lg">
							Multiple ways to connect with our team
						</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-8">
						<motion.div
							className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-[#9a9c30] transition-all duration-300 transform hover:scale-105"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
						>
							<div className="text-4xl mb-4">📧</div>
							<h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
							<p className="text-gray-300 mb-4">Send us an email anytime</p>
							<a
								href="mailto:support@bonhoeffermachines.com"
								className="text-[#9a9c30] hover:text-[#8a8c20] break-all font-medium"
							>
								support@bonhoeffermachines.com
							</a>
						</motion.div>

						<motion.div
							className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-[#9a9c30] transition-all duration-300 transform hover:scale-105"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<div className="text-4xl mb-4">📞</div>
							<h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
							<p className="text-gray-300 mb-4">Speak with our team directly</p>
							<a
								href="tel:+919667515523"
								className="text-[#9a9c30] hover:text-[#8a8c20] font-medium"
							>
								+91 96675 15523
							</a>
						</motion.div>

						<motion.div
							className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-[#9a9c30] transition-all duration-300 transform hover:scale-105"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
						>
							<div className="text-4xl mb-4">💬</div>
							<h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
							<p className="text-gray-300 mb-4">Quick messages and support</p>
							<a
								href="https://wa.me/919667515523"
								className="text-[#9a9c30] hover:text-[#8a8c20] font-medium"
							>
								+91 96675 15523
							</a>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Department Emails Section */}
			<section className="py-10 sm:py-14 md:py-20 px-2 sm:px-4">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-10 sm:mb-16"
					>
						<h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
							Department Contacts
						</h2>
						<p className="text-gray-300 text-base sm:text-lg">
							Connect directly with the right department for faster assistance
						</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						{departments.map((dept, index) => (
							<motion.div
								key={dept.name}
								className={`bg-gradient-to-br ${dept.color} p-1 rounded-2xl hover:scale-105 transition-all duration-300`}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: index * 0.01 }}
								viewport={{ once: true }}
							>
								<div className="bg-gray-900 rounded-xl p-6 h-full">
									<div className="text-3xl mb-4">{dept.icon}</div>
									<h3 className="text-xl font-bold text-white mb-2">
										{dept.name}
									</h3>
									<p className="text-gray-300 text-sm mb-4">
										{dept.description}
									</p>
									<a
										href={`mailto:${dept.email}`}
										className="text-white font-medium hover:text-gray-300 transition-colors break-all"
									>
										{dept.email}
									</a>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Corporate Office Address */}
			<section className="py-10 sm:py-14 md:py-20 px-2 sm:px-4">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-8 sm:mb-12"
					>
						<h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
							Corporate Office
						</h2>
						<p className="text-gray-300 text-base sm:text-lg">
							Visit us at our headquarters
						</p>
					</motion.div>

					<motion.div
						className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 md:p-12 border border-gray-700 text-center"
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<div className="text-3xl sm:text-5xl mb-4 sm:mb-6">🏢</div>
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
							Bonhoeffer Machines Pvt. Ltd.
						</h3>

						<div className="space-y-2 sm:space-y-4 text-gray-300 text-base sm:text-lg">
							<p>Plot No. 756, 2nd Floor, Udyog Vihar Phase -5</p>
							<p>Gurugram, Haryana 122016</p>
							<p>India</p>
						</div>

						<div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700">
							<h4 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">
								Business Hours
							</h4>
							<div className="grid grid-cols-1 gap-2 sm:gap-4 text-gray-300">
								<div>
									<p className="font-medium text-base sm:text-lg">Monday - Friday</p>
									<p>10:00 AM - 6:00 PM IST</p>
								</div>
								{/* <div>
                        <p className="font-medium">Saturday</p>
                        <p>9:00 AM - 1:00 PM IST</p>
                        </div> */}
							</div>
						</div>

						<motion.button
							className="mt-6 sm:mt-8 bg-[#9a9c30] text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-[#8a8c20] transition-all duration-300 text-base sm:text-lg"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => window.open('https://maps.app.goo.gl/YFtj4tyftwo91y8w6', '_blank')}
						>
							📍 View on Google Maps
						</motion.button>
					</motion.div>
				</div>
			</section>
		</BgLayout>
	);
}

export default ContactPage;
