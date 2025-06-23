import React from 'react'

export function MovieCard({ title, poster }: { title: string; poster: string }) {
  return (
    <div className="w-[200px] flex flex-col items-center gap-2">
      <img
        src={poster}
        alt={title}
        className="w-full h-auto object-cover rounded-md shadow-md"
      />
      <p className="text-sm text-center">{title}</p>
    </div>
  )
}
