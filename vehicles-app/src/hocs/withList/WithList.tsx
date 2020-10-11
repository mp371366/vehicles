import React from 'react'

const DefaultInfo = ({ name = 'items' }) => <p>There is no {name}.</p>

interface WithListProps<T> {
  items: T[]
}

export interface ListComponentProps<T> {
  data: T
  idx: number
}

function WithList<T>(
  Component: React.ComponentType<ListComponentProps<T>>,
  Info = DefaultInfo
): React.ComponentType<WithListProps<T>> {
  return function WithListComponent({ items }) {
    if (items.length === 0) {
      return <Info />
    }

    return (
      <ul>
        {items.map((item, idx) => (
          <Component key={idx} idx={idx} data={item} />
        ))}
      </ul>
    )
  }
}

export default WithList
