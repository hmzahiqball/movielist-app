import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { fetchMovieVideoById } from "../../lib/api";
import LazyYoutube from "./lazyYoutube";

interface VideoSliderProps {
  movieId: string;
  movieName: string;
}

export function VideoSlider({ movieId, movieName }: VideoSliderProps) {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchMovieVideoById(movieId);

        const uniqueVideos = Array.from(
          new Map(
            data
              .filter((video: any) => video.site === "YouTube")
              .map((item: any) => [item.key, item]) // hapus duplikat berdasarkan key
          ).values()
        );

        setVideos(uniqueVideos.slice(0, 10));
      } catch (err) {
        console.error("Gagal load video:", err);
      }
    };

    loadVideos();
  }, [movieId]);

  if (videos.length === 0) return null;

  return (
    <div className="mt-2 px-4 md:px-0">
      <div className="mb-4">
        <h1 className="text-3xl font-bold relative inline-block text-white">
          Videos about - {movieName}
          <span className="absolute bottom-0 left-0 w-1/2 h-[3px] bg-red-500 rounded-full" />
        </h1>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView="auto"
        grabCursor={true}
        loop={true}
        autoplay={{ delay: 10000 }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.key} style={{ width: "350px" }}>
            <div className="aspect-video w-full rounded-md overflow-hidden shadow-lg">
              <LazyYoutube videoId={video.key} title={video.name} />
            </div>
            <p className="text-white text-sm text-center mt-2">{video.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
