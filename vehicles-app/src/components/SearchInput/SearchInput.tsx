import React from 'react'

type SearchInputProps = {
  show?: boolean
  value?: string
  onChange: (value: string) => void
  onClose: () => void
  placeholder?: string
}

function SearchInput({ show = true, value = '', onChange, onClose, placeholder = 'Search' }: SearchInputProps) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  if (!show) {
    return null
  }

  return (
    <div className="SearchInput">
      <input type="text" placeholder={placeholder} value={value} onChange={handleOnChange} />
      <span onClick={onClose}>&#10799;</span>
    </div>
  )
}

export default SearchInput
