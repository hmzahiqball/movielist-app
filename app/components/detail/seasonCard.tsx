import React, { useState } from 'react'
import { Link } from 'react-router'

type SeasonCardProps = {
  id: number,
  title: string,
  poster: string,
  desc?: string,
  backdrop?: string,
  firstAirDate?: string,
  rating?: number,
  totalEps?: number,
  index: number,
  onHover: (index: number | null) => void,
  isHovered: boolean,
  isLastColumn?: boolean,
}

export function SeasonCard({
  id,
  title,
  poster,
  desc = '',
  backdrop = '',
  firstAirDate,
  rating,
  totalEps,
  index,
  onHover,
  isHovered,
  isLastColumn = false,
}: SeasonCardProps) {
  const [isImageError, setIsImageError] = useState(false)

  return (
    <div
      className="relative w-[200px] flex flex-col items-center gap-2"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex flex-col items-center gap-2 w-[200px]">
        {isImageError ? (
          <>
            <div className="skeleton h-[300px] w-full rounded-md" />
            <p className="text-sm text-center mt-2 font-semibold">{title}</p>
          </>
        ) : (
          <>
            <img
              src={poster}
              alt={title}
              className="w-full h-[300px] object-cover rounded-md shadow-md"
              onError={() => setIsImageError(true)}
            />
            <p className="text-sm text-center mt-2 font-semibold">{title}</p>
          </>
        )}
      </div>

      {/* Expanded Card */}
      <div
        className={`absolute top-0 ${
          isLastColumn ? 'right-full mr-2' : 'left-full ml-2'
        } w-[512px] h-75 z-[999] rounded-lg overflow-hidden p-2 transition-all duration-300
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
        style={{
          backgroundImage: `url(${backdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow:
            '0 0 32px rgba(0, 0, 0, 0.8), 0 0 64px rgba(0, 0, 0, 0.8), 0 0 128px rgba(0, 0, 0, 0.8), 0 0 256px rgba(0, 0, 0, 0.8)',
        }}
      >
        <div className="bg-black/60 backdrop-blur-sm p-4 h-full rounded-md flex flex-col justify-start">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <div className="overflow-y-scroll h-[200px]">
            <p className="text-sm text-gray-300 leading-snug">{desc}</p>
          </div>
          <p className="text-xs text-gray-400 mt-2">
              <strong>Rate:</strong>{' '}
              {rating}/10
            </p>
          {firstAirDate && (
            <p className="text-xs text-gray-400 mt-1">
              <strong>First Air Date:</strong>{' '}
              {new Date(firstAirDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
