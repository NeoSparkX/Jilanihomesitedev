import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import {
  Search, MapPin, Users, Star, Lock, SlidersHorizontal,
  X, CheckCircle2, Wifi, Car, Wind, Mic2, Projector, UtensilsCrossed,
  ChevronDown, Building2, LayoutGrid, List, Sparkles, ArrowUpDown,
  Phone, Mail, Shield
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LISTINGS, type Listing } from '../data/listings';

// ─── Types ───────────────────────────────────────────────────────────────────
type SpaceType = 'All' | 'Office Space' | 'Convention Hall';
type SortOption = 'Newest' | 'Capacity: High to Low' | 'Capacity: Low to High' | 'Top Rated';

// ─── Demo Data ────────────────────────────────────────────────────────────────
// area = approximate neighbourhood (free to view)
// price = visible to all
// Exact address & contact info are always locked behind payment
const LISTINGS_UNUSED_PLACEHOLDER = null; // data imported from ../data/listings

const CITIES = ['All Cities', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Dubai', 'London'];
const CAPACITIES = [
  { label: 'Any Capacity', min: 0, max: Infinity },
  { label: '1 – 20 people', min: 1, max: 20 },
  { label: '21 – 50 people', min: 21, max: 50 },
  { label: '51 – 100 people', min: 51, max: 100 },
  { label: '100 – 500 people', min: 101, max: 500 },
  { label: '500+ people', min: 501, max: Infinity },
];
const ALL_AMENITIES = ['WiFi', 'Parking', 'AC', 'Stage', 'Projector', 'Catering'];

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WiFi:      <Wifi className="w-3.5 h-3.5" />,
  Parking:   <Car className="w-3.5 h-3.5" />,
  AC:        <Wind className="w-3.5 h-3.5" />,
  Stage:     <Mic2 className="w-3.5 h-3.5" />,
  Projector: <Projector className="w-3.5 h-3.5" />,
  Catering:  <UtensilsCrossed className="w-3.5 h-3.5" />,
};

// ─── Card ─────────────────────────────────────────────────────────────────────
function ListingCard({ listing, view }: { listing: Listing; view: 'grid' | 'list' }) {
  const navigate = useNavigate();

  const goToDetail = () => navigate(`/listings/${listing.id}`);
  const stopAndGoSignup = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/signup');
  };

  if (view === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.3 }}
        onClick={goToDetail}
        className="flex flex-col sm:flex-row bg-[#111111] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#3B82F6]/30 transition-all duration-300 group cursor-pointer"
      >
        {/* Image */}
        <div className="relative w-full h-44 sm:w-48 sm:h-auto shrink-0 overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${
              listing.type === 'Office Space'
                ? 'bg-[#3B82F6]/20 border-[#3B82F6]/40 text-[#3B82F6]'
                : 'bg-purple-500/20 border-purple-500/40 text-purple-400'
            }`}>
              {listing.type === 'Office Space' ? '🏢' : '🏛️'} {listing.type}
            </span>
          </div>
        </div>

        {/* Main info */}
        <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4 py-4 px-5">
          {/* Text block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {listing.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />}
              {listing.tag && (
                <span className="text-xs font-semibold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-full">{listing.tag}</span>
              )}
            </div>
            <h3 className="font-['Space_Grotesk'] text-white font-semibold">{listing.title}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-600" />{listing.area}
            </p>
            <p className="text-gray-600 text-xs mt-2 line-clamp-2">{listing.description}</p>

            {/* Inline stats visible on mobile */}
            <div className="flex items-center gap-4 mt-3 sm:hidden">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Users className="w-3.5 h-3.5 text-gray-500" />
                <span>{listing.capacity} people</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <span>{listing.rating} ({listing.reviews})</span>
              </div>
            </div>
          </div>

          {/* Stats — desktop only */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <div className="flex flex-col items-center gap-0.5">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-white text-sm font-medium">{listing.capacity}</span>
              <span className="text-gray-600 text-xs">cap.</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="text-white text-sm font-medium">{listing.rating}</span>
              <span className="text-gray-600 text-xs">{listing.reviews} rev.</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-3 sm:pt-0 border-t border-white/[0.06] sm:border-0">
            <div className="sm:text-right">
              <span className="text-xs text-gray-500 block">Starting from</span>
              <span className="text-white font-['Space_Grotesk'] font-bold">{listing.price}</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-1.5">
                <Lock className="w-3 h-3 text-gray-500 shrink-0" />
                <span className="text-gray-600 text-xs blur-[3px] select-none">+880 1•••-••••••</span>
              </div>
              <Link to="/signup" onClick={e => e.stopPropagation()}>
                <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-[0_0_12px_rgba(59,130,246,0.25)] hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] whitespace-nowrap">
                  Unlock Contact Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Grid card ─────────────────────────────────────────────────────────────
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      onClick={goToDetail}
      className="bg-[#111111] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#3B82F6]/30 transition-all duration-300 group flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />

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

        {/* Tag badge */}
        {listing.tag && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/10 text-white">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              {listing.tag}
            </span>
          </div>
        )}

        {/* Rating chip */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#0D0D0D]/80 backdrop-blur-md rounded-lg px-2 py-1">
          <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
          <span className="text-white text-xs font-semibold">{listing.rating}</span>
          <span className="text-gray-400 text-xs">({listing.reviews})</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Title */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            {listing.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />}
            <span className="text-gray-500 text-xs">Verified listing</span>
          </div>
          <h3 className="font-['Space_Grotesk'] text-white font-semibold leading-snug group-hover:text-[#3B82F6] transition-colors">
            {listing.title}
          </h3>
          {/* Approximate area — FREE */}
          <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-600" />
            {listing.area}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{listing.description}</p>

        {/* Capacity + Amenities */}
        <div className="flex items-center gap-1.5 text-sm text-gray-400">
          <Users className="w-3.5 h-3.5 text-gray-600" />
          <span>Up to {listing.capacity} people</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {listing.amenities.slice(0, 4).map(a => (
            <span
              key={a}
              className="flex items-center gap-1 text-xs text-gray-400 bg-white/[0.05] border border-white/[0.07] px-2 py-1 rounded-lg"
            >
              {AMENITY_ICONS[a]}{a}
            </span>
          ))}
          {listing.amenities.length > 4 && (
            <span className="text-xs text-gray-600 px-1 py-1">+{listing.amenities.length - 4} more</span>
          )}
        </div>

        {/* Price — VISIBLE (free info) */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div>
            <span className="text-gray-600 text-xs block">Starting from</span>
            <span className="text-white font-['Space_Grotesk'] font-semibold">{listing.price}</span>
          </div>
        </div>

        {/* Locked contact section */}
        <div className="relative rounded-xl bg-white/[0.03] border border-white/[0.07] overflow-hidden">
          {/* Blurred fake contact info behind overlay */}
          <div className="p-3 space-y-2 blur-[5px] select-none pointer-events-none opacity-50">
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
          {/* Lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D0D0D]/60 backdrop-blur-[2px] gap-2">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Lock className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Exact address & contacts hidden</span>
            </div>
            <Link to="/signup" onClick={e => e.stopPropagation()}>
              <button className="flex items-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                <Shield className="w-3.5 h-3.5" />
                Unlock Contact Info
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Listings() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<SpaceType>('All');
  const [cityFilter, setCityFilter] = useState('All Cities');
  const [capacityIdx, setCapacityIdx] = useState(0);
  const [amenityFilters, setAmenityFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('Newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleAmenity = (a: string) =>
    setAmenityFilters(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const clearFilters = () => {
    setTypeFilter('All');
    setCityFilter('All Cities');
    setCapacityIdx(0);
    setAmenityFilters([]);
    setSearch('');
  };

  const activeFilterCount = [
    typeFilter !== 'All',
    cityFilter !== 'All Cities',
    capacityIdx !== 0,
    amenityFilters.length > 0,
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    let list = [...LISTINGS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.area.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== 'All') list = list.filter(l => l.type === typeFilter);
    if (cityFilter !== 'All Cities') list = list.filter(l => l.city === cityFilter);
    const cap = CAPACITIES[capacityIdx];
    if (cap.max !== Infinity || cap.min > 0)
      list = list.filter(l => l.capacity >= cap.min && l.capacity <= cap.max);
    if (amenityFilters.length > 0)
      list = list.filter(l => amenityFilters.every(a => l.amenities.includes(a)));
    switch (sortBy) {
      case 'Capacity: High to Low': list.sort((a, b) => b.capacity - a.capacity); break;
      case 'Capacity: Low to High': list.sort((a, b) => a.capacity - b.capacity); break;
      case 'Top Rated':             list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [search, typeFilter, cityFilter, capacityIdx, amenityFilters, sortBy]);

  const SidebarContent = () => (
    <div className="space-y-7">
      {/* Space Type */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Space Type</p>
        <div className="space-y-1">
          {(['All', 'Office Space', 'Convention Hall'] as SpaceType[]).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                typeFilter === t
                  ? 'bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span>{t === 'All' ? '🔍' : t === 'Office Space' ? '🏢' : '🏛️'}</span>{t}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">City</p>
        <div className="space-y-1">
          {CITIES.map(c => (
            <button
              key={c}
              onClick={() => setCityFilter(c)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                cityFilter === c
                  ? 'bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 opacity-60" />{c}
              </span>
              <span className="text-xs text-gray-600">
                {c === 'All Cities' ? LISTINGS.length : LISTINGS.filter(l => l.city === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Capacity */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Capacity</p>
        <div className="space-y-1">
          {CAPACITIES.map((c, idx) => (
            <button
              key={c.label}
              onClick={() => setCapacityIdx(idx)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                capacityIdx === idx
                  ? 'bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Users className="w-3.5 h-3.5 opacity-60" />{c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Amenities</p>
        <div className="grid grid-cols-2 gap-2">
          {ALL_AMENITIES.map(a => (
            <button
              key={a}
              onClick={() => toggleAmenity(a)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all border ${
                amenityFilters.includes(a)
                  ? 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]'
                  : 'border-white/[0.07] text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {AMENITY_ICONS[a]}{a}
            </button>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full text-sm text-gray-500 hover:text-white py-2.5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-['Inter'] overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <div className="pt-28 pb-8 border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Spaces</span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-white mb-1">Browse Spaces</h1>
            <p className="text-gray-500">
              Discover <span className="text-white font-medium">{LISTINGS.length} verified</span> offices & convention halls worldwide.{' '}
              <span className="text-gray-600">Pricing & features are free to view. Unlock contact info when you're ready.</span>
            </p>
          </motion.div>

          {/* Info badge */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="mb-5">
            <div className="inline-flex items-center gap-2.5 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-xl px-4 py-2.5 text-sm text-gray-300">
              <Lock className="w-4 h-4 text-[#3B82F6] shrink-0" />
              <span>Prices, features & approximate locations are <span className="text-white font-medium">free to browse.</span> Exact addresses & contacts are unlocked after a one-time access fee.</span>
            </div>
          </motion.div>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, city or area…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#141414] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3B82F6]/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#141414] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-[#3B82F6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-[#111111] border border-white/[0.07] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="font-['Space_Grotesk'] font-semibold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#3B82F6]" /> Filters
                </span>
                {activeFilterCount > 0 && (
                  <span className="text-xs bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 px-2 py-0.5 rounded-full">
                    {activeFilterCount} active
                  </span>
                )}
              </div>
              <SidebarContent />
            </div>
          </aside>

          {/* Mobile Sidebar Drawer */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                  className="fixed left-0 top-0 bottom-0 w-80 bg-[#111111] border-r border-white/[0.07] z-50 overflow-y-auto p-6 lg:hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-['Space_Grotesk'] font-semibold text-white">Filters</span>
                    <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <SidebarContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400 text-sm">
                <span className="text-white font-medium">{filtered.length}</span> spaces found
                {activeFilterCount > 0 && <span className="text-gray-600"> · filtered</span>}
              </span>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(o => !o)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-[#141414] border border-white/[0.08] rounded-xl px-4 py-2 transition-all"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    {sortBy}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20"
                      >
                        {(['Newest', 'Top Rated', 'Capacity: High to Low', 'Capacity: Low to High'] as SortOption[]).map(s => (
                          <button
                            key={s}
                            onClick={() => { setSortBy(s); setSortOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors ${sortBy === s ? 'text-[#3B82F6] bg-[#3B82F6]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex items-center bg-[#141414] border border-white/[0.08] rounded-xl p-1">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-[#3B82F6] text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-[#3B82F6] text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {typeFilter !== 'All' && (
                  <span className="flex items-center gap-1.5 text-xs bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] px-3 py-1.5 rounded-full">
                    {typeFilter}<button onClick={() => setTypeFilter('All')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {cityFilter !== 'All Cities' && (
                  <span className="flex items-center gap-1.5 text-xs bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] px-3 py-1.5 rounded-full">
                    {cityFilter}<button onClick={() => setCityFilter('All Cities')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {capacityIdx !== 0 && (
                  <span className="flex items-center gap-1.5 text-xs bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] px-3 py-1.5 rounded-full">
                    {CAPACITIES[capacityIdx].label}<button onClick={() => setCapacityIdx(0)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {amenityFilters.map(a => (
                  <span key={a} className="flex items-center gap-1.5 text-xs bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] px-3 py-1.5 rounded-full">
                    {a}<button onClick={() => toggleAmenity(a)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}

            {/* Grid / List */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Building2 className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="font-['Space_Grotesk'] text-white font-semibold mb-2">No spaces found</h3>
                <p className="text-gray-500 text-sm mb-5">Try adjusting your filters or search query.</p>
                <button onClick={clearFilters} className="text-sm text-[#3B82F6] border border-[#3B82F6]/30 px-5 py-2 rounded-xl hover:bg-[#3B82F6]/10 transition-all">
                  Clear all filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'}
              >
                <AnimatePresence mode="sync">
                  {filtered.map(l => (
                    <ListingCard key={l.id} listing={l} view={view} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}