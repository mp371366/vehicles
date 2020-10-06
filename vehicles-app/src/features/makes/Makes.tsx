import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import { fetchMakes } from './makesSlice'

function Makes() {
  const dispatch = useDispatch()
  const { makes, loading, error } = useTypedSelector((state) => state.data.makes)

  const fetchData = useCallback(() => {
    dispatch(fetchMakes())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return (
      <div className="Makes">
        <header className="Makes-header">Makes</header>
        <p>pending...</p>
      </div>
    )
  }

  return (
    <div className="Makes">
      <header className="Makes-header">Makes</header>
      <button onClick={fetchData}>refresh</button>
      {error && <p>{error}</p>}
      <ul>
        {makes.map((make) => (
          <li key={make}>
            <Link
              to={{
                pathname: `/${make}`,
              }}
            >
              {make}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Makes
