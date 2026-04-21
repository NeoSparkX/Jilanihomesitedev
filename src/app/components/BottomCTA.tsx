import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export default function BottomCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[#0D0D0D]">
        <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#3B82F6] rounded-full blur-[200px] opacity-15 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 tracking-tight">
            Ready to Find Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]">
              Perfect Space?
            </span>
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-12">
            Stop guessing. Unlock verified listings and connect directly with space owners worldwide.
          </p>
          
          <Link to="/signup" className="inline-flex items-center justify-center gap-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-lg font-bold px-10 py-5 rounded-full transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] group hover:-translate-y-1">
            Start Exploring
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
