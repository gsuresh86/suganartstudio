import Link from 'next/link';
import { FiInstagram, FiFacebook, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Suganartstudio</h3>
            <p className="text-gray-300 mb-4">
              Discover the beauty and tranquility of mandala and lippon art. Each piece is handcrafted with love and intention.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/suganartstudio/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent-light transition duration-300">
                <FiInstagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent-light transition duration-300">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent-light transition duration-300">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent-light transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-accent-light transition duration-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-accent-light transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent-light transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <p className="text-gray-300 mb-2">704, Crystal Block, PBEL City, Hyderabad</p>
            <p className="text-gray-300 mb-2">Phone: +91 9000236824</p>
            <p className="text-gray-300 flex items-center">
              <FiMail className="mr-2" /> hsuganya@gmail.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Suganartstudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 