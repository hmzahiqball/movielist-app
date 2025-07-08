import React from 'react'
import Select from 'react-select'
import type { SingleValue } from 'react-select'

export type OptionType = {
  value: string
  label: string
}

type SelectInputProps = {
  options: OptionType[]
  value: OptionType | null
  onChange: (option: SingleValue<OptionType>) => void
  placeholder?: string
  name?: string
}

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  name = '',
}) => {
  // Custom dark styles
  const darkStyles = {
      control: (base: any, state: any) => ({
        ...base,
        backgroundColor: '#1f2937', // Tailwind `bg-gray-800`
        borderColor: state.isFocused ? '#ef4444' : '#374151', // `red-500` or `gray-700`
        color: 'white',
        boxShadow: state.isFocused ? '0 0 0 1px #ef4444' : 'none',
        '&:hover': {
          borderColor: '#ef4444',
        },
      }),
      menu: (base: any) => ({
        ...base,
        backgroundColor: '#1f2937', // bg-gray-800
        zIndex: 9999,
      }),
      singleValue: (base: any) => ({
        ...base,
        color: 'white',
      }),
      input: (base: any) => ({
        ...base,
        color: 'white',
      }),
      option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused ? '#b91c1c' : '#1f2937', // red-700 hover
        color: 'white',
        cursor: 'pointer',
      }),
      placeholder: (base: any) => ({
        ...base,
        color: '#9ca3af', // text-gray-400
      }),
    }

  return (
    <Select
      classNamePrefix="select"
      isClearable
      isSearchable
      name={name}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      styles={darkStyles}
    />
  )
}
