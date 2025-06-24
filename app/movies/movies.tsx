import React, { useEffect, useState } from 'react'
import { MovieFilter } from '../components/movieFilter'
import { MovieGrid } from '../components/movieGrid'
import { useSearchParams } from 'react-router'
import axios from 'axios'

const filterMap: Record<string, string> = {
  'Now Playing': 'now_playing',
  Trending: 'popular',
  'Top Rated': 'top_rated',
  Upcoming: 'upcoming',
}

const displayMap: Record<string, string> = {
  Popular: 'Trending',
  'Top Rated': 'Top Rated',
  'Now Playing': 'Now Playing',
  Upcoming: 'Upcoming',
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
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTc4MmE2YzdhMzIwZDJhMDRmODIxOGU3NTMwNTkxMiIsIm5iZiI6MTc1MDA2MjcyNi44OTEsInN1YiI6IjY4NGZkNjg2ZjllNzJiNGY0OWIwZTk5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g5e7DJgUiRiL9rgV7Vng6jrt7T6aUrEERKouc_FvtJI'

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const endpoint = `https://api.themoviedb.org/3/movie/${filterMap[activeFilter]}?language=en-US&page=${currentPage}`
        const res = await axios.get(endpoint, {
          headers: {
            accept: 'application/json',
            Authorization: `${AUTH_TOKEN}`,
          },
        })
        setMovies(res.data.results)
        setTotalPages(res.data.total_pages)
      } catch (err) {
        console.error('Gagal fetch movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [activeFilter, currentPage])

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
          title: m.title,
          poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
          desc: m.overview,
          backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
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

