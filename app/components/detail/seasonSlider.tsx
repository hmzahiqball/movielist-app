import React from 'react';

type Season = {
  id: number;
  name: string;
  air_date?: string;
  poster_path?: string | null;
  overview?: string;
  vote_average: number;
  season_number: number;
  episode_count: number;
};

type SeasonSliderProps = {
  seasons: Season[];
  fallbackPoster: string;
};

export function SeasonSlider({ seasons, fallbackPoster }: SeasonSliderProps) {
  if (seasons.length === 0) return null;

  return (
    <div className="join join-vertical w-full">
      {seasons.map((season) => {
        const backdrop_path = `https://image.tmdb.org/t/p/original${fallbackPoster}`;

        return (
          <div
            key={season.id}
            className="collapse collapse-arrow bg-base-100 border border-base-300"
          >
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title font-semibold">
              {season.name || `Season ${season.season_number}`}
            </div>

            <div
              className="collapse-content text-white p-0"
              style={{
                backgroundImage: `url(${backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="w-full h-full bg-black/60 backdrop-blur-sm rounded-lg p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {season.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${season.poster_path}`}
                      alt={season.name}
                      className="w-32 rounded-lg shadow-md mt-10 mb-10"
                    />
                  )}

                  {/* Detail kanan */}
                  <div className="flex flex-col gap-2 mt-10 mb-10">
                    <p className="text-sm opacity-80">
                      Total Episode: {season.episode_count}
                    </p>
                    <p className="text-sm opacity-80">
                      {season.air_date
                        ? `Aired: ${new Date(season.air_date).toLocaleDateString()}`
                        : 'No air date'}
                    </p>
                    <p className="text-sm opacity-80">
                      Rating: {Math.round(season.vote_average * 10) / 10}
                    </p>
                    {season.overview ? (
                      <p className="text-base mt-2">{season.overview}</p>
                    ) : (
                      <p className="text-base mt-2 text-gray-400">
                        No Overview Available
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
