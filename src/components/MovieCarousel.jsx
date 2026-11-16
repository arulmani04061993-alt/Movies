import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

export default function MovieCarousel({
  title,
  subtitle,
  movies = [],
  isFavourite,
  onToggleFavourite,
  onSelectMovie,
  showTrendingRank = false,
  carouselId = 'carousel-1'
}) {
  if (!movies.length) return null;

  const prevClass = `swiper-prev-${carouselId}`;
  const nextClass = `swiper-next-${carouselId}`;

  return (
    <div style={{ position: 'relative' }}>
      <div className="section-title-wrap">
        <div>
          {showTrendingRank && <div className="section-tag">🔥 Curated Daily</div>}
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {/* Carousel Custom Arrows */}
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button className={`carousel-nav-btn ${prevClass}`} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button className={`carousel-nav-btn ${nextClass}`} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, FreeMode]}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`
        }}
        spaceBetween={20}
        slidesPerView={1.3}
        freeMode={true}
        breakpoints={{
          480: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 3.3, spaceBetween: 20 },
          1024: { slidesPerView: 4.3, spaceBetween: 24 },
          1280: { slidesPerView: 5.2, spaceBetween: 24 }
        }}
        style={{ padding: '10px 4px 20px 4px' }}
      >
        {movies.map((movie, idx) => (
          <SwiperSlide key={movie.id}>
            <MovieCard
              movie={movie}
              isFavourite={isFavourite?.(movie.id)}
              onToggleFavourite={onToggleFavourite}
              onSelectMovie={onSelectMovie}
              showTrendingRank={showTrendingRank}
              rank={showTrendingRank ? idx + 1 : null}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
