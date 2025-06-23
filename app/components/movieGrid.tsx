import React from 'react'
import { MovieCard } from './movieCard'

export function MovieGrid({
  movies,
  loading,
}: {
  movies: { title: string; poster: string }[]
  loading?: boolean
}) {
  const skeletons = new Array(25).fill(null) // default 25 item sesuai pagination

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
              <MovieCard key={i} title={movie.title} poster={movie.poster} />
            ))}
      </div>
    </div>
  )
}
