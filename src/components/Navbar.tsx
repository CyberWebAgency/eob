import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './ui/Logo';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Technology', href: '/technology' },
  { name: 'Products', href: '/products' },
  { name: 'Team', href: '/team' },
  { name: 'Collaborators', href: '/collaborators' },
  { name: 'News', href: '/news' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine if navbar should be transparent:
  // - Only on homepage AND
  // - Only when not scrolled
  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent py-6' : 'bg-white shadow-md py-3'
      }`}
    >
      <nav className="container-custom flex items-center justify-between">
        {/* Logo - Left */}
        <div className="flex-shrink-0 z-10">
          <Link to="/">
            <Logo scrolled={!isTransparent} />
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`font-medium text-sm ${
                isTransparent ? 'text-white hover:text-primary-100' : 'text-gray-900 hover:text-primary-600'
              } transition-colors duration-300`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Get in Touch Button - Right */}
        <div className="hidden md:flex">
          <Link
            to="/contact"
            className={`btn ${
              isTransparent ? 'bg-white text-primary-600 hover:bg-primary-50' : 'btn-primary'
            }`}
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-md ${
              isTransparent ? 'text-white' : 'text-gray-900'
            }`}
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg absolute top-full left-0 right-0`}
      >
        <div className="container-custom py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 font-medium text-gray-900 hover:text-primary-600"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/#contact"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary block text-center mt-4"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;