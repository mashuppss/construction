"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Example icons
import { ModeToggle } from './ui/mode-toggle'; // Assuming you have this from shadcn/ui

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#portfolio' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${isScrolled ? 'glassmorphism shadow-md' : 'bg-transparent' // Apply glassmorphism on scroll
        }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/logo.png" // Make sure this path is correct
            alt="Boost Construction Co. Logo"
            width={48} // Adjust size as needed
            height={48}
            className="rounded"
            unoptimized
          />
          <span className="text-2xl font-bold text-primary">Boost Construction Co.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          {/* Social Icons - Desktop */}
          <div className="flex items-center space-x-3 pl-4 border-l border-border">
            <a href="#" aria-label="Facebook" className="text-foreground hover:text-primary"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="text-foreground hover:text-primary"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="text-foreground hover:text-primary"><FaInstagram /></a>
          </div>
          <ModeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ModeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`absolute top-full left-0 right-0 z-40 bg-background shadow-lg md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-[150%]' // Improved animation
          }`}
      >
        <nav className="flex flex-col space-y-4 p-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors text-lg"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {link.name}
            </a>
          ))}
          {/* Social Icons - Mobile */}
          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
            <a href="#" aria-label="Facebook" className="text-foreground hover:text-primary"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="text-foreground hover:text-primary"><FaTwitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="text-foreground hover:text-primary"><FaInstagram size={20} /></a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
