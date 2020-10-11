import React, { useCallback, useEffect } from 'react'
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

  const fetchData = useCallback(() => {
    dispatch(setError(null))
    dispatch(fetchMakes())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="Makes">
      <Header title="Makes" />
      <ErrorInfo error={error} onFix={fetchData} />
      <MakesListWithLoading loading={loading} items={makes} />
    </div>
  )
}

export default Makes
