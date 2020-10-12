import React from 'react'

const DefaultInfo = ({ name = 'items' }) => <p>There is no {name}.</p>

interface WithListProps<T> {
  items: T[]
  onClick?: (data: T, idx?: number) => void
}

export interface ListComponentProps<T> {
  data: T
  idx: number
  onClick?: (data: T, idx?: number) => void
}

function WithList<T>(
  Component: React.ComponentType<ListComponentProps<T>>,
  Info = DefaultInfo
): React.ComponentType<WithListProps<T>> {
  return function WithListComponent({ items, onClick }) {
    if (items.length === 0) {
      return <Info />
    }

    const handleClick = onClick ?? (() => ({}))

    return (
      <ul>
        {items.map((item, idx) => (
          <Component key={idx} idx={idx} data={item} onClick={() => handleClick(item, idx)} />
        ))}
      </ul>
    )
  }
}

export default WithList
