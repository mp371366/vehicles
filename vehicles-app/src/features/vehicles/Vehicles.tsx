import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import { fetchVehicles } from './vehiclesSlice'
import { VehiclesParams } from './vehiclesSlice'

function Vehicles() {
  const dispatch = useDispatch()
  const params = useParams<VehiclesParams>()
  const vehicles = useTypedSelector((state) => state.data.vehicles.vehicles)

  useEffect(() => {
    dispatch(fetchVehicles(params))
  }, [dispatch, params])

  return (
    <div className="Vehicles">
      <header className="Vehicles-header">Vehicles</header>
      <ul>
        {vehicles.map((vehicle, idx) => (
          <li key={idx}>{`${idx} ${vehicle.make} ${vehicle.model}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default Vehicles
