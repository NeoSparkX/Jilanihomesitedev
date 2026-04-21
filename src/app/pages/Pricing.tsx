import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Check, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../theme-context';

type BillingPeriod = 'monthly' | 'yearly';

interface Feature {
  label: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  sub?: string;
  description: string;
  cta: string;
  ctaLink: string;
  featured: boolean;
  badge?: string;
  features: Feature[];
}

const plans: Record<BillingPeriod, Plan[]> = {
  monthly: [
    {
      name: 'Explorer',
      price: 'Free',
      description: 'Everything you need to start discovering spaces',
      cta: 'Start for free',
      ctaLink: '/signup',
      featured: false,
      features: [
        { label: 'Browse all global listings', included: true },
        { label: 'View prices & capacity info', included: true },
        { label: 'See amenities & photos', included: true },
        { label: 'Save up to 5 spaces', included: true },
        { label: 'Contact info access', included: false },
        { label: 'Priority search results', included: false },
      ],
    },
    {
      name: 'Insider',
      price: '$29',
      sub: '/ month',
      description: 'Unlock direct access to premium venue contacts',
      cta: 'Upgrade to Insider',
      ctaLink: '/signup',
      featured: true,
      badge: 'Most Popular',
      features: [
        { label: 'Everything in Explorer', included: true },
        { label: '15 contact unlocks / month', included: true },
        { label: 'Verified venue details', included: true },
        { label: 'Save unlimited spaces', included: true },
        { label: 'Priority listing results', included: true },
        { label: 'Dedicated account manager', included: false },
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large teams & organisations',
      cta: 'Contact Sales',
      ctaLink: '/signup',
      featured: false,
      features: [
        { label: 'Everything in Insider', included: true },
        { label: 'Unlimited contact unlocks', included: true },
        { label: 'Team seats (10+)', included: true },
        { label: 'API access', included: true },
        { label: 'Custom integrations', included: true },
        { label: 'Dedicated account manager', included: true },
      ],
    },
  ],
  yearly: [
    {
      name: 'Explorer',
      price: 'Free',
      description: 'Everything you need to start discovering spaces',
      cta: 'Start for free',
      ctaLink: '/signup',
      featured: false,
      features: [
        { label: 'Browse all global listings', included: true },
        { label: 'View prices & capacity info', included: true },
        { label: 'See amenities & photos', included: true },
        { label: 'Save up to 5 spaces', included: true },
        { label: 'Contact info access', included: false },
        { label: 'Priority search results', included: false },
      ],
    },
    {
      name: 'Insider',
      price: '$23',
      sub: '/ month',
      description: 'Unlock direct access to premium venue contacts',
      cta: 'Upgrade to Insider',
      ctaLink: '/signup',
      featured: true,
      badge: 'Most Popular',
      features: [
        { label: 'Everything in Explorer', included: true },
        { label: '15 contact unlocks / month', included: true },
        { label: 'Verified venue details', included: true },
        { label: 'Save unlimited spaces', included: true },
        { label: 'Priority listing results', included: true },
        { label: 'Dedicated account manager', included: false },
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large teams & organisations',
      cta: 'Contact Sales',
      ctaLink: '/signup',
      featured: false,
      features: [
        { label: 'Everything in Insider', included: true },
        { label: 'Unlimited contact unlocks', included: true },
        { label: 'Team seats (10+)', included: true },
        { label: 'API access', included: true },
        { label: 'Custom integrations', included: true },
        { label: 'Dedicated account manager', included: true },
      ],
    },
  ],
};

const tabs: { key: BillingPeriod; label: string; save?: string }[] = [
  { key: 'monthly', label: 'Monthly' },
  { key: 'yearly', label: 'Yearly', save: 'Save 20%' },
];

function PlanCard({ plan, index, isLight }: { plan: Plan; index: number; isLight: boolean }) {
  // ── Colour tokens ──────────────────────────────────────────────────────────
  const cardBg        = isLight ? '#FFFFFF'                    : '#111111';
  const cardBorder    = plan.featured
    ? 'rgba(59,130,246,0.4)'
    : isLight ? 'rgba(13,13,13,0.10)' : 'rgba(255,255,255,0.07)';
  const cardShadow    = plan.featured
    ? isLight
      ? '0 0 40px rgba(59,130,246,0.12), 0 4px 24px rgba(0,0,0,0.07)'
      : '0 0 40px rgba(59,130,246,0.15)'
    : isLight
      ? '0 2px 16px rgba(0,0,0,0.06)'
      : 'none';

  const planNameColor = plan.featured ? '#3B82F6' : isLight ? '#6B7280' : '#9CA3AF';
  const priceColor    = isLight ? '#0D0D0D' : '#FFFFFF';
  const subColor      = isLight ? '#9CA3AF' : '#6B7280';
  const descColor     = isLight ? '#6B7280' : '#9CA3AF';

  const ctaBg         = plan.featured
    ? '#3B82F6'
    : isLight ? 'rgba(13,13,13,0.06)' : 'rgba(255,255,255,0.07)';
  const ctaHoverBg    = plan.featured ? '#2563EB'
    : isLight ? 'rgba(13,13,13,0.10)' : 'rgba(255,255,255,0.12)';
  const ctaBorder     = plan.featured
    ? 'transparent'
    : isLight ? 'rgba(13,13,13,0.12)' : 'rgba(255,255,255,0.10)';
  const ctaTextColor  = plan.featured ? '#FFFFFF' : isLight ? '#0D0D0D' : '#FFFFFF';

  const dividerColor  = isLight ? 'rgba(13,13,13,0.08)' : 'rgba(255,255,255,0.07)';
  const sectionLabel  = isLight ? '#9CA3AF' : '#6B7280';

  const inclIconBg    = 'rgba(59,130,246,0.13)';
  const exclIconBg    = isLight ? 'rgba(13,13,13,0.06)' : 'rgba(255,255,255,0.05)';
  const exclIconColor = isLight ? '#A0AEC0' : '#4B5563';

  const inclTextColor = isLight ? '#374151' : '#D1D5DB';
  const exclTextColor = isLight ? '#A0AEC0' : '#4B5563';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        boxShadow: cardShadow,
      }}
    >
      {/* Featured glow top bar */}
      {plan.featured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent" />
      )}

      <div className="p-7 flex-1 flex flex-col">
        {/* Plan header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-sm font-medium tracking-wide"
              style={{ color: planNameColor, fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {plan.name}
            </span>
            {plan.badge && (
              <span
                className="text-xs px-2.5 py-1 rounded-full border"
                style={{
                  color: '#3B82F6',
                  borderColor: 'rgba(59,130,246,0.3)',
                  background: 'rgba(59,130,246,0.08)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {plan.badge}
              </span>
            )}
          </div>

          <div className="flex items-end gap-1 mt-2 mb-3">
            <span
              className="leading-none"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: '2.75rem',
                color: priceColor,
              }}
            >
              {plan.price}
            </span>
            {plan.sub && (
              <span className="mb-1.5 text-sm" style={{ color: subColor }}>
                {plan.sub}
              </span>
            )}
          </div>

          <p className="text-sm" style={{ color: descColor, fontFamily: 'Inter, sans-serif' }}>
            {plan.description}
          </p>
        </div>

        {/* CTA */}
        <Link
          to={plan.ctaLink}
          className="w-full py-2.5 px-5 rounded-xl text-sm font-medium text-center transition-all duration-200 mb-6"
          style={{
            fontFamily: 'Inter, sans-serif',
            background: ctaBg,
            color: ctaTextColor,
            border: `1px solid ${ctaBorder}`,
            boxShadow: plan.featured ? '0 0 20px rgba(59,130,246,0.3)' : 'none',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = ctaHoverBg;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = ctaBg;
          }}
        >
          {plan.cta}
        </Link>

        {/* Divider + features label */}
        <div className="mb-4">
          <div className="h-px w-full mb-4" style={{ background: dividerColor }} />
          <span
            className="text-xs uppercase"
            style={{ color: sectionLabel, fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}
          >
            Included in {plan.name}:
          </span>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-3">
          {plan.features.map((feature) => (
            <li key={feature.label} className="flex items-center gap-3">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: feature.included ? inclIconBg : exclIconBg,
                }}
              >
                {feature.included ? (
                  <Check className="w-3 h-3" style={{ color: '#3B82F6' }} strokeWidth={2.5} />
                ) : (
                  <X className="w-3 h-3" style={{ color: exclIconColor }} strokeWidth={2.5} />
                )}
              </span>
              <span
                className="text-sm"
                style={{
                  color: feature.included ? inclTextColor : exclTextColor,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {feature.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // ── Page-level colour tokens ───────────────────────────────────────────────
  const pageBg         = isLight ? '#F5F6F8' : '#0D0D0D';
  const subtitleColor  = isLight ? '#6B7280'  : '#9CA3AF';
  const toggleBg       = isLight ? 'rgba(13,13,13,0.05)'  : 'rgba(255,255,255,0.04)';
  const toggleBorder   = isLight ? 'rgba(13,13,13,0.10)'  : 'rgba(255,255,255,0.08)';
  const inactiveTabClr = isLight ? '#6B7280'  : '#9CA3AF';
  const noteColor      = isLight ? '#9CA3AF'  : '#4B5563';

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: pageBg, fontFamily: 'Inter, sans-serif' }}
    >
      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">

          {/* ── Hero text ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h1
              className="mb-4 text-white"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                lineHeight: 1.15,
              }}
            >
              Simple, transparent Pricing
            </h1>
            <p
              className="max-w-xl mx-auto"
              style={{
                color: subtitleColor,
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                lineHeight: 1.7,
              }}
            >
              Start free. Upgrade for direct venue contact access,
              priority results, and unlimited opportunities.
            </p>
          </motion.div>

          {/* ── Billing toggle tabs ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            className="flex items-center justify-center mb-14"
          >
            <div
              className="flex items-center gap-1 p-1.5 rounded-2xl"
              style={{
                background: toggleBg,
                border: `1px solid ${toggleBorder}`,
                backdropFilter: 'blur(16px)',
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setBilling(tab.key)}
                  className="relative flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: billing === tab.key ? '#FFFFFF' : inactiveTabClr,
                    background: billing === tab.key ? '#3B82F6' : 'transparent',
                    boxShadow: billing === tab.key ? '0 0 18px rgba(59,130,246,0.35)' : 'none',
                  }}
                >
                  {tab.label}
                  {tab.save && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          billing === 'yearly'
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(59,130,246,0.18)',
                        color: billing === 'yearly' ? '#FFFFFF' : '#3B82F6',
                      }}
                    >
                      {tab.save}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Pricing cards ──────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={billing}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {plans[billing].map((plan, i) => (
                <PlanCard key={plan.name} plan={plan} index={i} isLight={isLight} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom note ────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12 text-sm"
            style={{ color: noteColor, fontFamily: 'Inter, sans-serif' }}
          >
            All plans include a 14-day free trial on paid tiers. No credit card required to start.
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
