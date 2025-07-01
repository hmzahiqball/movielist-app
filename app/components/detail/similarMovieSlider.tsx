import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  fetchSimilarMovieDetail,
  fetchMovieGenres,
} from '../../lib/api';
import { MovieCard } from "../list/movieCard";

interface SimilarMoviesProps {
  movieId: string;
}

export function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<Record<number, string>>({})
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchSimilarMovieDetail(movieId, "1");
        setMovies(data);
      } catch (err) {
        console.error("Gagal load rekomendasi film:", err);
      }
    };

    loadMovies();
  }, [movieId]);

  useEffect(() => {
    fetchMovieGenres()
      .then(setGenres)
      .catch((err) => console.error('Gagal fetch genre:', err))
  }, [])

  if (movies.length === 0) return null;

  return (
    <div className="mt-2">
      <div className="mb-4">
        <h1 className="text-3xl font-bold relative inline-block text-white">
          Similar Movies
          <span className="absolute bottom-0 left-0 w-3/4 h-[3px] bg-red-500 rounded-full" />
        </h1>
      </div>
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        grabCursor={true}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id} style={{ width: 200 }}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              desc={movie.overview}
              backdrop={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
              firstAirDate={movie.release_date}
              genres={movie.genre_ids.map((id: number) => genres[id]).filter(Boolean)} // optional: lo bisa mapping genre ID ke nama genre kalo mau
              index={index}
              onHover={setHoveredIndex}
              isHovered={hoveredIndex === index}
              isLastColumn={index >= movies.length - 3}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

