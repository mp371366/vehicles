import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import { fetchVehicles } from './vehiclesSlice'
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

  return (
    <div className="Vehicles">
      <header className="Vehicles-header">Vehicles</header>
      {error && <p>{error}</p>}
      <ul>
        {vehicles.map((vehicle, idx) => (
          <li key={idx}>{`${idx} ${vehicle.make} ${vehicle.model}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default Vehicles
