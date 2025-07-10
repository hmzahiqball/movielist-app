import React, { useEffect, useState } from 'react'
import { MovieAndTvFilter } from '../components/list/movieAndTvFilter'
import { TvGrid } from '../components/list/tvGrid'
import { SearchGrid } from '../components/list/searchGridTv'
import { useSearchParams } from 'react-router'
import {
  fetchTvByCategory,
  fetchMovieGenres,
} from '../lib/api'

const filterMap: Record<string, string> = {
  'Airing Today': 'airing_today',
  'On The Air': 'on_the_air',
  Trending: 'popular',
  'Top Rated': 'top_rated',
  Search: 'search',
}

const reverseFilterMap = Object.fromEntries(
  Object.entries(filterMap).map(([k, v]) => [v, k])
)

const filterOptions = Object.keys(filterMap)

export function TV() {
  const [searchParams] = useSearchParams()
  const urlFilterKey = searchParams.get('filter')
  const initialFilter = reverseFilterMap[urlFilterKey || ''] || 'Airing Today'

  const [activeFilter, setActiveFilter] = useState(initialFilter)
  const [currentPage, setCurrentPage] = useState(1)
  const [series, setSeries] = useState<any[]>([])
  const [genres, setGenres] = useState<Record<number, string>>({})
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true)
      try {
        const category = filterMap[activeFilter] as 'airing_today' | 'on_the_air' | 'popular' | 'top_rated';
        const { movies, totalPages } = await fetchTvByCategory(category, currentPage)
        setSeries(movies)
        setTotalPages(totalPages)
        document.title = `Series - Filmscape MovieApp`;
      } catch (err) {
        console.error('Gagal fetch movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSeries()
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
      <h1 className="text-3xl font-bold text-center mb-8 mt-10">{activeFilter} Series</h1>
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
        <TvGrid
          movies={series.map((m) => ({
            id: m.id,
            title: m.name,
            poster: `https://image.tmdb.org/t/p/original${m.poster_path}`,
            desc: m.overview,
            backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            genres: m.genre_ids.map((id: number) => genres[id]).filter(Boolean),
            firstAirDate: m.first_air_date,
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

