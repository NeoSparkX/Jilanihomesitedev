import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, MapPin, Users, Star, Lock, CheckCircle2,
  Wifi, Car, Wind, Mic2, Projector, UtensilsCrossed,
  Phone, Mail, Shield, Sparkles, ChevronRight, ChevronLeft,
  Share2, Heart, Calendar, Clock, Building2, ZoomIn,
  X, Check,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LISTINGS } from '../data/listings';

// ─── Constants ────────────────────────────────────────────────────────────────
const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WiFi:      <Wifi className="w-4 h-4" />,
  Parking:   <Car className="w-4 h-4" />,
  AC:        <Wind className="w-4 h-4" />,
  Stage:     <Mic2 className="w-4 h-4" />,
  Projector: <Projector className="w-4 h-4" />,
  Catering:  <UtensilsCrossed className="w-4 h-4" />,
};
const AMENITY_LABELS: Record<string, string> = {
  WiFi:      'High-Speed WiFi',
  Parking:   'Parking Available',
  AC:        'Air Conditioning',
  Stage:     'Professional Stage',
  Projector: 'Projector & Screen',
  Catering:  'Catering Service',
};
const TIME_SLOTS = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

// ─── Photo Gallery ────────────────────────────────────────────────────────────
function PhotoGallery({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const prev = useCallback(() => {
    go(current === 0 ? images.length - 1 : current - 1, -1);
  }, [current, images.length, go]);

  const next = useCallback(() => {
    go(current === images.length - 1 ? 0 : current + 1, 1);
  }, [current, images.length, go]);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '6%' : '-6%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-6%' : '6%', opacity: 0 }),
  };

  return (
    <>
      {/* ── Main gallery ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="bg-[#111111] border border-white/[0.07] rounded-2xl overflow-hidden"
      >
        {/* Main image */}
        <div className="relative h-[420px] overflow-hidden bg-[#0a0a0a] group">
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              src={images[current]}
              alt={`${title} – photo ${current + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent pointer-events-none" />

          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0D0D0D]/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#0D0D0D]/90 hover:border-white/20 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0D0D0D]/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#0D0D0D]/90 hover:border-white/20 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5 bg-[#0D0D0D]/70 backdrop-blur-md rounded-lg px-3 py-1.5 text-xs text-gray-300 border border-white/10">
            <span className="text-white font-medium">{current + 1}</span>
            <span className="text-gray-600">/</span>
            <span>{images.length}</span>
          </div>

          {/* Expand button */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute bottom-3 right-4 flex items-center gap-1.5 bg-[#0D0D0D]/70 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-all hover:border-white/20 opacity-0 group-hover:opacity-100"
          >
            <ZoomIn className="w-3.5 h-3.5" /> View all
          </button>

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-4 h-1.5 bg-[#3B82F6]'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-[#0e0e0e] overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                  i === current
                    ? 'ring-2 ring-[#3B82F6] ring-offset-1 ring-offset-[#0e0e0e]'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
            onClick={() => setLightbox(false)}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-6 py-4 shrink-0"
              onClick={e => e.stopPropagation()}
            >
              <span className="text-gray-400 text-sm">
                <span className="text-white font-medium">{current + 1}</span> / {images.length}
              </span>
              <button
                onClick={() => setLightbox(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image */}
            <div
              className="flex-1 flex items-center justify-center px-16 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={prev}
                className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <AnimatePresence custom={direction} mode="wait">
                <motion.img
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  src={images[current]}
                  alt={`${title} – photo ${current + 1}`}
                  className="max-w-full max-h-full object-contain rounded-xl"
                  style={{ maxHeight: 'calc(100vh - 180px)' }}
                />
              </AnimatePresence>

              <button
                onClick={next}
                className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox thumbnails */}
            <div
              className="flex gap-2 justify-center px-6 py-4 overflow-x-auto shrink-0"
              onClick={e => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all ${
                    i === current ? 'ring-2 ring-[#3B82F6]' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Mini Calendar / Date Picker ──────────────────────────────────────────────
function TourRequestPanel({ listingTitle }: { listingTitle: string }) {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted]       = useState(false);
  const navigate = useNavigate();

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };
  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    );
  };
  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const handleRequest = () => {
    if (!selectedDate || !selectedTime) return;
    navigate('/signup');
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.22 }}
      className="bg-[#111111] border border-white/[0.07] rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-0.5">
          <Calendar className="w-4 h-4 text-[#3B82F6]" />
          <h3 className="font-['Space_Grotesk'] text-white font-semibold">Check Availability</h3>
        </div>
        <p className="text-gray-500 text-xs">Pick a date & time slot to request a tour</p>
      </div>

      <div className="p-5 space-y-5">
        {/* ── Calendar ───────────────────────────────────────────────── */}
        <div>
          {/* Month nav */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              className="w-7 h-7 rounded-lg hover:bg-white/[0.07] flex items-center justify-center text-gray-400 hover:text-white transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white text-sm font-medium">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              className="w-7 h-7 rounded-lg hover:bg-white/[0.07] flex items-center justify-center text-gray-400 hover:text-white transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-gray-600 text-[10px] font-medium py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const past = isPast(day);
              const sel = isSelected(day);
              const tod = isToday(day);
              return (
                <button
                  key={day}
                  disabled={past}
                  onClick={() => setSelectedDate(new Date(viewYear, viewMonth, day))}
                  className={`
                    relative mx-auto w-7 h-7 rounded-lg text-xs flex items-center justify-center transition-all
                    ${past ? 'text-gray-700 cursor-not-allowed' : 'hover:bg-white/[0.07] cursor-pointer'}
                    ${sel ? 'bg-[#3B82F6] text-white font-semibold shadow-[0_0_10px_rgba(59,130,246,0.4)] hover:bg-[#3B82F6]' : ''}
                    ${!sel && !past ? 'text-gray-300' : ''}
                  `}
                >
                  {day}
                  {tod && !sel && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#3B82F6]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Time Slots ─────────────────────────────────────────────── */}
        <div>
          <p className="text-gray-500 text-xs font-medium mb-2 uppercase tracking-widest">Time Slot</p>
          <div className="grid grid-cols-3 gap-1.5">
            {TIME_SLOTS.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-2 rounded-lg text-xs transition-all border ${
                  selectedTime === t
                    ? 'bg-[#3B82F6]/15 border-[#3B82F6]/40 text-[#3B82F6] font-medium'
                    : 'border-white/[0.07] text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── Selection summary ──────────────────────────────────────── */}
        {(selectedDate || selectedTime) && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 space-y-1.5"
          >
            {selectedDate && (
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>{formattedDate}</span>
              </div>
            )}
            {selectedTime && (
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>{selectedTime}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <button
          onClick={handleRequest}
          disabled={!selectedDate || !selectedTime}
          className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-xl transition-all ${
            selectedDate && selectedTime
              ? 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-[0_0_16px_rgba(59,130,246,0.35)] hover:shadow-[0_0_24px_rgba(59,130,246,0.55)]'
              : 'bg-white/[0.05] text-gray-600 cursor-not-allowed border border-white/[0.07]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Request a Tour
        </button>
        <p className="text-gray-700 text-xs text-center -mt-2">
          Sign up required to confirm your booking
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const listing = LISTINGS.find(l => l.id === Number(id));
  const similar = listing
    ? LISTINGS.filter(l => l.type === listing.type && l.id !== listing.id).slice(0, 3)
    : [];

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Building2 className="w-16 h-16 text-gray-700" />
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold">Listing not found</h2>
          <p className="text-gray-500">The space you're looking for doesn't exist or was removed.</p>
          <Link
            to="/listings"
            className="mt-2 flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Listings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-['Inter'] overflow-x-hidden">
      <Navbar />

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06] px-[0px] pt-[105px] pb-[24px]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Left: breadcrumb + title */}
            <div>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link to="/listings" className="hover:text-white transition-colors">Listings</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-400 truncate max-w-[200px]">{listing.title}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  listing.type === 'Office Space'
                    ? 'bg-[#3B82F6]/15 border-[#3B82F6]/30 text-[#3B82F6]'
                    : 'bg-purple-500/15 border-purple-500/30 text-purple-400'
                }`}>
                  {listing.type === 'Office Space' ? '🏢' : '🏛️'} {listing.type}
                </span>
                {listing.verified && (
                  <span className="flex items-center gap-1 text-xs text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
                {listing.tag && (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white">
                    <Sparkles className="w-3 h-3 text-[#F59E0B]" /> {listing.tag}
                  </span>
                )}
              </div>

              <h1 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-white">
                {listing.title}
              </h1>
              <p className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                {listing.area}
              </p>
            </div>

            {/* Right: action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 bg-[#141414] border border-white/[0.08] text-gray-300 hover:text-white text-sm px-4 py-2 rounded-xl transition-all hover:border-white/20"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setSaved(s => !s)}
                className={`flex items-center gap-1.5 bg-[#141414] border text-sm px-4 py-2 rounded-xl transition-all ${
                  saved ? 'border-red-500/40 text-red-400' : 'border-white/[0.08] text-gray-300 hover:text-white hover:border-white/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-red-400' : ''} transition-all`} />
                {saved ? 'Saved' : 'Save'}
              </button>
              <button className="flex items-center gap-1.5 bg-[#141414] border border-white/[0.08] text-gray-300 hover:text-white text-sm px-4 py-2 rounded-xl transition-all hover:border-white/20">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left Column ───────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Photo Gallery */}
            <PhotoGallery images={listing.images} title={listing.title} />

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { icon: <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />, label: `${listing.rating} rating`, sub: `${listing.reviews} reviews` },
                { icon: <Users className="w-4 h-4 text-[#3B82F6]" />, label: `Up to ${listing.capacity}`, sub: 'people capacity' },
                { icon: <Clock className="w-4 h-4 text-[#3B82F6]" />, label: 'Daily rental', sub: 'flexible booking' },
                { icon: <Calendar className="w-4 h-4 text-[#3B82F6]" />, label: 'Available now', sub: 'request a tour' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#111111] border border-white/[0.07] rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{s.label}</p>
                    <p className="text-gray-500 text-xs">{s.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="bg-[#111111] border border-white/[0.07] rounded-2xl p-6"
            >
              <h2 className="font-['Space_Grotesk'] text-white font-semibold mb-3">About This Space</h2>
              <p className="text-gray-400 leading-relaxed">{listing.description}</p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#111111] border border-white/[0.07] rounded-2xl p-6"
            >
              <h2 className="font-['Space_Grotesk'] text-white font-semibold mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {listing.amenities.map(a => (
                  <div
                    key={a}
                    className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] shrink-0">
                      {AMENITY_ICONS[a]}
                    </div>
                    <span className="text-gray-300 text-sm">{AMENITY_LABELS[a] ?? a}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="bg-[#111111] border border-white/[0.07] rounded-2xl p-6"
            >
              <h2 className="font-['Space_Grotesk'] text-white font-semibold mb-3">Location</h2>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-medium">{listing.area}</p>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Approximate area shown. Unlock contact info to get the exact street address.
                  </p>
                </div>
              </div>
              <div className="h-36 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.015)_0px,rgba(255,255,255,0.015)_1px,transparent_1px,transparent_16px)]" />
                <div className="flex flex-col items-center gap-2 text-gray-600 relative z-10">
                  <MapPin className="w-6 h-6 text-[#3B82F6]/40" />
                  <span className="text-sm">Exact map unlocked after sign-up</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column ──────────────────────────────────────────────── */}
          <div className="w-full lg:w-80 shrink-0 self-start sticky top-24 space-y-4">

            {/* Price + locked contact */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-[#111111] border border-white/[0.07] rounded-2xl p-6"
            >
              <div className="mb-3">
                <span className="text-gray-500 text-xs block mb-1">Starting from</span>
                <span className="font-['Space_Grotesk'] text-3xl font-bold text-white">{listing.price}</span>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-white font-medium">{listing.rating}</span>
                <span className="text-gray-500 text-sm">({listing.reviews} reviews)</span>
              </div>

              {/* Blurred contact */}
              <div className="relative rounded-xl bg-white/[0.03] border border-white/[0.07] overflow-hidden mb-4">
                <div className="p-4 space-y-3 blur-[5px] select-none pointer-events-none opacity-50">
                  <div className="flex items-center gap-2.5 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>House 12, Road 6, {listing.area.split(',')[0]} 1212</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-400 text-sm">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>+880 1711-234567</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-400 text-sm">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>contact@venue.com</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D0D0D]/65 backdrop-blur-[2px] gap-2 p-4">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs text-center">
                    <Lock className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                    <span>Exact address & contacts are hidden</span>
                  </div>
                  <Link to="/signup" className="w-full">
                    <button className="w-full flex items-center justify-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all shadow-[0_0_14px_rgba(59,130,246,0.35)]">
                      <Shield className="w-4 h-4" /> Unlock Contact Info
                    </button>
                  </Link>
                </div>
              </div>
              <p className="text-gray-600 text-xs text-center">One-time access fee · Cancel anytime</p>
            </motion.div>

            {/* Tour request / date picker */}
            <TourRequestPanel listingTitle={listing.title} />

            {/* Info note */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="bg-[#3B82F6]/[0.07] border border-[#3B82F6]/20 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                <p className="text-gray-400 text-xs leading-relaxed">
                  Price, capacity, amenities and approximate location are{' '}
                  <span className="text-white">free to view</span>. Sign up once to unlock the
                  exact address, phone number and email for this listing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Similar Listings ──────────────────────────────────────────────── */}
        {similar.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-14"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">Similar Spaces</h2>
              <Link to="/listings" className="text-[#3B82F6] text-sm hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map(s => (
                <Link key={s.id} to={`/listings/${s.id}`} className="group block">
                  <div className="bg-[#111111] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#3B82F6]/30 transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-[#0D0D0D]/80 backdrop-blur-md rounded-lg px-2 py-1">
                        <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                        <span className="text-white text-xs font-semibold">{s.rating}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-['Space_Grotesk'] text-white font-semibold text-sm group-hover:text-[#3B82F6] transition-colors leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 shrink-0" />{s.area}
                      </p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                        <span className="text-white text-sm font-semibold font-['Space_Grotesk']">{s.price}</span>
                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          <Users className="w-3 h-3" />{s.capacity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}