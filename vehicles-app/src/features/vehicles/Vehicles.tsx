import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import WithList, { ListComponentProps } from '../../hocs/withList/WithList'
import { fetchVehicles, Vehicle } from './vehiclesSlice'
import { VehiclesParams } from './vehiclesSlice'

function Vehicles() {
  const dispatch = useDispatch()
  const params = useParams<VehiclesParams>()
  const { vehicles, loading, error } = useTypedSelector((state) => state.data.vehicles)

  useEffect(() => {
    dispatch(fetchVehicles(params))
  }, [dispatch, params])

  if (loading) {
    return (
      <div className="Vehicles">
        <header className="Vehicles-header">Vehicles</header>
        <p>pending...</p>
      </div>
    )
  }

  const ListItem = ({ data, idx }: ListComponentProps<Vehicle>) => {
    return <li>{`${idx} ${data.make} ${data.model}`}</li>
  }

  const VehiclesList = WithList(ListItem)

  return (
    <div className="Vehicles">
      <header className="Vehicles-header">Vehicles</header>
      {error && <p>{error}</p>}
      <VehiclesList items={vehicles} />
    </div>
  )
}

export default Vehicles
