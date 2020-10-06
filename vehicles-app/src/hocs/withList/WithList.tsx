import React from 'react'

const DefaultInfo = () => <p>The is no items.</p>

interface WithListProps<T> {
  items: T[]
}

export interface ListComponentProps<T> {
  data: T
  idx: number
}

function WithList<T>(Component: React.ComponentType<ListComponentProps<T>>, Info = DefaultInfo) {
  return function WithListComponent({ items }: WithListProps<T>) {
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
