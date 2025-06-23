import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper as SwiperClass } from 'swiper'
import { MovieSection } from '../components/home/movieSection'
import axios from 'axios'

export function Home() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [heroMovies, setHeroMovies] = useState<any[]>([])
  const [trendingMovies, setTrendingMovies] = useState<any[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([])
  const [airingTodaySeries, setAiringTodaySeries] = useState<any[]>([])
  const [onTheAirSeries, setOnTheAirSeries] = useState<any[]>([])
  const [trendingSeries, setTrendingSeries] = useState<any[]>([])
  const [topRatedSeries, setTopRatedSeries] = useState<any[]>([])

  const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTc4MmE2YzdhMzIwZDJhMDRmODIxOGU3NTMwNTkxMiIsIm5iZiI6MTc1MDA2MjcyNi44OTEsInN1YiI6IjY4NGZkNjg2ZjllNzJiNGY0OWIwZTk5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g5e7DJgUiRiL9rgV7Vng6jrt7T6aUrEERKouc_FvtJI'

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [nowPlayingRes, trendingMoviesRes, topRatedRes, upcomingMoviesRes, airingTodaySeriesRes, onTheAirSeriesRes, trendingSeriesRes, topRatedSeriesRes] = await Promise.all([
          axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
            headers: {
              accept: 'application/json',
              Authorization: `${AUTH_TOKEN}`,
            },
          }),
          axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
            headers: {
              accept: 'application/json',
              Authorization: `${AUTH_TOKEN}`,
            },
          }),
          axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
            headers: {
              accept: 'application/json',
              Authorization: `${AUTH_TOKEN}`,
            },
          }),
          axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', {
            headers: {
              accept: 'application/json',
              Authorization: `${AUTH_TOKEN}`,
            },
          }),
          axios.get('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', {
            headers: {
              accept: 'application/json',
              Authorization: `${AUTH_TOKEN}`,
            },
          }),
          axios.get('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', {
            headers: {
              accept: 'application/json',
              Authorization: `${AUTH_TOKEN}`,
            },
          }),
          axios.get('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', {
            headers: {
              accept: 'application/json',
              Authorization: `${AUTH_TOKEN}`,
            },
          }),
          axios.get('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', {
            headers: {
              accept: 'application/json',
              Authorization: `${AUTH_TOKEN}`,
            },
          }),
        ])

        setHeroMovies(nowPlayingRes.data.results)
        setTrendingMovies(trendingMoviesRes.data.results)
        setTopRatedMovies(topRatedRes.data.results)
        setUpcomingMovies(upcomingMoviesRes.data.results)
        setAiringTodaySeries(airingTodaySeriesRes.data.results)
        setOnTheAirSeries(onTheAirSeriesRes.data.results)
        setTrendingSeries(trendingSeriesRes.data.results)
        setTopRatedSeries(topRatedSeriesRes.data.results)
      } catch (err) {
        console.error('Failed to fetch home data:', err)
      }
    }

    fetchHomeData()
  }, [])

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
          items={trendingMovies.map((m) => ({
            title: m.title,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          }))}
        />
        <MovieSection
          title="Top rated movies"
          items={topRatedMovies.map((m) => ({
            title: m.title,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          }))}
        />
        <MovieSection
          title="Upcoming movies"
          items={upcomingMovies.map((m) => ({
            title: m.title,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          }))}
        />
        <MovieSection
          title="Airing today series"
          items={airingTodaySeries.map((m) => ({
            title: m.name,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          }))}
        />
        <MovieSection
          title="On the air series"
          items={onTheAirSeries.map((m) => ({
            title: m.name,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          }))}
        />
        <MovieSection
          title="Trending series"
          items={trendingSeries.map((m) => ({
            title: m.name,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          }))}
        />
        <MovieSection
          title="Top rated series"
          items={topRatedSeries.map((m) => ({
            title: m.name,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          }))}
        />
      </div>
    </div>
  )
}
