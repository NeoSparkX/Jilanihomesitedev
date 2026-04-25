'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useTheme } from '@/providers/ThemeProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 z-50 flex items-center justify-between gap-2 sm:gap-4"
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4 w-full max-w-7xl mx-auto">
        {/* Left: Logo Box (Bento) */}
        <Link href="/" className="flex items-center gap-2 bg-black/40 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-lg shrink-0 h-[44px] sm:h-[52px] keep-white">
          <ImageWithFallback
            src="/imports/jilanihome_logo.png"
            alt="Jilani Home"
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg object-contain"
          />
          <span className="font-['Space_Grotesk'] font-semibold text-white text-sm sm:text-base pr-1 sm:pr-2 keep-white">Jilani Home</span>
        </Link>

        {/* Middle: Nav Links Box (Bento) */}
        <nav className="hidden md:flex items-center gap-1 bg-black/40 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-lg h-[52px]">
          <Link href="/listings" className="text-white/80 hover:text-white hover:bg-white/10 px-5 py-2 rounded-xl transition-all text-sm font-medium h-10 flex items-center keep-white">Browse Spaces</Link>
          <a href="/#how-it-works" className="text-white/80 hover:text-white hover:bg-white/10 px-5 py-2 rounded-xl transition-all text-sm font-medium h-10 flex items-center keep-white">How It Works</a>
          <Link href="/pricing" className="text-white/80 hover:text-white hover:bg-white/10 px-5 py-2 rounded-xl transition-all text-sm font-medium h-10 flex items-center keep-white">Pricing</Link>
        </nav>

        {/* Right: Actions Box (Bento) */}
        <div className="flex items-center gap-0.5 sm:gap-2 bg-black/40 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-lg h-[44px] sm:h-[52px] shrink-0">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all keep-white"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          <Link href="/login" className="hidden md:flex items-center justify-center text-sm font-medium text-white/80 hover:text-white px-5 py-2 rounded-xl hover:bg-white/10 transition-all h-10 keep-white">
            Login
          </Link>
          <Link href="/signup" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs sm:text-sm font-medium px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] whitespace-nowrap h-8 sm:h-10 flex items-center justify-center keep-white">
            Sign Up
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all keep-white"
          >
            {isOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-[76px] left-4 right-4 bg-black/60 dark:bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-4 shadow-[0_30px_70px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.5)] md:hidden flex flex-col gap-1 z-50 overflow-hidden"
          >
            {/* Glossy Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/10 to-transparent pointer-events-none" />
            
            <Link href="/listings" onClick={() => setIsOpen(false)} className="relative text-white hover:bg-white/10 px-6 py-4 rounded-2xl transition-all text-lg font-bold keep-white">Browse Spaces</Link>
            <a href="/#how-it-works" onClick={() => setIsOpen(false)} className="relative text-white bg-white/10 px-6 py-4 rounded-2xl transition-all text-lg font-bold keep-white">How It Works</a>
            <Link href="/pricing" onClick={() => setIsOpen(false)} className="relative text-white hover:bg-white/10 px-6 py-4 rounded-2xl transition-all text-lg font-bold keep-white">Pricing</Link>
            <div className="relative h-px w-full bg-white/10 dark:bg-white/5 my-2 mx-2" />
            <Link href="/login" onClick={() => setIsOpen(false)} className="relative text-left text-white hover:bg-white/10 px-6 py-4 rounded-2xl transition-all text-lg font-bold keep-white">Login</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
