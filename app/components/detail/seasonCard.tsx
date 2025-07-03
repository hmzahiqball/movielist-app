import React from 'react';

type SeasonCardProps = {
  name: string;
  airDate?: string;
  poster?: string | null;
  fallbackPoster: string;
  overview?: string;
  isHovered: boolean;
  index: number;
  onHover: (index: number | null) => void;
};

export function SeasonCard({
  name,
  airDate,
  poster,
  fallbackPoster,
  overview,
  isHovered,
  index,
  onHover,
}: SeasonCardProps) {
  const year = airDate ? new Date(airDate).getFullYear() : 'Unknown';
  const imageUrl = `https://image.tmdb.org/t/p/w342${poster || fallbackPoster}`;

  return (
    <div
      className="relative w-[200px] cursor-pointer"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={imageUrl}
        alt={name}
        className="rounded-lg w-full h-[300px] object-cover shadow-lg transition-all duration-300"
      />

      {/* Hover card extended */}
      {isHovered && (
        <div className="absolute z-20 top-0 left-0 w-[400px] h-[450px] bg-zinc-900 text-white rounded-xl shadow-2xl p-4 transform -translate-x-1/2 -translate-y-1/2 transition duration-300">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-[220px] object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-400 mb-2">{year}</p>
          <p className="text-sm text-gray-300 line-clamp-5">{overview || 'No description available.'}</p>
        </div>
      )}
    </div>
  );
}
