import { SelectInput } from './searchSelect'
import type { OptionType } from './searchSelect'

export function YearSelectInput({
  value,
  onChange,
  placeholder = 'Select year...'
}: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}) {
  const yearOptions: OptionType[] = Array.from({ length: new Date().getFullYear() + 1 - 1000 + 1 }, (_, i) => {
    const year = 1000 + i
    return { value: String(year), label: String(year) }
  }).reverse()

  return (
    <SelectInput
      options={yearOptions}
      value={yearOptions.find((y) => y.value === value) ?? null}
      onChange={(option) => onChange(option?.value ?? '')}
      placeholder={placeholder}
    />
  )
}
