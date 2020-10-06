import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import WithList, { ListComponentProps } from '../../hocs/withList/WithList'
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

  const ListItem = ({ data }: ListComponentProps<string>) => {
    return (
      <li>
        <Link to={`/${make}/${data}`}>{data}</Link>
      </li>
    )
  }

  const ModelsList = WithList(ListItem)

  return (
    <div className="Models">
      <header className="Models-header">Models</header>
      {error && <p>{error}</p>}
      <ModelsList items={models} />
    </div>
  )
}

export default Models
