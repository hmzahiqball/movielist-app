import React, { useEffect, useState } from 'react'
import { MovieFilter } from '../components/movieFilter'
import { MovieGrid } from '../components/movieGrid'
import { useSearchParams } from 'react-router'
import {
  fetchMoviesByCategory,
  fetchMovieGenres,
} from '../lib/api'

const filterMap: Record<string, string> = {
  'Now Playing': 'now_playing',
  Trending: 'popular',
  'Top Rated': 'top_rated',
  Upcoming: 'upcoming',
}

const reverseFilterMap = Object.fromEntries(
  Object.entries(filterMap).map(([k, v]) => [v, k])
)

const filterOptions = Object.keys(filterMap)

export function Movies() {
  const [searchParams] = useSearchParams()
  const urlFilterKey = searchParams.get('filter')
  const initialFilter = reverseFilterMap[urlFilterKey || ''] || 'Now Playing'

  const [activeFilter, setActiveFilter] = useState(initialFilter)
  const [currentPage, setCurrentPage] = useState(1)
  const [movies, setMovies] = useState<any[]>([])
  const [genres, setGenres] = useState<Record<number, string>>({})
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const category = filterMap[activeFilter] as 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
        const { movies, totalPages } = await fetchMoviesByCategory(category, currentPage)
        setMovies(movies)
        setTotalPages(totalPages)
      } catch (err) {
        console.error('Gagal fetch movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [activeFilter, currentPage])

  useEffect(() => {
    fetchMovieGenres()
      .then(setGenres)
      .catch((err) => console.error('Gagal fetch genre:', err))
  }, [])

  const handlePageChange = (dir: 'prev' | 'next') => {
    if (dir === 'prev' && currentPage > 1) setCurrentPage((prev) => prev - 1)
    else if (dir === 'next' && currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const generatePageNumbers = () => {
    const pages = []
    const range = 1

    const startPage = Math.max(2, currentPage - range)
    const endPage = Math.min(totalPages - 1, currentPage + range)

    pages.push(1)

    if (startPage > 2) pages.push('...')

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < totalPages - 1) pages.push('...')

    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 mt-10">{activeFilter} Movies</h1>
      <MovieFilter
        options={filterOptions}
        active={activeFilter}
        onChange={handleFilterChange}
      />
      <MovieGrid
        movies={movies.map((m) => ({
          id: m.id,
          title: m.title,
          poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
          desc: m.overview,
          backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
          genres: m.genre_ids.map((id: number) => genres[id]).filter(Boolean),
          firstAirDate: m.release_date,
        }))}
        loading={loading}
      />

      <div className="flex justify-center flex-wrap items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-white rounded disabled:opacity-40 cursor-pointer hover:bg-white hover:text-black"
        >
          Prev
        </button>
            
        {generatePageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
            className={`px-3 py-1 border rounded ${
              page === currentPage
                ? 'bg-white text-black font-bold hover:bg-black'
                : 'border-white text-white'
            } ${page === '...' ? 'cursor-default' : 'cursor-pointer hover:bg-white hover:text-black'}`}
          >
            {page}
          </button>
        ))}
      
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-white rounded disabled:opacity-40 cursor-pointer hover:bg-white hover:text-black"
        >
          Next
        </button>
      </div>
    </div>
  )
}

