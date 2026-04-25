# Latest Changes

## Next.js 15 App Router Migration (Latest)
- **Framework Upgrade**: Successfully migrated the entire project from React Router / Vite 6 to Next.js 15 (App Router).
- **Architecture Restructure**: Removed the `src/` directory entirely, restructuring routing into the `app/` directory and extracting UI into the `components/` directory.
- **Tailwind v4 Integration**: Switched from `@tailwindcss/vite` to `@tailwindcss/postcss`, fully integrating Tailwind v4 with the Next.js build pipeline and maintaining the complex theme overrides.
- **SSR & Hydration Fixes**: Implemented robust hydration guards (`suppressHydrationWarning`), polyfilled the `localStorage` object to prevent Node 25 SSR crashes, and fixed hydration mismatch errors in the framer-motion `FeaturedListings` carousel.
- **Asset Relocation**: Relocated all `figma` and static image assets to `public/imports/` and removed legacy Vite asset resolver plugins.
- **IDE Configuration**: Updated `tsconfig.json` to leverage `@/*` absolute paths and removed `tsconfig.node.json`.

## Redesign & Theme Optimization (2026-04-25)
- **Liquid Glass Aesthetic**: Implemented a premium "Liquid Glass" design system across the Hero section, Navbar, and Info Strip. This includes high-blur backdrop filters, subtle glossy gradients, and frosted border treatments.
- **Hero Section Overhaul**: Redesigned the Hero section for better mobile ergonomics. Reduced vertical height, rearranged primary CTAs to be side-by-side on mobile, and added support for high-legibility Light Mode.
- **Navbar & Mobile Menu**: Optimized the Navbar for narrow screens to prevent element collision. Redesigned the mobile menu overlay into a floating glass panel with a glossy reflection effect.
- **Global Button Styling**: Standardized button text to be white across both Light and Dark modes. Adjusted container backgrounds and introduced the `keep-white` utility to maintain accessibility and contrast.
- **Light Mode Refinement**: Implemented comprehensive Light Mode support for the main landing page components, ensuring background images remain visible while text and interactive elements stay crisp.

## Initial Setup & Architecture
- **Figma to Code**: Initialized the project structure based on the Jilani Home Site Dev Figma designs.
- **Routing Implementation**: Set up `react-router` in `src/app/routes.tsx` to handle navigation across the main pages.
- **UI & Styling**: Integrated TailwindCSS with Vite and configured basic styling.
- **Core Components**: Developed primary structural components including the Navbar, Footer, Hero section, and Featured Listings display.
- **Page Views**: Scaffolded out the main application pages (`Home`, `Listings`, `ListingDetail`, `Pricing`, `Login`, `SignUp`, `ForgotPassword`).
