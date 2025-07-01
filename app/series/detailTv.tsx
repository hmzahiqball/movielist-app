import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fetchTvById } from "../lib/api";
import { LoadingThreeDotsPulse } from '../components/loadingDots';
import { CastSlider } from '../components/detail/castSlider';
import { VideoSlider } from '../components/detail/videoSlider';
import { RecommendationMovies } from '../components/detail/recomMovieSlider';
import { SimilarMovies } from '../components/detail/similarMovieSlider';
import { ReviewUsers } from '../components/detail/reviewUser';
import { LazyShow } from '../components/detail/lazyShow';
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";

interface TvDetailProps {
  id: string;
}

export function TvDetail({ id }: TvDetailProps) {
  const [series, setSeries] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const overviewRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTvById(id);
        setSeries(data);
        document.title = `${data.name} - Filmscape`; // ✅ pakai .name
      } catch (error) {
        console.error("Error loading series:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!overviewRef.current) return;

      overviewRef.current.style.visibility = "visible";
      const { words: overviewWords } = splitText(overviewRef.current);

      animate(
        overviewWords,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 1.5,
          bounce: 0,
          delay: stagger(0.05),
        }
      );
    });
  }, [series]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingThreeDotsPulse />
      </div>
    );
  }

  if (!series) return <div className="text-white text-center mt-20">TV Series not found</div>;

  return (
    <>
      {/* 🖼️ SECTION DENGAN BACKDROP */}
      <div className="relative min-h-screen text-white pt-32">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 flex flex-col md:flex-row gap-8 items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
            }}
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.name}
            className="w-60 md:w-72 rounded-lg shadow-lg"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
            }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-4xl font-bold">{series.name}</h1>
            <p className="text-lg text-gray-300">
              {new Date(series.first_air_date).getFullYear()} •{" "}
              {series.spoken_languages.map((lang: any) => lang.name).join(", ")}
            </p>

            <div className="flex flex-wrap gap-2">
              {series.genres.map((genre: any) => (
                <motion.span
                  key={genre.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.5,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                  }}
                  className="bg-black/60 backdrop-blur-sm text-sm font-medium px-3 py-1 rounded-md"
                >
                  {genre.name}
                </motion.span>
              ))}
            </div>

            <motion.p
              ref={overviewRef}
              className="max-w-2xl text-base text-gray-200 leading-relaxed split-text"
              style={{ visibility: "hidden" }}
            >
              {series.overview}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* 🎬 CAST SECTION */}
      <div className="bg-black w-full py-10">
        <div className="max-w-6xl mx-auto px-6">
          <LazyShow>
            <CastSlider Id={id} Type="series" />
          </LazyShow>
        </div>
      </div>

      {/* 🎬 VIDEO SECTION */}
      <div className="bg-black w-full py-10">
        <div className="max-w-6xl mx-auto px-6">
          <LazyShow>
            <VideoSlider Id={id} movieName={series.name} Type="series" />
          </LazyShow>
        </div>
      </div>

      {/* 🎬 REKOMENDASI SECTION */}
      <div className="bg-black w-full py-10">
        <div className="max-w-6xl mx-auto px-6">
          <LazyShow>
            <RecommendationMovies Id={id} Type="series" />
          </LazyShow>
        </div>
      </div>

      {/* 🎬 SIMILAR SECTION */}
      <div className="bg-black w-full py-10">
        <div className="max-w-6xl mx-auto px-6">
          <LazyShow>
            <SimilarMovies Id={id} Type="series" />
          </LazyShow>
        </div>
      </div>

      {/* 🎬 REVIEW SECTION */}
      <div className="bg-black w-full py-10">
        <div className="max-w-6xl mx-auto px-6">
          <LazyShow>
            <ReviewUsers Id={id} Type="series" />
          </LazyShow>
        </div>
      </div>
    </>
  );
}
