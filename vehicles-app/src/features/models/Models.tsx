import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import { fetchModels } from './modelsSlice'

function Models() {
  const dispatch = useDispatch()
  const { make } = useParams<{ make: string }>()
  const models = useTypedSelector((state) => state.data.models.models)

  useEffect(() => {
    dispatch(fetchModels(make))
  }, [dispatch, make])

  return (
    <div className="Models">
      <header className="Models-header">Models</header>
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
