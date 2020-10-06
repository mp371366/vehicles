import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import { fetchModels } from './modelsSlice'

function Models() {
  const dispatch = useDispatch()
  const { make } = useParams<{ make: string }>()
  const { models, loading, error } = useTypedSelector((state) => state.data.models)

  useEffect(() => {
    dispatch(fetchModels(make))
  }, [dispatch, make])

  if (loading) {
    return (
      <div className="Models">
        <header className="Models-header">Models</header>
        <p>pending...</p>
      </div>
    )
  }

  return (
    <div className="Models">
      <header className="Models-header">Models</header>
      {error && <p>{error}</p>}
      <ul>
        {models.map((model) => (
          <li key={model}>
            <Link
              to={{
                pathname: `/${make}/${model}`,
              }}
            >
              {model}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Models
