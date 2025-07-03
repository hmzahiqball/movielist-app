import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SeasonCard } from './seasonCard';

type Season = {
  id: number;
  name: string;
  air_date?: string;
  poster_path?: string | null;
  overview?: string;
};

type SeasonSliderProps = {
  seasons: Season[];
  fallbackPoster: string;
};

export function SeasonSlider({ seasons, fallbackPoster }: SeasonSliderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (seasons.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold relative inline-block text-white mb-4">
        Seasons
        <span className="absolute bottom-0 left-0 w-3/4 h-[3px] bg-red-500 rounded-full" />
      </h2>
      <Swiper spaceBetween={16} slidesPerView="auto" grabCursor={true}>
        {seasons.map((season, index) => (
          <SwiperSlide key={season.id} style={{ width: 200 }}>
            <SeasonCard
              name={season.name}
              airDate={season.air_date}
              poster={season.poster_path}
              fallbackPoster={fallbackPoster}
              overview={season.overview}
              isHovered={hoveredIndex === index}
              index={index}
              onHover={setHoveredIndex}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
