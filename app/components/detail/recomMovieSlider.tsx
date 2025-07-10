import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  fetchRecomendationMovieDetail,
  fetchRecomendationTvDetail,
  fetchMovieGenres,
  fetchTvGenres
} from '../../lib/api';
import { MovieCard } from "../list/movieCard";

interface RecommendationMoviesProps {
  Id: string;
  Type: string;
}

export function RecommendationMovies({ Id, Type }: RecommendationMoviesProps) {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<Record<number, string>>({})
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        let data;
        if (Type === "movies") {
          data = await fetchRecomendationMovieDetail(Id, "1");
        } else if (Type === "series") {
          data = await fetchRecomendationTvDetail(Id, "1");
        }
        setMovies(data);
      } catch (err) {
        console.error("Gagal load rekomendasi film:", err);
      }
    };

    loadMovies();
  }, [Id]);

  if (Type === "movies") {
    useEffect(() => {
      fetchMovieGenres()
        .then(setGenres)
        .catch((err) => console.error('Gagal fetch genre:', err))
    }, [])
  } else if (Type === "series") {
    useEffect(() => {
      fetchTvGenres()
        .then(setGenres)
        .catch((err) => console.error('Gagal fetch genre:', err))
    }, [])
  }

  if (movies.length === 0) return null;

  if (Type === "movies") {
    return (
      <div className="mt-2">
        <div className="mb-4">
          <h1 className="text-3xl font-bold relative inline-block text-white">
            Recommended Movies
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
                type={Type}
                id={movie.id}
                title={movie.title}
                poster={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                desc={movie.overview}
                backdrop={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
                firstAirDate={movie.release_date}
                genres={movie.genre_ids.map((id: number) => genres[id]).filter(Boolean)}
                rating={Math.round(movie.vote_average * 10) / 10}
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
  } else if (Type === "series") {
    return (
      <div className="mt-2">
        <div className="mb-4">
          <h1 className="text-3xl font-bold relative inline-block text-white">
            Recommended Series
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
                type={Type}
                id={movie.id}
                title={movie.name}
                poster={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                desc={movie.overview}
                backdrop={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
                firstAirDate={movie.first_air_date}
                genres={movie.genre_ids.map((id: number) => genres[id]).filter(Boolean)}
                rating={Math.round(movie.vote_average * 10) / 10}
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
}

