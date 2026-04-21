import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Play, Eye, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-[24px] pt-[99px] pb-[96px]">
      {/* Premium Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#3B82F6] rounded-full blur-[180px] opacity-[0.15] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen p-[0px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#60A5FA] rounded-full blur-[150px] opacity-[0.1] translate-x-1/2 translate-y-1/2 pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-[0px] pt-[40px] pb-[0px]">
        
        {/* Left Side: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 space-y-10 px-[0px] pt-[20px] pb-[0px]"
        >
          <div className="space-y-6">
            
            
            <h1 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] text-white tracking-tight">
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#93C5FD]">
                Perfect Space
              </span> <br />
              Today
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">Discover high-quality offices and convention halls globally. Join the network to reveal exclusive host details and book directly without hidden fees.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
            <Link to="/listings" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-base font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] group hover:-translate-y-0.5">
              Explore Spaces
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto flex items-center justify-center gap-2 text-white bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 text-base font-semibold hover:-translate-y-0.5 group">
              <div className="bg-white/10 p-1 rounded-full group-hover:bg-white/20 transition-colors">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
              How It Works
            </a>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-4 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
              <span>Pay once</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
              <span>Access for 6 months</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
              <span>No hidden fees</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative z-10 w-full max-w-lg mx-auto lg:ml-auto perspective-1000"
        >
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-3xl bg-[#141414]/90 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] group"
          >
            <div className="h-[280px] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1767277680055-34f1eeec0c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwb2ZmaWNlJTIwc3BhY2UlMjBkYXJrfGVufDF8fHx8MTc3Njc1MzM1OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Premium Space"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <span className="text-white font-medium text-sm">Available</span>
              </div>
            </div>

            <div className="p-7 space-y-5 relative -mt-10">
              <div className="bg-[#1C1C1C] rounded-2xl p-5 border border-white/5 shadow-xl relative z-20">
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-2">The Apex Executive Suite</h3>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> 150 Capacity</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span>Full AV Setup</span>
                </div>

                {/* The "Gated" Section - Smoother, less lock-focused */}
                <div className="mt-5 pt-5 border-t border-white/5 relative">
                  <div className="blur-sm select-none opacity-40 space-y-3 transition-all duration-300 group-hover:blur-[2px]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-600" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-600 rounded w-2/3" />
                        <div className="h-3 bg-gray-600 rounded w-1/3" />
                      </div>
                    </div>
                  </div>

                  {/* Overlay Action */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-5">
                    <Link to="/signup" className="bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-medium px-6 py-2.5 rounded-full backdrop-blur-md transition-all flex items-center gap-2 shadow-lg">
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative floating elements */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-6 left-0 sm:-top-4 sm:-left-8 bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 px-4 py-3 sm:px-5 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-3 sm:gap-4 z-30 scale-90 sm:scale-100 origin-top-left"
          >
            <div className="w-12 h-12 rounded-full bg-[#3B82F6]/20 flex items-center justify-center border border-[#3B82F6]/30">
              <span className="text-[#3B82F6] font-bold text-lg">4.9</span>
            </div>
            <div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-400">Trusted by 500+ users</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}