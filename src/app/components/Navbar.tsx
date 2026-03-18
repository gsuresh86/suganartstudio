"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo_mandala.png" 
            alt="Mandala" 
            width={48} 
            height={48} 
            className="h-10 w-10 object-contain" 
            priority
          />
          <span className="text-xl font-semibold text-gray-800 tracking-tight">
            Suganartstudio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900 transition duration-300 link-underline">
            Home
          </Link>
          <Link href="/gallery" className="text-gray-700 hover:text-gray-900 transition duration-300 link-underline">
            Gallery
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900 transition duration-300 link-underline">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition duration-300 link-underline">
            Contact
          </Link>
          <Link href="/admin" className="text-gray-500 hover:text-gray-700 transition duration-300 text-sm">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-50 py-4 px-6"
        >
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition duration-300">
              Home
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-gray-900 transition duration-300">
              Gallery
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition duration-300">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition duration-300">
              Contact
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-gray-900 transition duration-300">
              Admin
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 