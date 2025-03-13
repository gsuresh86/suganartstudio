import React from 'react';
import Image from 'next/image';
import { FiInstagram } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/mandala-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl">
            Meet the artists behind the beautiful mandala and lippon art pieces.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 text-lg mb-6">
                Suganartstudio was founded by a passionate artist who shared a love for mandala and lippon art. What started as a small studio in a quiet neighborhood has grown into a thriving gallery that showcases beautiful artwork.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Our mission is to bring the beauty and tranquility of mandala and lippon art to homes and spaces everywhere. We believe that art has the power to transform environments and create a sense of peace and harmony.
              </p>
              <p className="text-gray-700 text-lg">
                Each piece in our gallery is carefully crafted with attention to detail, quality, and artistic merit. We work directly with clients to ensure their satisfaction and to build lasting relationships.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <div className="relative h-[400px] w-full">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Gallery Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Artists Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Artist</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Our gallery features the work of a talented artist who is dedicated to her craft and passionate about creating beautiful art.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
              <div className="relative h-64 w-full mb-6">
                <div className="absolute inset-0 bg-gray-200 rounded-full w-48 h-48 mx-auto flex items-center justify-center">
                  <p className="text-gray-500">Artist Photo</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Suganya</h3>
              <p className="text-purple-600 font-medium mb-4 text-center">Mandala & Lippon Artist</p>
              <p className="text-gray-700">
                Suganya has been creating beautiful mandala and lippon art for many years. Her intricate designs are inspired by nature, sacred geometry, and spiritual traditions. Each piece is crafted with love, intention, and meticulous attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Craftsmanship",
                description: "We believe in the value of handcrafted art and the skill and dedication that goes into creating each piece."
              },
              {
                title: "Artistic Integrity",
                description: "We respect the creative vision and work to preserve the authenticity and integrity of each artwork."
              },
              {
                title: "Customer Satisfaction",
                description: "We are committed to ensuring our customers are delighted with their art purchases and the service they receive."
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-20 px-6 md:px-12 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Follow us on Instagram to stay updated on new artwork, artist features, and upcoming events.
          </p>
          <a 
            href="https://www.instagram.com/suganartstudio/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white text-purple-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition duration-300 inline-flex items-center"
          >
            <FiInstagram className="mr-2" size={20} />
            Follow @suganartstudio
          </a>
        </div>
      </section>
    </div>
  );
} 