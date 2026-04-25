# Project Context: Jilani Home Site Dev

## Overview
Jilani Home Site Dev is a frontend web application for real estate and property listings. The platform allows users to browse available property listings, view detailed information for specific properties, explore pricing plans, and manage their accounts through authentication pages (login, signup, password recovery).

## Technology Stack
- **Core Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 (using `@tailwindcss/postcss`)
- **Aesthetic**: "Liquid Glass" (High blur, frosted borders, glossy gradients)
- **Animations**: Framer Motion (`motion/react`)
- **UI Components**: shadcn/ui + Radix UI Primitives

## Application Architecture
The project follows the standard Next.js App Router structure:
- `app/layout.tsx`: The root layout that configures global fonts (Inter & Space Grotesk), manages the `<ThemeProvider>`, and safely handles Server-Side Rendering (SSR) hydration for the `localStorage` theme.
- `app/page.tsx`: The primary landing page.
- `app/listings/page.tsx` & `app/listings/[id]/page.tsx`: The property search and individual listing detail views.
- `app/pricing/page.tsx`: Pricing and subscription plans.
- `app/login/`, `app/signup/`, `app/forgot-password/`: Authentication flow routes.
- `components/`: Reusable UI elements building up the pages (e.g., `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `FeaturedListings.tsx`, `Testimonials.tsx`). Components using hooks or animations are marked with `'use client'`.
- `providers/ThemeProvider.tsx`: Manages the application's visual theme context (Dark/Light mode).
- `styles/globals.css`: The central stylesheet containing Tailwind imports, the custom glassmorphism variant, and light mode overrides.
- `public/imports/`: Contains all static assets and imagery (previously housed in the Vite `src` folder).
