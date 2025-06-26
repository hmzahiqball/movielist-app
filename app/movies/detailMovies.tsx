import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MovieDetailProps {
  id: string;
}

export function MovieDetail({ id }: MovieDetailProps) {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer YOUR_API_KEY_HERE', // Ganti dengan API key lo
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => console.error('Failed to fetch movie:', err));
  }, [id]);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!movie) return <div className="text-white text-center mt-20">Movie not found</div>;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative min-h-screen text-white pt-32"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 flex flex-col md:flex-row gap-8 items-center">
        <motion.img
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 1 }}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-60 md:w-72 rounded-lg shadow-lg"
        />

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 1 }}
          className="flex flex-col gap-4"
        >
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <p className="text-lg text-gray-300">
            {new Date(movie.release_date).getFullYear()} •{' '}
            {movie.spoken_languages.map((lang: any) => lang.name).join(', ')}
          </p>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre: any) => (
              <motion.span
                key={genre.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 1 }}
                className="bg-black/60 backdrop-blur-sm text-sm font-medium px-3 py-1 rounded-md"
              >
                {genre.name}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 1 }}
            className="max-w-2xl text-base text-gray-200 leading-relaxed"
          >
            {movie.overview}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

