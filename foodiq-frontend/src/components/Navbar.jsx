import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' },
    { name: 'Sports', path: '/sports' },
    { name: 'Reports', path: '/reports' },
    { name: 'Menu', path: '/menu' },
  ];

  const isActive = (path) => {
    if (path === '#' ) return false;
    if (path === '/' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  return (
    <nav className="px-6 md:px-10 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <Link to="/" className="text-2xl font-extrabold text-primary tracking-wide">
        FoodIQ
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center text-sm font-semibold text-gray-800">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            className={`transition-all duration-300 hover:text-primary ${
              isActive(link.path) ? 'text-primary border-b-2 border-primary pb-1' : ''
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link to="/login" className="hover:scale-105 transition-all ml-4 bg-primary text-white px-6 py-2 rounded-full shadow-md hover:bg-secondary">
          Login
        </Link>
      </div>

      {/* Mobile Menu Toggle & Login Button */}
      <div className="flex md:hidden items-center gap-4">
        <Link to="/login" className="text-sm font-semibold bg-primary text-white px-4 py-2 rounded-full shadow-md hover:bg-secondary">Login</Link>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-2xl py-6 flex flex-col items-center gap-6 md:hidden animate-in slide-in-from-top duration-300 z-40 border-t border-gray-100">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsMenuOpen(false)}
              className={`font-bold transition-colors ${
                isActive(link.path) ? 'text-primary' : 'text-gray-800 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
