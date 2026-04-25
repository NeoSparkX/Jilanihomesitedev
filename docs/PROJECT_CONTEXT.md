# Project Context: Jilani Home Site Dev

## Overview
Jilani Home Site Dev is a frontend web application for real estate and property listings. The platform allows users to browse available property listings, view detailed information for specific properties, explore pricing plans, and manage their accounts through authentication pages (login, signup, password recovery).

## Technology Stack
- **Core Library**: React 18+ (Vite 6)
- **Routing**: React Router v7
- **Styling**: TailwindCSS v4 (using `@theme` and native variables)
- **Aesthetic**: "Liquid Glass" (High blur, frosted borders, glossy gradients)
- **Animations**: Framer Motion

## Application Architecture
The project follows a standard React application structure:
- `src/main.tsx` & `src/app/App.tsx`: The application entry points that wrap the app in the necessary theme context and router provider.
- `src/app/routes.tsx`: Centralized routing configuration mapping paths to specific page components.
- `src/app/pages/`: Contains the main view components corresponding to routes:
  - `Home.tsx`: The landing page.
  - `Listings.tsx`: The main property search and listing page.
  - `ListingDetail.tsx`: The detailed view for an individual property listing.
  - `Pricing.tsx`: Pricing and subscription plans.
  - `Login.tsx`, `SignUp.tsx`, `ForgotPassword.tsx`: Authentication flows.
- `src/app/components/`: Reusable UI elements building up the pages (e.g., `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `FeaturedListings.tsx`, `Testimonials.tsx`).
- `src/app/theme-context.tsx`: Manages the application's visual theme context.
