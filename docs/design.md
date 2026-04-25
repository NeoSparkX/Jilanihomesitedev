# Jilani Home — Design System & UI Architecture

This document outlines the design language, aesthetic philosophy, and styling guidelines for the Jilani Home marketplace platform.

## 1. Design Philosophy
Jilani Home is designed to feel like a **premium, exclusive, and high-end tech platform** while maintaining the accessibility of a modern marketplace. The interface leans heavily into modern web design trends:
- **Light-Mode First:** The default aesthetic is a clean, bright, high-legibility light environment with a sleek dark mode alternative.
- **Glassmorphism:** Widespread use of translucent panels with heavy background blur to create depth and hierarchy without harsh borders.
- **Bento Box Layouts:** UI elements (like the Navbar and property cards) are compartmentalized into soft-rounded, floating "bento" containers.
- **Fluid Motion:** Smooth, physics-based micro-animations for interactions, scrolling, and page reveals.

---

## 2. Typography

The platform utilizes a dual-font strategy via Google Fonts (optimized through `next/font/google`):

### Headings & Brand: **Space Grotesk**
- **Usage:** Logos, massive Hero headings, Section Titles, and highly emphasized metrics.
- **Vibe:** Geometric, modern, slightly architectural, and highly distinctive.
- **CSS Variable:** `--font-space-grotesk`

### Body & UI: **Inter**
- **Usage:** Paragraphs, form inputs, buttons, navigation links, and micro-copy.
- **Vibe:** Highly legible, neutral, and professional.
- **CSS Variable:** `--font-inter`

---

## 3. Color Palette

The color system is explicitly defined in `globals.css` using Tailwind CSS variables and heavily relies on specific hex codes to maintain a strict aesthetic.

### Dark Mode (Default)
- **Backgrounds:** `#0D0D0D` (Main), `#111111` (Cards/Panels), `#050505` (Deep footer/sections).
- **Text:** `#FFFFFF` (Primary), `#9CA3AF` / `text-gray-400` (Secondary), `#6B7280` (Muted).
- **Accents:** 
  - Primary Blue: `#3B82F6` (Interactive elements, primary gradients).
  - Hover Blue: `#2563EB` or `#60A5FA` (For gradient transitions).

### Light Mode
- **Backgrounds:** `#F5F6F8` (Main), `#FFFFFF` (Cards/Panels).
- **Text:** `#0D0D0D` (Primary), `#4B5563` (Secondary).
- *Note:* The light mode is implemented via explicit overrides in `globals.css` targeting the `.light` class, ensuring that glass panels invert their alpha channels correctly (e.g., `dark-alpha` on `light` backgrounds).

---

## 4. UI Components & Glassmorphism

### The "Glass" Formula
Instead of flat colors, floating components (Navbar, floating panels, image overlays) use a consistent glassmorphism recipe:
- **Background:** `bg-black/40` (Dark) or `bg-white/5` (Dark Mode Overlay).
- **Blur:** `backdrop-blur-xl` or `backdrop-blur-[40px]`.
- **Border:** A delicate `border border-white/10` (or `white/5`) to define edges against dark backgrounds.
- **Shadow:** Deep, diffused shadows `shadow-[0_30px_70px_rgba(0,0,0,0.3)]` to separate layers.

### Forms & Inputs
- Inputs use dark surfaces (`bg-[#1A1A1A]`) with subtle `white/10` borders.
- Focus states utilize smooth rings (`focus:ring-[#3B82F6]/60`) instead of harsh outlines.

---

## 5. Animations & Interactions

Interactivity is powered by **Framer Motion (`motion/react`)**.

### Principles
- **Entrance:** Elements gracefully fade and slide up (`y: -20` to `y: 0`, `opacity: 0` to `opacity: 1`) on mount.
- **Easing:** Custom spring physics or bespoke bezier curves (`ease: [0.23, 1, 0.32, 1]`) to prevent linear, robotic movements.
- **Gestures:** Touch-first design. Carousels (like `FeaturedListings.tsx`) are fully draggable with elastic bounds and momentum scrolling.
- **Micro-interactions:** Buttons slightly scale or increase their shadow intensity on hover. Text gradients shimmer.

---

## 6. Theme Implementation (Dark/Light)

The theme system bypasses standard CSS media queries in favor of a strictly controlled class-based approach to prevent Server-Side Rendering (SSR) hydration mismatches in Next.js.

1. **State:** Stored in `localStorage` and managed by `ThemeProvider.tsx`.
2. **SSR Guard:** A safe `localStorage` polyfill sits in `app/layout.tsx` to prevent Node 25 crashes, while `suppressHydrationWarning` on the `<html>` tag prevents React from panicking when the client injects the `.dark` or `.light` class.
3. **Utility overrides:** Light mode is enforced by overriding specific Tailwind arbitrary values (e.g., `html.light .bg-[#0D0D0D] { background-color: #FFFFFF !important; }`) in `globals.css`. This allows developers to write dark-first Tailwind classes in JSX without polluting the markup with dozens of `dark:` prefixes.
