import React, { useEffect, useState } from 'react'
import { MovieCard } from './movieCard'
import { LazyShow } from '../detail/lazyShow'
import { Filter } from 'lucide-react'
import { searchMovies, fetchMovieGenres } from '../../lib/api'

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export function SearchGrid({
  currentPage,
  onPageChange,
  setTotalPages
}: {
  currentPage: number
  onPageChange: (dir: 'prev' | 'next' | number) => void
  setTotalPages: (val: number) => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState<any[]>([])
  const [genres, setGenres] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // ⏳ Trigger fetch kalau query > 3
  useEffect(() => {
  const fetch = async () => {
    if (searchQuery.length < 3) {
      setMovies([])
      return
    }

    setLoading(true)
    try {
      const { movies: result, totalPages } = await searchMovies({
        query: searchQuery,
        page: currentPage
      })
      setMovies(result)
      setTotalPages(totalPages) // update total page
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const delayDebounce = setTimeout(fetch, 400)
  return () => clearTimeout(delayDebounce)
}, [searchQuery, currentPage])
  
    useEffect(() => {
      fetchMovieGenres()
        .then(setGenres)
        .catch((err) => console.error('Gagal fetch genre:', err))
    }, [])

  const skeletons = new Array(20).fill(null)
  const chunkedMovies = chunkArray(movies, 5)

  return (
    <div className="border border-red-600 p-6 rounded-md max-w-6xl mx-auto overflow-x-hidden">
      {/* 🔍 Search Bar + Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="btn btn-outline btn-error text-red-600 border-red-600 hover:bg-red-500 hover:text-white min-w-[48px] flex justify-center items-center"
        >
          <Filter size={20} />
        </button>
      </div>

      {/* 🧠 Optional filter dropdown */}
      {showFilters && (
        <div className="mb-6 p-4 border border-base-300 rounded-lg bg-base-200">
          <p className="text-sm opacity-80">Filter section placeholder</p>
        </div>
      )}

      {/* 🎞 SKELETON */}
      {loading && (
        <div className="flex flex-wrap justify-center gap-6">
          {skeletons.map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 w-[200px]">
              <div className="skeleton h-[300px] w-full rounded-md" />
              <div className="skeleton h-4 w-3/4 rounded-md" />
            </div>
          ))}
        </div>
      )}

      {/* 🎞 Movie Grid */}
      {!loading && chunkedMovies.length > 0 && chunkedMovies.map((group, groupIndex) => (
        <LazyShow key={groupIndex}>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {group.map((movie, i) => {
              const index = groupIndex * 5 + i
              return (
                <MovieCard
                  key={index}
                  type="movies"
                  index={index}
                  id={movie.id}
                  title={movie.title}
                  poster={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  desc={movie.overview}
                  backdrop={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  genres={movie.genre_ids.map((id: number) => genres[id]).filter(Boolean)}
                  firstAirDate={movie.release_date}
                  rating={Math.round(movie.vote_average * 10) / 10}
                  onHover={setHoveredIndex}
                  isHovered={hoveredIndex === index}
                  isLastColumn={(index + 1) % 5 === 0 || (index + 1) % 5 === 4}
                />
              )
            })}
          </div>
        </LazyShow>
      ))}

      {/* 😴 No result */}
      {!loading && searchQuery.length >= 3 && movies.length === 0 && (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </div>
  )
}
