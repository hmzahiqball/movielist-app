import React, { useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MovieCard } from '../list/movieCard';

type Series = {
  id: number;
  title: string;
  poster: string;
  bgimage?: string;
  desc: string;
  backdrop?: string;
  genres?: string[];
  firstAirDate?: string;
  rating?: number;
};

type SeriesSectionProps = {
  filterKey: string;
  title: string;
  items: Series[];
};

export function SeriesSection({ title, filterKey, items }: SeriesSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold relative inline-block text-white">
          {title}
          <span className="block w-12 h-1 bg-red-500 mt-1" />
        </h2>
        <Link
          to={`/tv?filter=${encodeURIComponent(filterKey)}`}
          className="border border-white rounded-full px-4 py-1 text-sm hover:bg-white hover:text-black transition"
        >
          View all
        </Link>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        grabCursor={true}
      >
        {items.map((movie, idx) => (
          <SwiperSlide key={movie.id} style={{ width: 200 }}>
            <MovieCard
              type='series'
              id={movie.id}
              title={movie.title}
              poster={movie.poster}
              desc={movie.desc}
              backdrop={movie.backdrop || movie.bgimage}
              firstAirDate={movie.firstAirDate}
              genres={movie.genres}
              rating={movie.rating ?? 0}
              index={idx}
              onHover={setHoveredIndex}
              isHovered={hoveredIndex === idx}
              isLastColumn={idx >= items.length - 3}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
