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
    <div className="flex justify-center gap-3 mb-0 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 border-t-2 border-l-2 border-r-2 rounded-sm font-semibold w-[240px] transition-all duration-300 cursor-pointer
            ${
              active === option
                ? 'bg-red-600 border-red-600 text-white'
                : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
            }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
