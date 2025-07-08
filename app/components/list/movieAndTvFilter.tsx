import React from 'react'

export function MovieAndTvFilter({
  options,
  active,
  onChange,
}: {
  options: string[]
  active: string
  onChange: (val: string) => void
}) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 max-w-6xl mx-auto">
      <div className="tabs tabs-lift tabs-xl [--tab-bg:orange]">
        {options.map((option, index) => (
          <input
            key={option}
            type="radio"
            name="movie_filter_tabs"
            className="tab"
            aria-label={option}
            checked={active === option}
            onChange={() => onChange(option)}
            style={{
              // ganti warna background tab aktif
              ...(active === option && { ['--tab-bg' as any]: 'rgb(220 38 38)' }),
              ...(active === option && { color: 'white' }),
            }}
          />
        ))}
      </div>
    </div>
  )
}
