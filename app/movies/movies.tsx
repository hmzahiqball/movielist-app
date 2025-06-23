import React, { useEffect, useState } from 'react'
import { MovieFilter } from '../components/movieFilter'
import { MovieGrid } from '../components/movieGrid'
import { useSearchParams } from 'react-router'
import axios from 'axios'

const filterMap: Record<string, string> = {
  Popular: 'popular',
  'Top Rated': 'top_rated',
  'Now Playing': 'now_playing',
  Upcoming: 'upcoming',
}

const reverseFilterMap = Object.fromEntries(
  Object.entries(filterMap).map(([k, v]) => [v, k])
)

const filterOptions = Object.keys(filterMap)

export function Movies() {
  const [searchParams] = useSearchParams()
  const urlFilterKey = searchParams.get('filter')
  const initialFilter = reverseFilterMap[urlFilterKey || ''] || 'Popular'

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
        }))}
        loading={loading}
      />

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-white rounded disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-sm text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
