# STACKLY – Premium Movie Explorer Platform

A cinematic, modern, OTT-inspired movie discovery web application crafted for **STACKLY**. Inspired by the visual elegance of Netflix, Apple TV, TMDB, and IMDb with unique editorial layouts and glassmorphic micro-interactions.

---

## 🌟 Highlights & Features

- **Unique Visual Identity**: Custom cinematic dark aesthetic (`#08090D`), glassmorphism, accent glow (`#E5093A`), and gold rating highlights (`#FFB547`).
- **100% Local Curated Assets**: 24 full movie datasets including titles, ratings, genres, release years, runtimes, cast, directors, and taglines.
- **Optimized WebP Image Engine**: All 48 posters and backdrops are strictly below 90 KB (13 KB - 56 KB), converted to WebP format and stored locally under `public/images/`.
- **Dynamic Exploration & Filtering**:
  - Real-time search with clear interaction.
  - Multi-parameter filtering: Genre, Release Year, and Minimum IMDb Rating.
  - Multi-criteria sorting: Highest Rated, Newest First, Oldest First, Title A-Z, and Title Z-A.
  - Active filter chips with individual removal and one-click "Reset Filters".
- **Local-First Favourites Engine**:
  - Persistent watchlist powered by `localStorage`.
  - Non-duplicate, reactive state across all components and pages.
  - Live navbar badge reflecting favourite counts.
  - Toast notifications powered by `react-toastify`.
- **Cinematic Detail Modal**:
  - Full backdrop banner, high-res poster, metadata tags, cast, director, and tagline.
  - Escape key listener, click-outside dismissal, and responsive mobile adaptation.
- **Carousel & Smooth Motion**:
  - Swiper.js integration for horizontal trending and top-rated carousels.
  - Framer Motion page entrances, card hover scaling, and modal animations.
  - Top 10 Trending number rank overlays.

---

## 🛠️ Technology Stack

- **React 19**
- **Vite 6**
- **React Router DOM 7**
- **Framer Motion 12**
- **Swiper 11**
- **Lucide React**
- **React Toastify 11**
- **Pillow (Python)** for automated WebP image generation and compression

---

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```
# Movies
