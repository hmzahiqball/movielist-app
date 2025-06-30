import React,  { useState } from 'react'
import { MovieCard } from './movieCard'

export function MovieGrid({
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
  }[]
  loading?: boolean
}) {
  const skeletons = new Array(25).fill(null) // default 25 item sesuai pagination
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="border-2 border-red-600 p-6 rounded-md max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-center gap-6">
        {loading
          ? skeletons.map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-[200px]">
                <div className="skeleton h-[300px] w-full rounded-md" />
                <div className="skeleton h-4 w-3/4 rounded-md" />
              </div>
            ))
          : movies.map((movie, i) => (
              <MovieCard
                key={i}
                index={i}
                id={movie.id}
                title={movie.title}
                poster={movie.poster}
                desc={movie.desc}
                backdrop={movie.backdrop}
                genres={movie.genres}
                firstAirDate={movie.firstAirDate}
                onHover={setHoveredIndex}
                isHovered={hoveredIndex === i}
                isLastColumn={(i + 1) % 5 === 0 || (i + 1) % 5 === 4}
              />
            ))}
      </div>
    </div>
  )
}
