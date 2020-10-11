import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import ErrorInfo from '../../components/ErrorInfo/ErrorInfo'
import Header from '../../components/Header/Header'
import WithList, { ListComponentProps } from '../../hocs/withList/WithList'
import WithLoading from '../../hocs/withLoading/WithLoading'
import { fetchMakes, setError } from './makesSlice'

const ListItem: React.FC<ListComponentProps<string>> = ({ data }) => {
  return (
    <li>
      <Link to={`/${data}`}>{data}</Link>
    </li>
  )
}

const MakesList = WithList(ListItem)

const MakesListWithLoading = WithLoading(MakesList)

function Makes() {
  const dispatch = useDispatch()
  const { makes, loading, error } = useTypedSelector((state) => state.data.makes)
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
    dispatch(fetchMakes())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const searchRegExp = new RegExp(search.toLowerCase())
  const filteredMakes =
    showSearch && search !== '' ? makes.filter((make) => searchRegExp.test(make.toLowerCase())) : makes

  return (
    <div className="Makes">
      <Header title="Makes" onSearch={handleOnSearch} />
      {showSearch && (
        <div className="Makes-searchbar">
          <input type="text" placeholder="Search" value={search} onChange={handleSearchOnChange} />
          <button onClick={handleCloseSearch}>close</button>
        </div>
      )}
      <ErrorInfo error={error} onFix={fetchData} />
      <MakesListWithLoading loading={loading} items={filteredMakes} />
    </div>
  )
}

export default Makes
