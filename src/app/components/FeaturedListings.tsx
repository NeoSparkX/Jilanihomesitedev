import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Shield, MapPin, Phone, Wind, Car, Users, Mail, Lock,
  Star, CheckCircle2, Sparkles,
  Wifi, Mic2, Projector, UtensilsCrossed,
} from 'lucide-react';
import { Link } from 'react-router';
import { LISTINGS } from '../data/listings';

// ─── Amenity icon map ─────────────────────────────────────────────────────────
const A_ICONS: Record<string, React.ReactNode> = {
  WiFi:      <Wifi className="w-3.5 h-3.5" />,
  Parking:   <Car className="w-3.5 h-3.5" />,
  AC:        <Wind className="w-3.5 h-3.5" />,
  Stage:     <Mic2 className="w-3.5 h-3.5" />,
  Projector: <Projector className="w-3.5 h-3.5" />,
  Catering:  <UtensilsCrossed className="w-3.5 h-3.5" />,
};

// Card state: 'active' | 'visible' | 'hidden'
type CardState = 'active' | 'visible' | 'hidden';

// ─── Card ─────────────────────────────────────────────────────────────────────
function FeaturedCard({ listing, state }: { listing: typeof LISTINGS[0]; state: CardState }) {
  const animProps =
    state === 'active'  ? { scale: 1,    opacity: 1    } :
    state === 'visible' ? { scale: 0.97, opacity: 0.72 } :
                          { scale: 0.93, opacity: 0.38 };

  return (
    <motion.div
      animate={animProps}
      whileHover={{
        scale: 1.05,
        y: -14,
        zIndex: 30,
        boxShadow: '0 28px 56px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.35)',
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative flex flex-col bg-[#111111] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl h-full"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden shrink-0">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/10 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${
            listing.type === 'Office Space'
              ? 'bg-[#3B82F6]/20 border-[#3B82F6]/40 text-[#3B82F6]'
              : 'bg-purple-500/20 border-purple-500/40 text-purple-400'
          }`}>
            {listing.type === 'Office Space' ? '🏢' : '🏛️'} {listing.type}
          </span>
        </div>

        {/* Tag */}
        {listing.tag && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/10 text-white">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" /> {listing.tag}
            </span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#0D0D0D]/80 backdrop-blur-md rounded-lg px-2 py-1">
          <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
          <span className="text-white text-xs font-semibold">{listing.rating}</span>
          <span className="text-gray-500 text-xs">({listing.reviews})</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            {listing.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />}
            <span className="text-gray-500 text-xs">Verified listing</span>
          </div>
          <h3 className="font-['Space_Grotesk'] text-white font-semibold leading-snug">
            {listing.title}
          </h3>
          <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-600" />
            {listing.area}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-400">
          <Users className="w-3.5 h-3.5 text-gray-600" />
          <span>Up to {listing.capacity} people</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {listing.amenities.slice(0, 3).map(a => (
            <span key={a} className="flex items-center gap-1 text-xs text-gray-400 bg-white/[0.05] border border-white/[0.07] px-2 py-1 rounded-lg">
              {A_ICONS[a]}{a}
            </span>
          ))}
          {listing.amenities.length > 3 && (
            <span className="text-xs text-gray-600 px-1 py-1">+{listing.amenities.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div>
            <span className="text-gray-600 text-xs block">Starting from</span>
            <span className="text-white font-['Space_Grotesk'] font-semibold text-sm">{listing.price}</span>
          </div>
          <Link
            to={`/listings/${listing.id}`}
            className="text-xs text-white bg-[#3B82F6] hover:bg-[#2563EB] px-4 py-2 rounded-lg transition-all font-semibold keep-white"
            onClick={e => e.stopPropagation()}
          >
            View →
          </Link>
        </div>

        {/* Locked contact */}
        <div className="relative rounded-xl bg-white/[0.03] border border-white/[0.07] overflow-hidden mt-auto">
          <div className="p-3 space-y-1.5 blur-[5px] select-none pointer-events-none opacity-50">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>House 12, Road 6, {listing.area.split(',')[0]} 1212</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>+880 1711-234567</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span>contact@venue.com</span>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D0D0D]/60 backdrop-blur-[2px] gap-2 p-3">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Lock className="w-3 h-3 text-[#3B82F6]" />
              <span>Address & contacts locked</span>
            </div>
            <Link to="/signup" onClick={e => e.stopPropagation()}>
              <button className="flex items-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                <Shield className="w-3.5 h-3.5" /> Unlock Info
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Condensed dot pagination (max 7 visible) ─────────────────────────────────
function DotPager({ total, current, onChange }: { total: number; current: number; onChange: (i: number) => void }) {
  const MAX = 7;
  if (total <= MAX) {
    return (
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-1.5 bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    );
  }

  // Sliding window of 7 around current
  let start = Math.max(0, Math.min(current - 3, total - MAX));
  const dots = Array.from({ length: MAX }, (_, i) => start + i);

  return (
    <div className="flex items-center gap-2">
      {start > 0 && <span className="text-gray-600 text-xs">…</span>}
      {dots.map(i => (
        <button
          key={i}
          onClick={() => onChange(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'w-6 h-1.5 bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.6)]'
              : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
          }`}
        />
      ))}
      {start + MAX < total && <span className="text-gray-600 text-xs">…</span>}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function FeaturedListings() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = LISTINGS.length;
  const GAP = 16;
  const PEEK = 40; // px of next card visible on mobile

  // ── Measure container width ──────────────────────────────────────────────
  const getInitialWidth = () => {
    if (typeof window === 'undefined') return 600;
    // Estimate: viewport minus page horizontal padding (px-6 = 24px × 2)
    return Math.min(window.innerWidth, 1280) - 48;
  };
  const [containerWidth, setContainerWidth] = useState(getInitialWidth);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // ── Responsive layout ────────────────────────────────────────────────────
  const cols = containerWidth >= 1024 ? 3 : containerWidth >= 640 ? 2 : 1;

  // cols=1 (mobile): subtract PEEK from both sides + one GAP so next card peeks symmetrically
  // cols>1 (tablet/desktop): fill evenly, no peek needed
  const cardW =
    cols === 1
      ? Math.max(180, containerWidth - 2 * PEEK - GAP)
      : Math.floor((containerWidth - GAP * (cols - 1)) / cols);

  const step   = cardW + GAP;
  const maxIdx = Math.max(0, total - cols);

  const snapTo = (idx: number) => setCurrent(Math.max(0, Math.min(idx, maxIdx)));

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const { offset, velocity } = info;
    const fastSwipe  = Math.abs(velocity.x) > 400;
    const longSwipe  = Math.abs(offset.x) > cardW * 0.3;
    if (fastSwipe || longSwipe) {
      offset.x < 0 ? snapTo(current + 1) : snapTo(current - 1);
    }
    // else spring snaps back to current
  };

  const trackX  = -(current * step);
  const dotCount = maxIdx + 1;

  // Card state per index
  const cardState = (i: number): CardState => {
    if (i === current) return 'active';
    if (i > current && i < current + cols) return 'visible';
    return 'hidden';
  };

  return (
    <section id="browse" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold text-white">
            Premium Spaces,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]">
              Verified
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg px-2 sm:px-0">
            Browse pricing, features & approximate location for free. Unlock the exact address and
            contact details when you're ready to move forward.
          </p>
        </div>

        {/* ── Swipe carousel ──────────────────────────────────────────────── */}
        <div>
          {/* Overflow mask — py-6 gives breathing room for the hover lift */}
          <div
            ref={containerRef}
            className="relative overflow-hidden py-6"
            style={{ touchAction: 'pan-y', cursor: 'grab' }}
          >
            {/* Edge fades */}
            <div className="pointer-events-none absolute left-0 inset-y-0 w-8 sm:w-12 z-10 bg-gradient-to-r from-[#0D0D0D] to-transparent" />
            <div className="pointer-events-none absolute right-0 inset-y-0 w-8 sm:w-12 z-10 bg-gradient-to-l from-[#0D0D0D] to-transparent" />

            {/* Draggable track */}
            <motion.div
              className="flex"
              style={{
                gap: GAP,
                willChange: 'transform',
                paddingLeft: cols === 1 ? PEEK : 0,   // ← left offset so card isn't flush-left
                paddingRight: cols === 1 ? PEEK : 0,  // ← mirror right so last card has breathing room
              }}
              animate={{ x: trackX }}
              transition={{ type: 'spring', stiffness: 300, damping: 34, mass: 0.8 }}
              drag="x"
              dragConstraints={{ left: -(maxIdx * step), right: 0 }}
              dragElastic={{ left: 0.05, right: 0.05 }}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: 'grabbing' }}
            >
              {LISTINGS.map((listing, i) => (
                <div
                  key={listing.id}
                  style={{ width: cardW, flexShrink: 0 }}
                >
                  <FeaturedCard listing={listing} state={cardState(i)} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots + swipe hint */}
          <div className="flex flex-col items-center gap-2.5 mt-4">
            <DotPager total={dotCount} current={current} onChange={snapTo} />
            <p className="text-gray-600 text-[10px] sm:text-xs tracking-widest uppercase">
              swipe to explore
            </p>
          </div>
        </div>

        {/* View all CTA */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            to="/listings"
            className="text-white bg-black/60 dark:bg-transparent border border-white/20 hover:bg-black/70 dark:hover:bg-white/5 hover:border-white/40 px-8 py-3 rounded-full text-sm font-semibold transition-all backdrop-blur-sm keep-white"
          >
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  );
}