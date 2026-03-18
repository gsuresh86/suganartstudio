"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';
import { viewportOnce } from '../lib/animations';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/mandala-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-bold mb-6">About Us</motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl md:text-2xl">
            Mandala · Lippon · Dot Mandala — meet the artist behind every piece.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 0.5 }}>
              <p className="text-gray-700 text-lg mb-6">
                Suganartstudio was founded by a passionate artist with a love for mandala, lippon and dot mandala art. What started as a small studio has grown into a space that showcases handcrafted artwork.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Our mission is to bring the beauty and tranquility of Mandala, Lippon & Dot Mandala art to homes everywhere. We believe art has the power to transform spaces and create peace and harmony.
              </p>
              <p className="text-gray-700 text-lg">
                Each piece is crafted with attention to detail and artistic merit. We work directly with clients to ensure satisfaction and lasting relationships.
              </p>
            </motion.div>
            <motion.div className="rounded-lg overflow-hidden shadow-xl" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 0.5 }}>
              <div className="relative h-[400px] w-full">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Gallery Image</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Artists Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Artist</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Our gallery features the work of a talented artist dedicated to Mandala, Lippon & Dot Mandala art.
            </p>
          </motion.div>
          <motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.5 }}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
              <div className="relative h-64 w-full mb-6">
                <div className="absolute inset-0 bg-gray-200 rounded-full w-48 h-48 mx-auto flex items-center justify-center">
                  <p className="text-gray-500">Artist Photo</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Suganya</h3>
              <p className="text-purple-600 font-medium mb-4 text-center">Mandala, Lippon & Dot Mandala Artist</p>
              <p className="text-gray-700">
                Suganya has been creating beautiful Mandala, Lippon and Dot Mandala art for years. Her designs are inspired by nature, sacred geometry and spiritual traditions. Each piece is crafted with love, intention and meticulous attention to detail.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quality Craftsmanship", description: "We believe in the value of handcrafted art and the skill and dedication that goes into each piece." },
              { title: "Artistic Integrity", description: "We respect the creative vision and preserve the authenticity and integrity of each artwork." },
              { title: "Customer Satisfaction", description: "We are committed to ensuring our customers are delighted with their art and the service they receive." }
            ].map((value, index) => (
              <motion.div key={index} className="bg-gray-50 rounded-lg p-8 shadow-md" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.4, delay: index * 0.1 }}>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-20 px-6 md:px-12 bg-purple-900 text-white">
        <motion.div className="max-w-7xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Follow us on Instagram for new Mandala, Lippon & Dot Mandala artwork and updates.
          </p>
          <motion.a href="https://www.instagram.com/suganartstudio/" target="_blank" rel="noopener noreferrer" className="bg-white text-purple-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition duration-300 inline-flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <FiInstagram className="mr-2" size={20} />
            Follow @suganartstudio
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
} 
