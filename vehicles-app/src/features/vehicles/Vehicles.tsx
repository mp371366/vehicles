import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import WithList, { ListComponentProps } from '../../hocs/withList/WithList'
import WithLoading from '../../hocs/withLoading/WithLoading'
import { fetchVehicles, Vehicle } from './vehiclesSlice'
import { VehiclesParams } from './vehiclesSlice'

const ListItem: React.FC<ListComponentProps<Vehicle>> = ({ data, idx }) => {
  return <li>{`${idx} ${data.make} ${data.model}`}</li>
}

const VehiclesList = WithList(ListItem)

const VehiclesListWithLoading = WithLoading(VehiclesList)

function Vehicles() {
  const dispatch = useDispatch()
  const params = useParams<VehiclesParams>()
  const { vehicles, loading, error } = useTypedSelector((state) => state.data.vehicles)

  useEffect(() => {
    dispatch(fetchVehicles(params))
  }, [dispatch, params])

  return (
    <div className="Vehicles">
      <header className="Vehicles-header">Vehicles</header>
      {error && <p>{error}</p>}
      <VehiclesListWithLoading items={vehicles} loading={loading} />
    </div>
  )
}

export default Vehicles
