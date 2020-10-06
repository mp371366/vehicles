import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import WithList, { ListComponentProps } from '../../hocs/withList/WithList'
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

  const ListItem = ({ data }: ListComponentProps<string>) => {
    return (
      <li>
        <Link to={`/${data}`}>{data}</Link>
      </li>
    )
  }

  const MakesList = WithList(ListItem)

  return (
    <div className="Makes">
      <header className="Makes-header">Makes</header>
      <button onClick={fetchData}>refresh</button>
      {error && <p>{error}</p>}
      <MakesList items={makes} />
    </div>
  )
}

export default Makes
