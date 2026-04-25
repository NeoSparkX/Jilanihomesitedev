'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import FeaturedListings from '@/components/FeaturedListings';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import BottomCTA from '@/components/BottomCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-['Inter'] selection:bg-[#3B82F6]/30 overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <FeaturedListings />
        <HowItWorks />
        {/* <Testimonials /> */}
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}
