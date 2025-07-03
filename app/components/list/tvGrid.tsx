import React, { useState } from 'react'
import { MovieCard } from './movieCard'
import { LazyShow } from '../detail/lazyShow'

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export function TvGrid({
  movies,
  loading,
}: {
  movies: {
    id: number
    title: string
    poster: string
    desc?: string
    backdrop?: string
    genres?: string[]
    firstAirDate?: string
    rating?: number
  }[]
  loading?: boolean
}) {
  const skeletons = new Array(20).fill(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (loading) {
    return (
      <div className="border-2 border-red-600 p-6 rounded-md max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {skeletons.map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 w-[200px]">
              <div className="skeleton h-[300px] w-full rounded-md" />
              <div className="skeleton h-4 w-3/4 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const chunkedMovies = chunkArray(movies, 5)

  return (
    <div className="border-1 border-red-600 p-6 rounded-md max-w-6xl mx-auto overflow-x-hidden">
      {chunkedMovies.map((group, groupIndex) => (
        <LazyShow key={groupIndex}>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {group.map((movie, i) => {
              const index = groupIndex * 5 + i
              return (
                <MovieCard
                  key={index}
                  type="series"
                  index={index}
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster}
                  desc={movie.desc}
                  backdrop={movie.backdrop}
                  genres={movie.genres}
                  firstAirDate={movie.firstAirDate}
                  rating={movie.rating}
                  onHover={setHoveredIndex}
                  isHovered={hoveredIndex === index}
                  isLastColumn={(index + 1) % 5 === 0 || (index + 1) % 5 === 4}
                />
              )
            })}
          </div>
        </LazyShow>
      ))}
    </div>
  )
}
