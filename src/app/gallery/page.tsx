"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '../lib/animations';

// Art types: Mandala, Lippon, Dot Mandala
const artworks = [
  {
    id: 1,
    title: "Cosmic Harmony",
    type: "mandala",
    price: 19999,
    description: "A vibrant mandala representing the cosmic balance of the universe. This piece features intricate patterns in shades of blue, purple, and gold.",
    dimensions: "24\" x 24\"",
    medium: "Acrylic on canvas"
  },
  {
    id: 2,
    title: "Sacred Geometry",
    type: "mandala",
    price: 14999,
    description: "Inspired by ancient sacred geometry, this mandala combines mathematical precision with artistic beauty. The piece radiates with energy and balance.",
    dimensions: "18\" x 18\"",
    medium: "Mixed media on wood panel"
  },
  {
    id: 3,
    title: "Floral Emergence",
    type: "lippon",
    price: 24999,
    description: "A stunning lippon art piece featuring raised floral patterns that catch light and create beautiful shadows. The textured surface invites touch and exploration.",
    dimensions: "20\" x 30\"",
    medium: "Lippon technique on canvas"
  },
  {
    id: 4,
    title: "Ocean Waves",
    type: "lippon",
    price: 29999,
    description: "This lippon art piece captures the movement and rhythm of ocean waves through its textured surface. The piece brings a sense of calm and tranquility to any space.",
    dimensions: "24\" x 36\"",
    medium: "Lippon technique on wood panel"
  },
  {
    id: 5,
    title: "Meditation Circle",
    type: "mandala",
    price: 12999,
    description: "A serene mandala designed to aid in meditation and mindfulness practices. The gentle colors and balanced patterns create a focal point for contemplation.",
    dimensions: "16\" x 16\"",
    medium: "Watercolor on paper"
  },
  {
    id: 6,
    title: "Mountain Landscape",
    type: "lippon",
    price: 21999,
    description: "A lippon art representation of a mountain landscape, with raised textures creating a three-dimensional effect. The piece brings the majesty of nature into your home.",
    dimensions: "18\" x 24\"",
    medium: "Lippon technique on canvas"
  },
  {
    id: 7,
    title: "Lotus Bloom",
    type: "mandala",
    price: 17999,
    description: "A mandala centered around the sacred lotus flower, symbolizing purity and enlightenment. The intricate details and vibrant colors make this piece a focal point in any room.",
    dimensions: "20\" x 20\"",
    medium: "Acrylic on canvas"
  },
  {
    id: 8,
    title: "Abstract Terrain",
    type: "lippon",
    price: 26999,
    description: "An abstract representation of natural terrain through the lippon technique. The textured surface creates an ever-changing play of light and shadow throughout the day.",
    dimensions: "24\" x 30\"",
    medium: "Lippon technique on wood panel"
  },
  {
    id: 9,
    title: "Celestial Dance",
    type: "mandala",
    price: 19999,
    description: "A mandala inspired by the movement of celestial bodies. This piece captures the dance of stars and planets in a harmonious pattern.",
    dimensions: "22\" x 22\"",
    medium: "Mixed media on canvas"
  },
  {
    id: 10,
    title: "Sacred Dots",
    type: "dot-mandala",
    price: 15999,
    description: "A dot mandala built with thousands of precise dots in concentric circles. Meditative and eye-catching.",
    dimensions: "18\" x 18\"",
    medium: "Acrylic dots on canvas"
  },
  {
    id: 11,
    title: "Ocean Dots",
    type: "dot-mandala",
    price: 18999,
    description: "Dot mandala in shades of blue and teal, evoking the calm of the ocean.",
    dimensions: "20\" x 20\"",
    medium: "Acrylic dots on wooden board"
  }
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);
  const [enquiryProductId, setEnquiryProductId] = useState<number | null>(null);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', phone: '', message: '' });

  const filteredArtworks = filter === 'all'
    ? artworks
    : artworks.filter(artwork => artwork.type === filter);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product enquiry:', { productId: enquiryProductId, ...enquiryForm });
    alert('Thank you! We will get back to you soon with details.');
    setEnquiryForm({ name: '', email: '', phone: '', message: '' });
    setEnquiryProductId(null);
  };

  const handleArtworkClick = (id: number) => {
    setSelectedArtwork(id);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  const selectedArtworkData = artworks.find(artwork => artwork.id === selectedArtwork);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/mandala-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            Mandala · Lippon · Dot Mandala — handcrafted art pieces.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 md:mb-0">Artwork Collection</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {(['all', 'mandala', 'lippon', 'dot-mandala'] as const).map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-2 rounded-full ${filter === f ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition duration-300`}
                >
                  {f === 'all' ? 'All' : f === 'dot-mandala' ? 'Dot Mandala' : f.charAt(0).toUpperCase() + f.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
          >
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                variants={staggerItem}
                className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleArtworkClick(artwork.id)}
              >
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">{artwork.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{artwork.title}</h3>
                  <p className="text-gray-600 font-medium mb-2 capitalize">{artwork.type.replace('-', ' ')} Art</p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{artwork.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">₹{artwork.price}</span>
                    <button className="text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Artwork Detail Modal */}
      {selectedArtwork && selectedArtworkData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedArtworkData.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none p-1"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">{selectedArtworkData.title}</p>
                </div>

                <div>
                  <p className="text-gray-600 font-medium mb-4 capitalize">{selectedArtworkData.type.replace('-', ' ')} Art</p>
                  <p className="text-gray-700 mb-6">{selectedArtworkData.description}</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="text-gray-900">{selectedArtworkData.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medium:</span>
                      <span className="text-gray-900">{selectedArtworkData.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-gray-700 font-semibold">₹{selectedArtworkData.price}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button className="flex-1 min-w-[120px] bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setEnquiryProductId(selectedArtwork)}
                      className="flex-1 min-w-[120px] border border-gray-700 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                    >
                      Product Enquiry
                    </button>
                  </div>

                  {/* Inline Product Enquiry Form */}
                  {enquiryProductId === selectedArtwork && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Send Enquiry for {selectedArtworkData.title}</h4>
                      <form onSubmit={handleEnquirySubmit} className="space-y-4">
                        <div>
                          <label htmlFor="enq-name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                          <input id="enq-name" type="text" required value={enquiryForm.name} onChange={(e) => setEnquiryForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500" placeholder="Your name" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="enq-email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input id="enq-email" type="email" required value={enquiryForm.email} onChange={(e) => setEnquiryForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500" placeholder="your@email.com" />
                          </div>
                          <div>
                            <label htmlFor="enq-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input id="enq-phone" type="tel" value={enquiryForm.phone} onChange={(e) => setEnquiryForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500" placeholder="+91" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="enq-msg" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                          <textarea id="enq-msg" rows={3} value={enquiryForm.message} onChange={(e) => setEnquiryForm(f => ({ ...f, message: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500" placeholder="Questions about size, customisation, delivery..." />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700">Submit Enquiry</button>
                          <button type="button" onClick={() => { setEnquiryProductId(null); setEnquiryForm({ name: '', email: '', phone: '', message: '' }); }} className="border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50">Cancel</button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Commission Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Custom Commissions</h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Looking for something unique? We offer custom artwork commissions tailored to your preferences and space.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Custom Artwork Image</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Commission a Custom Artwork?</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gray-200 text-gray-700 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-700">Get a unique piece that perfectly matches your space and personal style.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-200 text-gray-700 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-700">Choose your preferred colors, patterns, and dimensions.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-200 text-gray-700 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-700">Work directly with the artist to create something meaningful and personal.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-200 text-gray-700 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-700">Receive progress updates and provide feedback throughout the creation process.</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <a href="/contact" className="bg-gray-700 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition duration-300 inline-block">
                    Request a Commission
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
