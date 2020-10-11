import React from 'react'

const DefaultInfo = () => <p>Loading ...</p>

type WithLoadingProps = {
  loading: boolean
}

function WithLoading<P extends object>(
  Component: React.ComponentType<P>,
  Info = DefaultInfo
): React.ComponentType<WithLoadingProps & P> {
  return function WithLoadingComponent({ loading, ...props }) {
    if (loading) {
      return <Info />
    }

    return <Component {...(props as P)} />
  }
}

export default WithLoading
