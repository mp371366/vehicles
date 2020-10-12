import React from 'react'
import { Vehicle } from '../../features/vehicles/vehiclesSlice'
import './VehicleInfo.css'

type VehicleInfoProps = {
  vehicle: Vehicle
}

function VehicleInfo({ vehicle }: VehicleInfoProps) {
  return (
    <div className="VehicleInfo">
      <dl>
        <dt>Body type</dt>
        <dd>{vehicle.bodyType}</dd>
        <dt>Engine capacity [ml]</dt>
        <dd>{vehicle.engineCapacity}</dd>
        <dt>Engine power [KW]</dt>
        <dd>{vehicle.enginePowerKW}</dd>
        <dt>Engine power [PS]</dt>
        <dd>{vehicle.enginePowerPS}</dd>
        <dt>Fuel type</dt>
        <dd>{vehicle.fuelType}</dd>
      </dl>
    </div>
  )
}

export default VehicleInfo
