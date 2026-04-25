'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] font-['Inter'] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-[#3B82F6]/30">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#3B82F6] rounded-full blur-[220px] opacity-[0.06] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[460px] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/[0.06] bg-[#111111]"
      >
        <div className="px-8 py-10 sm:px-12 sm:py-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-10 group w-fit">
            <ImageWithFallback
              src="/imports/FB_IMG_1776752325972.jpg"
              alt="Jilani Home"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <span className="font-['Space_Grotesk'] font-bold text-white text-lg tracking-wide group-hover:text-[#3B82F6] transition-colors">
              Jilani Home
            </span>
          </Link>

          {!sent ? (
            <>
              <h1 className="font-['Space_Grotesk'] text-white mb-1.5" style={{ fontSize: '2rem', fontWeight: 700, lineHeight: '1.2' }}>
                Reset password.
              </h1>
              <p className="text-[#6B7280] mb-8 text-sm leading-relaxed">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#9CA3AF]">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-xl py-3 px-4 text-white placeholder-[#4B5563] text-sm focus:outline-none focus:ring-1 focus:ring-[#3B82F6]/60 focus:border-[#3B82F6]/50 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                >
                  Send Reset Link
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center mx-auto mb-5">
                <Send className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h2 className="font-['Space_Grotesk'] text-white mb-2" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                Check your inbox
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-8">
                If an account exists for that email, we've sent a reset link. Check your spam folder if you don't see it.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
              >
                Try a different email
              </button>
            </motion.div>
          )}

          <div className="flex items-center justify-center mt-8">
            <Link href="/login"
              className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
