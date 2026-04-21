import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTheme } from '../theme-context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 pt-4"
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-3 sm:gap-4 w-full">
        {/* Left: Logo Box (Bento) */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 pr-4 sm:pr-5 shadow-lg h-[52px] hover:bg-white/10 transition-colors">
          <ImageWithFallback 
            src="/src/imports/jilanihome_logo.png" 
            alt="Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-sm"
          />
          <span className="font-['Space_Grotesk'] font-bold text-lg sm:text-xl tracking-wide text-white whitespace-nowrap hidden min-[360px]:block">Jilani Home</span>
        </Link>

        {/* Middle: Nav Links Box (Bento) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-lg h-[52px]">
          <Link to="/listings" className="text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2 rounded-xl transition-all text-sm font-medium h-10 flex items-center">Browse Spaces</Link>
          <a href="/#how-it-works" className="text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2 rounded-xl transition-all text-sm font-medium h-10 flex items-center">How It Works</a>
          <Link to="/pricing" className="text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2 rounded-xl transition-all text-sm font-medium h-10 flex items-center">Pricing</Link>
        </nav>

        {/* Right: Actions Box (Bento) */}
        <div className="flex items-center gap-1 sm:gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-lg h-[52px]">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/login" className="hidden md:flex items-center justify-center text-sm font-medium text-gray-300 hover:text-white px-5 py-2 rounded-xl hover:bg-white/10 transition-all h-10">
            Login
          </Link>
          <Link to="/signup" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium px-4 sm:px-6 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] whitespace-nowrap h-10 flex items-center justify-center">
            Sign Up
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[76px] left-4 right-4 bg-[#141414]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 shadow-2xl md:hidden flex flex-col gap-1 z-50"
          >
            <Link to="/listings" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3.5 rounded-xl transition-all text-base font-medium">Browse Spaces</Link>
            <a href="/#how-it-works" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3.5 rounded-xl transition-all text-base font-medium">How It Works</a>
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3.5 rounded-xl transition-all text-base font-medium">Pricing</Link>
            <div className="h-px w-full bg-white/10 my-2" />
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-left text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3.5 rounded-xl transition-all text-base font-medium">Login</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}