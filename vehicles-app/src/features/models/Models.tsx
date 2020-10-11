import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import ErrorInfo from '../../components/ErrorInfo/ErrorInfo'
import Header from '../../components/Header/Header'
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
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const handleOnSearch = () => {
    setShowSearch(true)
  }
  const handleCloseSearch = () => {
    setShowSearch(false)
  }
  const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const fetchData = useCallback(() => {
    dispatch(setError(null))
    dispatch(fetchModels(make))
  }, [dispatch, make])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const searchRegExp = new RegExp(search.toLowerCase())
  const filteredModels =
    showSearch && search !== '' ? models.filter((model) => searchRegExp.test(model.toLowerCase())) : models

  return (
    <div className="Models">
      <Header back title={`${make} models`} onSearch={handleOnSearch} />
      {showSearch && (
        <div className="Models-searchbar">
          <input type="text" placeholder="Search" value={search} onChange={handleSearchOnChange} />
          <button onClick={handleCloseSearch}>close</button>
        </div>
      )}
      <ErrorInfo error={error} onFix={fetchData} />
      <ModelsListWithLoading loading={loading} items={filteredModels.map((model) => ({ model, make }))} />
    </div>
  )
}

export default Models
