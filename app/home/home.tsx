import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper as SwiperClass } from 'swiper'
import { MovieSection } from '../components/home/movieSection'
import { SeriesSection } from '../components/home/seriesSection'
import {
  fetchHomeData,
  fetchMovieGenres,
  fetchTvGenres,
} from "../lib/api";

export function Home() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [heroMovies, setHeroMovies] = useState<any[]>([])
  const [trendingMovies, setTrendingMovies] = useState<any[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([])
  const [airingTodaySeries, setAiringTodaySeries] = useState<any[]>([])
  const [genres, setGenres] = useState<Record<number, string>>({})
  const [tvgenres, setTvGenres] = useState<Record<number, string>>({})
  const [onTheAirSeries, setOnTheAirSeries] = useState<any[]>([])
  const [trendingSeries, setTrendingSeries] = useState<any[]>([])
  const [topRatedSeries, setTopRatedSeries] = useState<any[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          nowPlaying,
          trendingMovies,
          topRatedMovies,
          upcomingMovies,
          airingTodaySeries,
          onTheAirSeries,
          trendingSeries,
          topRatedSeries,
        } = await fetchHomeData();

        setHeroMovies(nowPlaying);
        setTrendingMovies(trendingMovies);
        setTopRatedMovies(topRatedMovies);
        setUpcomingMovies(upcomingMovies);
        setAiringTodaySeries(airingTodaySeries);
        setOnTheAirSeries(onTheAirSeries);
        setTrendingSeries(trendingSeries);
        setTopRatedSeries(topRatedSeries);
        document.title = `Home - FilmScape MovieApp`;
      } catch (err) {
        console.error("Gagal ambil home data:", err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    fetchMovieGenres().then(setGenres).catch(console.error);
    fetchTvGenres().then(setTvGenres).catch(console.error);
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[100vh] w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="w-full h-full"
        >
          {heroMovies.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="relative min-h-screen flex items-center justify-center text-white">
                <div
                  className="absolute inset-0 bg-cover bg-center brightness-[0.4]"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    zIndex: -1,
                  }}
                ></div>
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 z-10">
                  <div className="w-60 md:w-72 lg:w-80 flex-shrink-0">
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      className="w-75 h-auto rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="max-w-xl">
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                      {movie.title}
                    </h1>
                    <p className="text-lg mb-8 text-gray-300">
                      {movie.overview}
                    </p>
                    <div className="flex gap-4">
                      <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
                        Watch trailer
                      </button>
                      <button className="px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition">
                        Watch now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Movie Sections */}
      <div className="px-12 py-12 relative overflow-visible">
        <MovieSection
          title="Trending movies"
          filterKey="popular"
          items={trendingMovies.map((m) => ({
            id: m.id,
            title: m.title,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: m.genre_ids.map((id: number) => genres[id]).filter(Boolean),
            firstAirDate: m.release_date,
            rating: Math.round(m.vote_average * 10) / 10
          }))}
        />
        <MovieSection
          title="Top rated movies"
          filterKey="top_rated"
          items={topRatedMovies.map((m) => ({
            id: m.id,
            title: m.title,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: m.genre_ids.map((id: number) => genres[id]).filter(Boolean),
            firstAirDate: m.release_date,
            rating: Math.round(m.vote_average * 10) / 10
          }))}
        />
        <MovieSection
          title="Upcoming movies"
          filterKey="upcoming"
          items={upcomingMovies.map((m) => ({
            id: m.id,
            title: m.title,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: m.genre_ids.map((id: number) => genres[id]).filter(Boolean),
            firstAirDate: m.release_date,
            rating: Math.round(m.vote_average * 10) / 10
          }))}
        />
        <SeriesSection
          title="Airing today series"
          filterKey="airing_today"
          items={airingTodaySeries.map((m) => ({
            id: m.id,
            title: m.name,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: m.genre_ids.map((id: number) => tvgenres[id]).filter(Boolean),
            firstAirDate: m.first_air_date,
            rating: Math.round(m.vote_average * 10) / 10
          }))}
        />
        <SeriesSection
          title="On the air series"
          filterKey="on_the_air"
          items={onTheAirSeries.map((m) => ({
            id: m.id,
            title: m.name,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: m.genre_ids.map((id: number) => tvgenres[id]).filter(Boolean),
            firstAirDate: m.first_air_date,
            rating: Math.round(m.vote_average * 10) / 10
          }))}
        />
        <SeriesSection
          title="Trending series"
          filterKey="popular"
          items={trendingSeries.map((m) => ({
            id: m.id,
            title: m.name,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: m.genre_ids.map((id: number) => tvgenres[id]).filter(Boolean),
            firstAirDate: m.first_air_date,
            rating: Math.round(m.vote_average * 10) / 10
          }))}
        />
        <SeriesSection
          title="Top rated series"
          filterKey="top_rated"
          items={topRatedSeries.map((m) => ({
            id: m.id,
            title: m.name,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: m.genre_ids.map((id: number) => tvgenres[id]).filter(Boolean),
            firstAirDate: m.first_air_date,
            rating: Math.round(m.vote_average * 10) / 10
          }))}
        />
      </div>
    </div>
  )
}
