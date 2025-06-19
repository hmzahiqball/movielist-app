import React from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Movie = {
  title: string;
  poster: string;
};

type MovieSectionProps = {
  title: string;
  items: Movie[];
};

export function MovieSection({ title, items }: MovieSectionProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold relative inline-block">
          {title}
          <span className="block w-12 h-1 bg-red-500 mt-1"></span>
        </h2>
        <button className="border border-white rounded-full px-4 py-1 text-sm hover:bg-white hover:text-black transition">
          View all
        </button>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView={'auto'}
        grabCursor={true}
        className="px-1 overflow-visible"
      >
        {items.map((movie, idx) => (
          <SwiperSlide
            key={idx}
            style={{ width: '192px' }} // w-48 (48 * 4 px)
            className="flex-shrink-0 overflow-visible"
          >
            <Link to={`/movie/${encodeURIComponent(movie.title)}`}>
              <div className="flex flex-col items-center">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="rounded-md mb-2 object-cover h-72 w-full"
                />
                <p className="text-md text-center">
                  {movie.title}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
