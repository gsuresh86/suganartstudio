"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Sample artwork data
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
  }
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);

  const filteredArtworks = filter === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.type === filter);

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
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/mandala-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Gallery</h1>
          <p className="text-xl md:text-2xl">
            Explore our collection of handcrafted mandala and lippon art pieces.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 md:mb-0">Artwork Collection</h2>
            <div className="flex space-x-4">
              <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full ${filter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition duration-300`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('mandala')}
                className={`px-6 py-2 rounded-full ${filter === 'mandala' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition duration-300`}
              >
                Mandala
              </button>
              <button 
                onClick={() => setFilter('lippon')}
                className={`px-6 py-2 rounded-full ${filter === 'lippon' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition duration-300`}
              >
                Lippon
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((artwork) => (
              <motion.div 
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:transform hover:scale-105"
                onClick={() => handleArtworkClick(artwork.id)}
              >
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">{artwork.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{artwork.title}</h3>
                  <p className="text-gray-600 font-medium mb-2 capitalize">{artwork.type} Art</p>
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
          </div>
        </div>
      </section>

      {/* Artwork Detail Modal */}
      {selectedArtwork && selectedArtworkData && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedArtworkData.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
                  <p className="text-gray-600 font-medium mb-4 capitalize">{selectedArtworkData.type} Art</p>
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
                  
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
                      Add to Cart
                    </button>
                    <button className="flex-1 border border-gray-700 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
