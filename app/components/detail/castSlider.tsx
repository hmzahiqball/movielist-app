import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from 'swiper/modules'
import { fetchMovieCastById } from "../..//lib/api";

interface CastSliderProps {
  movieId: string;
}

export function CastSlider({ movieId }: CastSliderProps) {
  const [cast, setCast] = useState<any[]>([]);

  useEffect(() => {
    const loadCast = async () => {
      try {
        const data = await fetchMovieCastById(movieId);
        setCast(data);
      } catch (err) {
        console.error("Gagal load cast:", err);
      }
    };

    loadCast();
  }, [movieId]);

  if (cast.length === 0) return null;

  return (
    <div className="mt-5">
        <div className="mb-4">
          <h1 className="text-3xl font-bold relative inline-block">
            Full Cast
            <span className="absolute bottom-0 left-0 w-3/4 h-[3px] bg-red-500 rounded-full" />
          </h1>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView="auto"
          grabCursor={true}
          loop={true}
          autoplay={{ delay: 2000 }}
        >
          {cast.map((person, index) => (
            <React.Fragment key={person.id}>
              <SwiperSlide style={{ width: 100 }}>
                <div className="flex flex-col items-center text-white min-w-[100px]">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "https://placehold.co/185x278"
                    }
                    alt={person.name}
                    className="w-30 h-40 rounded-sm object-cover border-white mb-1"
                  />
                  <p className="text-sm font-semibold text-center">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-400 text-center">
                    {person.character}
                  </p>
                </div>
              </SwiperSlide>
              {index === cast.length - 1 && (
                <SwiperSlide style={{ width: 2, backgroundColor: "black" }} />
              )}
            </React.Fragment>
          ))}
        </Swiper>
    </div>
  );
}

