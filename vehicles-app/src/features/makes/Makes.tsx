import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import { fetchMakes } from './makesSlice'

function Makes() {
  const dispatch = useDispatch()
  const makes = useTypedSelector((state) => state.data.makes.makes)

  useEffect(() => {
    dispatch(fetchMakes())
  }, [dispatch])

  return (
    <div className="Makes">
      <header className="Makes-header">Makes</header>
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
