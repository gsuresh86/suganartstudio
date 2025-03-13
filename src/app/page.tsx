"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiArrowRight } from 'react-icons/fi';

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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-30 bg-[url('/mandala-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Welcome to Suganartstudio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl mb-8"
          >
            Discover the Beauty of Mandala & Lippon Art
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl mb-8"
          >
            Handcrafted with love and intention, our art pieces bring harmony and peace to your space.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/gallery" className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition duration-300 inline-block">
              Explore Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Artwork Showcase - Animated */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Artwork</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Experience the beauty and tranquility of our most popular pieces
            </p>
          </div>
          
          <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
            <motion.div 
              className="absolute inset-0 bg-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* This would be replaced with actual images */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", repeatDelay: 4 }}
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
            </motion.div>
          </div>
          
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Art of Mandala</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 text-lg mb-6">
                Mandalas are sacred geometric designs that hold deep spiritual significance in various cultures. The word "mandala" comes from Sanskrit, meaning "circle" or "center." These intricate patterns represent the universe and are used as tools for meditation, mindfulness, and spiritual growth.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Each mandala is a unique expression of creativity and intention. The process of creating a mandala is meditative in itself, requiring focus, patience, and a steady hand. The resulting artwork serves as a visual reminder of harmony, balance, and the interconnectedness of all things.
              </p>
              <p className="text-gray-700 text-lg">
                Our mandala art pieces are handcrafted with attention to detail and positive energy. They make beautiful additions to any space, bringing a sense of peace and tranquility to your home or office.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
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
            </div>
          </div>
        </div>
      </section>

      {/* About Lippon Art Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Beauty of Lippon Art</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl">
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
            </div>
            <div className="order-1 md:order-2">
              <p className="text-gray-700 text-lg mb-6">
                Lippon art, also known as relief work or raised art, is a three-dimensional art form that creates texture and depth on a flat surface. This technique involves applying layers of material to create raised designs that catch light and shadow, bringing the artwork to life.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                The process of creating lippon art requires skill and precision. Artists carefully build up layers, sculpting and shaping the material to achieve the desired effect. The result is a tactile piece of art that invites viewers to not only see but also feel the artwork.
              </p>
              <p className="text-gray-700 text-lg">
                Our lippon art pieces combine traditional techniques with contemporary designs, creating unique works that add dimension and character to any space. Each piece tells a story through its texture and form, making it a conversation starter and a focal point in your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 px-6 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Artworks</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Explore our collection of handcrafted mandala and lippon art pieces. Each artwork is created with love and intention.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item} 
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                whileInView={{ opacity: [0, 1], y: [50, 0] }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                viewport={{ once: true }}
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
          </div>
          
          <div className="text-center mt-12">
            <Link href="/gallery" className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-700 transition duration-300 inline-block">
              View All Artworks
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Have questions about our artwork or interested in commissioning a custom piece? Reach out to us!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-100 rounded-lg shadow-lg p-8">
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
            </div>
            
            <div className="bg-gray-100 rounded-lg shadow-lg p-8">
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
                
                <button type="submit" className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
