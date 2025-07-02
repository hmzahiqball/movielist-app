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
    <div className="flex max-w-6xl mx-auto justify-center mb-0 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 border-t-2 border-l-2 border-r-2 rounded-sm font-semibold w-[20%] transition-all duration-300 cursor-pointer
            ${
              active === option
                ? 'bg-red-600 border-red-600 text-white'
                : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
            }`}
        >
          {option}
        </button>
      ))}
      <div className="flex items-center px-4 py-2 border-t-2 border-l-2 border-r-2 rounded-sm font-semibold w-[20%] transition-all duration-300 border-red-600">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 outline-none bg-transparent placeholder:text-center"
          onFocus={(e) => e.target.classList.add('bg-red-600', 'text-white')}
          onBlur={(e) => e.target.classList.remove('bg-red-600', 'text-white')}
        />
      </div>
    </div>
  )
}
