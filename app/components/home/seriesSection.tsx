import React, { useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Series = {
  title: string;
  poster: string;
  bgimage?: string;
  desc: string;
  backdrop?: string;
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
        <h2 className="text-2xl font-bold relative inline-block">
          {title}
          <span className="block w-12 h-1 bg-red-500 mt-1"></span>
        </h2>
        <Link
          to={`/tv?filter=${encodeURIComponent(filterKey)}`}
          className="border border-white rounded-full px-4 py-1 text-sm hover:bg-white hover:text-black transition"
        >
          View all
        </Link>
      </div>

      <div className="relative">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          grabCursor={true}
        >
          {items.map((Series, idx) => {
            const isHovered = hoveredIndex === idx;
            const isLastThree = idx >= items.length - 3;
            return (
              <SwiperSlide
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ width: 192, minHeight: 288 }}
                className={`flex-shrink-0 relative overflow-visible ${
                  isHovered ? 'z-[1000]' : 'z-10'
                }`}
              >
                <div className="group relative w-48 min-h-[288px] rounded-lg bg-black text-white">
                  <Link to={`/tv/${encodeURIComponent(Series.title)}`}>
                    {/* Poster */}
                    <div className="p-2">
                      <img
                        src={Series.poster}
                        alt={Series.title}
                        className="rounded-md object-cover h-72 w-full"
                      />
                      <p className="text-sm text-center mt-2 font-semibold">
                        {Series.title}
                      </p>
                    </div>
                  </Link>

                  {/* Extended Card */}
                  <div
                    className={`absolute top-0 ${
                      isLastThree ? 'right-full mr-2' : 'left-full ml-2'
                    } w-[512px] h-72 z-[999] rounded-lg overflow-hidden p-2 transition-all duration-300 mt-2
                      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                    `}
                    style={{
                      backgroundImage: `url(${Series.backdrop || Series.backdrop})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      boxShadow: '0 0 32px rgba(0, 0, 0, 0.8), 0 0 64px rgba(0, 0, 0, 0.8), 0 0 128px rgba(0, 0, 0, 0.8), 0 0 256px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    <div className="bg-black/60 backdrop-blur-sm p-4 h-full rounded-md flex flex-col justify-start">
                      <h3 className="text-lg font-bold mb-2">{Series.title}</h3>
                      <p className="text-sm text-gray-300 leading-snug overflow-hidden text-ellipsis">
                        {Series.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
