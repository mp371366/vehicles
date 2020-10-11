import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import ErrorInfo from '../../components/ErrorInfo/ErrorInfo'
import WithList, { ListComponentProps } from '../../hocs/withList/WithList'
import WithLoading from '../../hocs/withLoading/WithLoading'
import { fetchModels, setError } from './modelsSlice'

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

  const fetchData = useCallback(() => {
    dispatch(setError(null))
    dispatch(fetchModels(make))
  }, [dispatch, make])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="Models">
      <header className="Models-header">Models</header>
      <ErrorInfo error={error} onFix={fetchData} />
      <ModelsListWithLoading loading={loading} items={models.map((model) => ({ model, make }))} />
    </div>
  )
}

export default Models
