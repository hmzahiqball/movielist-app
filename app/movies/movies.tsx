import React, { useEffect, useState } from 'react'
import { MovieAndTvFilter } from '../components/list/movieAndTvFilter'
import { MovieGrid } from '../components/list/movieGrid'
import { SearchGrid } from '../components/list/searchGrid'
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
  Search: 'search',
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
        document.title = `Movies - Filmscape MovieApp`;
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
    const pages: (number | string)[] = []
    
    if (totalPages <= 6) {
      // kalau cuma sedikit, tampil semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // selalu tampilkan 1 dan 2
      pages.push(1)
      pages.push(2)
    
      if (currentPage > 4) {
        pages.push('...')
      }
    
      // kalau currentPage belum mendekati akhir
      if (currentPage > 2 && currentPage < totalPages - 2) {
        pages.push(currentPage)
      }
    
      if (currentPage < totalPages - 3) {
        pages.push('...')
      }
    
      // tampilkan 2 page terakhir
      pages.push(totalPages - 1)
      pages.push(totalPages)
    }
  
    // hapus duplikat dan sort
    return [...new Set(pages)]
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 mt-10">{activeFilter} Movies</h1>
      <MovieAndTvFilter
        options={filterOptions}
        active={activeFilter}
        onChange={handleFilterChange}
      />
      {activeFilter === 'Search' ? (
        <SearchGrid
          currentPage={currentPage}
          onPageChange={(dir) => {
            if (dir === 'prev' && currentPage > 1) setCurrentPage((p) => p - 1)
            else if (dir === 'next' && currentPage < totalPages) setCurrentPage((p) => p + 1)
            else if (typeof dir === 'number') setCurrentPage(dir)
          }}
          setTotalPages={setTotalPages}
        />
      ) : (
        <MovieGrid
          movies={movies.map((m) => ({
            id: m.id,
            title: m.title,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: m.genre_ids.map((id: number) => genres[id]).filter(Boolean),
            firstAirDate: m.release_date,
            rating: Math.round(m.vote_average * 10) / 10
          }))}
          loading={loading}
        />
      )}

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className="btn btn-md"
        >
          Prev
        </button>

        <div className="join">
          {generatePageNumbers().map((page, idx) => {
            if (page === '...') {
              return (
                <button key={idx} className="join-item btn btn-md btn-disabled">
                  ...
                </button>
              )
            }
          
            return (
              <input
                key={idx}
                className={`join-item btn btn-md btn-square ${
                  page === currentPage ? 'bg-red-600 text-white border-none' : ''
                }`}
                type="radio"
                name="page"
                aria-label={page.toString()}
                checked={page === currentPage}
                onChange={() => setCurrentPage(page as number)}
              />
            )
          })}
        </div>
        
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className="btn btn-md"
        >
          Next
        </button>
      </div>
    </div>
  )
}

