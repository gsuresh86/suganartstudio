"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiArrowRight } from 'react-icons/fi';
import { staggerContainer, staggerItem, viewportOnce, pulseScale } from './lib/animations';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const placeholderImages = [
    '/placeholder-art-1.jpg',
    '/placeholder-art-2.jpg',
    '/placeholder-art-3.jpg',
  ];

  // Auto-rotate featured artwork images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === placeholderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [placeholderImages.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { submitContactForm } = await import('./lib/store');
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      alert('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      
      {/* Hero / Banner – gradient from banner image, logo Vridhit 2026, Join button */}
      <section className="relative h-[80vh] flex flex-col items-center justify-between overflow-hidden">
        {/* Banner background: image + gradient overlay (banner color gradient) */}
        <div className="absolute inset-0 bg-[url('/mandala-bg.jpg')] bg-cover bg-center" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: 'linear-gradient(135deg, rgba(67,56,92,0.92) 0%, rgba(94,72,98,0.88) 35%, rgba(139,90,90,0.85) 70%, rgba(166,124,82,0.9) 100%)',
          }}
        />
        {/* Logo: Vridhit 2026 */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/95 drop-shadow-lg">
              Vridhit 2026
            </span>
          </motion.div>
        </div>
        {/* Join button at bottom of banner */}
        <div className="relative z-10 pb-10 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="bg-white/95 text-gray-900 px-10 py-3.5 rounded-full font-semibold text-lg hover:bg-white transition duration-300 inline-block shadow-xl"
              >
                Join
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Artwork Showcase - Animated */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Artwork</motion.h2>
            <motion.div variants={staggerItem} className="w-24 h-1 bg-gray-400 mx-auto mb-6"></motion.div>
            <motion.p variants={staggerItem} className="text-gray-700 text-lg max-w-3xl mx-auto">
              Mandala, Lippon & Dot Mandala — experience the beauty and tranquility of our most popular pieces
            </motion.p>
          </motion.div>
          
          <motion.div
            className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gray-200"
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${placeholderImages[currentImageIndex]})` }}
              >
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 bg-opacity-70">
                  <motion.div
                    variants={pulseScale}
                    initial="initial"
                    animate="animate"
                    className="text-center"
                  >
                    <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 mx-auto flex items-center justify-center">
                      <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-gradient-to-r from-gray-200 to-gray-400 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-white to-gray-200 flex items-center justify-center text-gray-800 font-bold text-xl">
                          Mandala Art
                        </div>
                      </div>
                    </div>
                    <p className="mt-8 text-gray-700 text-xl font-semibold">Harmony Mandala</p>
                    <p className="text-gray-500">A symbol of balance and inner peace</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium">
              View more artwork <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Mandala Art Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Art of Mandala</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-700 text-lg mb-6">
                Mandalas are sacred geometric designs that hold deep spiritual significance in various cultures. The word &quot;mandala&quot; comes from Sanskrit, meaning &quot;circle&quot; or &quot;center.&quot; These intricate patterns represent the universe and are used as tools for meditation, mindfulness, and spiritual growth.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Each mandala is a unique expression of creativity and intention. The process of creating a mandala is meditative in itself, requiring focus, patience, and a steady hand. The resulting artwork serves as a visual reminder of harmony, balance, and the interconnectedness of all things.
              </p>
              <p className="text-gray-700 text-lg">
                Our mandala art pieces are handcrafted with attention to detail and positive energy. They make beautiful additions to any space, bringing a sense of peace and tranquility to your home or office.
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="relative h-[400px] w-full"
                whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                  <motion.div 
                    animate={{ 
                      rotate: 360,
                      transition: { duration: 40, repeat: Infinity, ease: "linear" }
                    }}
                    className="w-64 h-64 border-8 border-gray-300 rounded-full flex items-center justify-center"
                  >
                    <motion.div 
                      animate={{ 
                        rotate: -360,
                        transition: { duration: 30, repeat: Infinity, ease: "linear" }
                      }}
                      className="w-48 h-48 border-8 border-gray-300 rounded-full flex items-center justify-center"
                    >
                      <motion.div 
                        animate={{ 
                          rotate: 360,
                          transition: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                        className="w-32 h-32 border-8 border-gray-300 rounded-full"
                      ></motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Lippon Art Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Beauty of Lippon Art</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="relative h-[400px] w-full"
                whileInView={{ y: [50, 0], opacity: [0, 1] }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                  <motion.div 
                    animate={{ 
                      y: [0, -10, 0],
                      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-72 h-72 flex flex-col items-center justify-center"
                  >
                    <div className="w-full h-4 bg-gray-400 rounded-t-lg"></div>
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gray-400 rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-full h-20 bg-gray-400 rounded-b-lg"></div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-700 text-lg mb-6">
                Lippon art, also known as relief work or raised art, is a three-dimensional art form that creates texture and depth on a flat surface. This technique involves applying layers of material to create raised designs that catch light and shadow, bringing the artwork to life.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                The process of creating lippon art requires skill and precision. Artists carefully build up layers, sculpting and shaping the material to achieve the desired effect. The result is a tactile piece of art that invites viewers to not only see but also feel the artwork.
              </p>
              <p className="text-gray-700 text-lg">
                Our lippon art pieces combine traditional techniques with contemporary designs, creating unique works that add dimension and character to any space. Each piece tells a story through its texture and form, making it a conversation starter and a focal point in your home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dot Mandala Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dot Mandala Art</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-700 text-lg mb-6">
                Dot mandala art uses thousands of carefully placed dots to create stunning radial designs. This meditative technique builds patterns dot by dot, resulting in mesmerizing, intricate pieces that draw the eye to the center.
              </p>
              <p className="text-gray-700 text-lg">
                Our dot mandala artworks are available on canvas, boards, and stones — each piece is unique and made with precision and patience. Perfect for adding a focal point of calm and beauty to any room.
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-[320px] w-full bg-gradient-to-br from-amber-100 via-gray-200 to-stone-300 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="w-56 h-56 rounded-full border-4 border-amber-400/50 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    className="w-40 h-40 rounded-full border-2 border-amber-600/40 flex items-center justify-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-amber-500/30 flex items-center justify-center text-gray-700 font-semibold">Dots</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 px-6 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Artworks</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Explore our collection of Mandala, Lippon & Dot Mandala art. Each piece is handcrafted with love and intention.
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
          >
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item} 
                variants={staggerItem}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.05, 1],
                        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-40 h-40 rounded-full bg-gradient-to-r from-gray-100 to-white flex items-center justify-center"
                    >
                      <div className="text-gray-600 font-semibold">Artwork {item}</div>
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Artwork Title {item}</h3>
                  <p className="text-gray-700 mb-4">A beautiful piece that combines intricate patterns with elegant design.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">₹{(item * 5000) + 9999}</span>
                    <Link href="/gallery" className="text-gray-600 hover:text-gray-900 font-medium flex items-center">
                      View Details <FiArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/gallery" className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-700 transition duration-300 inline-block">
                View All Artworks
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Have questions about our Mandala, Lippon or Dot Mandala art? Interested in a custom piece? Reach out!
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12"
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="bg-gray-100 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gray-200 p-3 rounded-full mr-4">
                    <FiMapPin className="text-gray-700 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Our Location</h4>
                    <p className="text-gray-700">704, Crystal Block, PBEL City, Hyderabad</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-200 p-3 rounded-full mr-4">
                    <FiPhone className="text-gray-700 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone Number</h4>
                    <p className="text-gray-700">+91 9032608401</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-200 p-3 rounded-full mr-4">
                    <FiMail className="text-gray-700 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Email Address</h4>
                    <p className="text-gray-700">hsuganya@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-200 p-3 rounded-full mr-4">
                    <FiInstagram className="text-gray-700 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Instagram</h4>
                    <p className="text-gray-700">
                      <a href="https://www.instagram.com/suganartstudio/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition duration-300">
                        @suganartstudio
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={staggerItem} className="bg-gray-100 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  ></textarea>
                </div>
                
                <button type="submit" disabled={submitting} className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300 disabled:opacity-50">
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
