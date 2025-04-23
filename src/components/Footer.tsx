import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start">
          {/* Actual Logo */}
          <Link href="/" className="mb-2">
            <Image
              src="/assets/logo.png"
              alt="Boost Construction Co. Logo"
              width={50}
              height={50}
              style={{ height: 'auto' }} // Add style
              unoptimized
            />
          </Link>
          <h3 className="text-xl font-bold mb-2 text-center md:text-left">Boost Construction Co.</h3>
          <p className="text-sm text-center md:text-left">Your trusted partner for construction and building solutions.</p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors"><FaTwitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors"><FaInstagram size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 text-center md:text-left">Quick Links</h4>
          <ul className="space-y-2 text-sm text-center md:text-left">
            <li><Link href="#services" className="hover:underline">Services</Link></li>
            <li><Link href="#portfolio" className="hover:underline">Portfolio</Link></li>
            <li><Link href="#about" className="hover:underline">About Us</Link></li>
            <li><Link href="#contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter (UI Only) */}
        <div>
          <h4 className="font-semibold mb-3 text-center md:text-left">Newsletter</h4>
          <p className="text-sm mb-2 text-center md:text-left">Stay updated with our latest news.</p>
          <form className="flex flex-col sm:flex-row">
            <input type="email" placeholder="Enter your email" className="flex-grow p-2 rounded-t sm:rounded-l sm:rounded-t-none border border-custom bg-background-light dark:bg-background-dark focus:outline-none focus:ring-1 focus:ring-primary-light dark:focus:ring-primary-dark mb-2 sm:mb-0 sm:mr-0" />
            <button type="submit" className="bg-primary-light dark:bg-primary-dark text-white p-2 rounded-b sm:rounded-r sm:rounded-b-none hover:opacity-90 transition-opacity">Sign Up</button>
          </form>
        </div>

        {/* Contact Info (Optional) */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <p className="text-sm">123 Builder Avenue, Metro City</p>
          <p className="text-sm">Phone: (555) 123-4567</p>
          <p className="text-sm">Email: info@boostconstruction.co</p>
        </div>
      </div>
      <div className="text-center text-xs mt-8 border-t border-border-light dark:border-border-dark pt-6 px-4">
        © {new Date().getFullYear()} Boost Construction Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
