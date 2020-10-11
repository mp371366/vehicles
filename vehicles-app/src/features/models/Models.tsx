import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import WithList, { ListComponentProps } from '../../hocs/withList/WithList'
import WithLoading from '../../hocs/withLoading/WithLoading'
import { fetchModels } from './modelsSlice'

type ItemProps = { make: string; model: string }
type ListItemProps = ListComponentProps<ItemProps>

const ListItem: React.FC<ListItemProps> = ({ data: { model, make } }) => {
  return (
    <li>
      <Link to={`/${make}/${model}`}>{model}</Link>
    </li>
  )
}

const ModelsList = WithList(ListItem)

const ModelsListWithLoading = WithLoading(ModelsList)

function Models() {
  const dispatch = useDispatch()
  const { make } = useParams<{ make: string }>()
  const { models, loading, error } = useTypedSelector((state) => state.data.models)

  useEffect(() => {
    dispatch(fetchModels(make))
  }, [dispatch, make])

  return (
    <div className="Models">
      <header className="Models-header">Models</header>
      {error && <p>{error}</p>}
      <ModelsListWithLoading loading={loading} items={models.map((model) => ({ model, make }))} />
    </div>
  )
}

export default Models
