import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import ErrorInfo from '../../components/ErrorInfo/ErrorInfo'
import Header from '../../components/Header/Header'
import WithList, { ListComponentProps } from '../../hocs/withList/WithList'
import WithLoading from '../../hocs/withLoading/WithLoading'
import { fetchVehicles, setError, Vehicle } from './vehiclesSlice'
import { VehiclesParams } from './vehiclesSlice'

const ListItem: React.FC<ListComponentProps<Vehicle>> = ({ data, idx }) => {
  return <li>{`${idx} ${data.make} ${data.model}`}</li>
}

const VehiclesList = WithList(ListItem)

const VehiclesListWithLoading = WithLoading(VehiclesList)

function Vehicles() {
  const dispatch = useDispatch()
  const params = useParams<VehiclesParams>()
  const { make, model } = params
  const { vehicles, loading, error } = useTypedSelector((state) => state.data.vehicles)

  const fetchData = useCallback(() => {
    dispatch(setError(null))
    dispatch(fetchVehicles(params))
  }, [dispatch, params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="Vehicles">
      <Header back title={`${make} ${model} vehicles`} />
      <ErrorInfo error={error} onFix={fetchData} />
      <VehiclesListWithLoading items={vehicles} loading={loading} />
    </div>
  )
}

export default Vehicles
