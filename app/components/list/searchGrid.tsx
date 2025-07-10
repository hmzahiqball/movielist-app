import React, { useEffect, useState } from 'react'
import { MovieCard } from './movieCard'
import { SelectInput } from './searchSelect'
import { YearSelectInput } from './searchYear'
import { LazyShow } from '../detail/lazyShow'
import { Filter } from 'lucide-react'
import {
  searchMovies,
  fetchMovieGenres,
  fetchCountriesConfiguration,
  fetchLanguagesConfiguration
} from '../../lib/api'

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size + 0, i * size + size)
  )
}

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

  const [regions, setRegions] = useState<{ iso_3166_1: string; english_name: string }[]>([])
  const [languages, setLanguages] = useState<{ iso_639_1: string; english_name: string }[]>([])

  const [includeAdult, setIncludeAdult] = useState(false)
  const [yearFilter, setYearFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState<any>(null)
  const [languageFilter, setLanguageFilter] = useState<any>(null)

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const [countries, langs] = await Promise.all([
          fetchCountriesConfiguration(),
          fetchLanguagesConfiguration()
        ])
        setRegions(countries)
        setLanguages(langs)
      } catch (err) {
        console.error('Failed fetching config:', err)
      }
    }
    fetchConfigs()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      if (searchQuery.length < 3) {
        setMovies([])
        setTotalPages(1)
        return
      }
      setLoading(true)
      try {
        const { movies: result, totalPages } = await searchMovies({
          query: searchQuery,
          page: currentPage,
          include_adult: includeAdult,
          year: yearFilter,
          region: regionFilter?.value || '',
          language: languageFilter?.value || ''
        })
        setMovies(result)
        setTotalPages(totalPages)
      } catch (err) {
        console.error('Search failed:', err)
      } finally {
        setLoading(false)
      }
    }

    const delayDebounce = setTimeout(fetch, 400)
    return () => clearTimeout(delayDebounce)
  }, [searchQuery, currentPage, includeAdult, yearFilter, regionFilter, languageFilter, setTotalPages])

  useEffect(() => {
    fetchMovieGenres()
      .then(setGenres)
      .catch((err) => console.error('Gagal fetch genre:', err))
  }, [])

  const skeletons = new Array(20).fill(null)
  const chunkedMovies = chunkArray(movies, 5)

  const regionSelectOptions = regions.map((r) => ({ label: r.english_name, value: r.english_name }))
  const languageSelectOptions = languages.map((l) => ({ label: l.english_name, value: `${l.iso_639_1}-${l.iso_639_1.toUpperCase()}` }))

  return (
    <div className="border border-red-600 p-6 rounded-md max-w-6xl mx-auto overflow-visible relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="relative">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="btn btn-outline btn-error text-red-600 border-red-600 hover:bg-red-500 hover:text-white min-w-[48px] flex justify-center items-center"
          >
            <Filter size={20} />
          </button>

          {showFilters && (
            <div className="absolute right-0 mt-2 p-4 border border-base-300 rounded-lg bg-base-200 flex flex-col gap-4 w-[300px] z-50">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={includeAdult}
                  onChange={(e) => setIncludeAdult(e.target.checked)}
                />
                <span className="text-sm">Include adult</span>
              </label>

              <YearSelectInput value={yearFilter} onChange={setYearFilter} />

              <div className="flex flex-col gap-2">
                <SelectInput
                  name="region"
                  options={regionSelectOptions}
                  value={regionFilter}
                  onChange={(option) => setRegionFilter(option)}
                  placeholder="Search region..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <SelectInput
                  name="region"
                  options={languageSelectOptions}
                  value={languageFilter}
                  onChange={(option) => setLanguageFilter(option)}
                  placeholder="Search language..."
                />
              </div>
            </div>
          )}
        </div>
      </div>

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

      {!loading &&
        chunkedMovies.length > 0 &&
        chunkedMovies.map((group, groupIndex) => (
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

      {!loading && searchQuery.length >= 3 && movies.length === 0 && (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </div>
  )
}
