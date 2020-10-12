import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import ErrorInfo from '../../components/ErrorInfo/ErrorInfo'
import Header from '../../components/Header/Header'
import Modal from '../../components/Modal/Modal'
import WithList, { ListComponentProps } from '../../hocs/withList/WithList'
import WithLoading from '../../hocs/withLoading/WithLoading'
import VehicleFilters from './VehicleFilters'
import { fetchVehicles, setError, setShowFilters, Vehicle, VehicleFilters as VehicleFiltersType } from './vehiclesSlice'
import { VehiclesParams } from './vehiclesSlice'

const ListItem: React.FC<ListComponentProps<Vehicle>> = ({ data, idx }) => {
  return (
    <li>
      <dl>
        <dt>Body type</dt>
        <dd>{data.bodyType}</dd>
        <dt>Engine capacity [ml]</dt>
        <dd>{data.engineCapacity}</dd>
        <dt>Engine power [KW]</dt>
        <dd>{data.enginePowerKW}</dd>
        <dt>Engine power [PS]</dt>
        <dd>{data.enginePowerPS}</dd>
        <dt>Fuel type</dt>
        <dd>{data.fuelType}</dd>
      </dl>
    </li>
  )
}

const VehiclesList = WithList(ListItem)

const VehiclesListWithLoading = WithLoading(VehiclesList)

function minMaxFilter(filters: VehicleFiltersType, name: 'enginePowerPS' | 'enginePowerKW' | 'engineCapacity') {
  return (vehicle: Vehicle) => {
    return filters[name].min <= vehicle[name] && vehicle[name] <= filters[name].max
  }
}

function nameFilter(filters: VehicleFiltersType, name: 'bodyType' | 'fuelType') {
  const regexp = new RegExp(filters[name])
  return (vehicle: Vehicle) => {
    return regexp.test(vehicle[name])
  }
}

function Vehicles() {
  const dispatch = useDispatch()
  const params = useParams<VehiclesParams>()
  const { make, model } = params
  const { vehicles, loading, error, filters, showFilters } = useTypedSelector((state) => state.data.vehicles)
  const handleOnSearch = () => {
    dispatch(setShowFilters(!showFilters))
  }

  const fetchData = useCallback(() => {
    dispatch(setError(null))
    dispatch(fetchVehicles(params))
  }, [dispatch, params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredVehicles =
    filters !== null
      ? vehicles
          .filter(minMaxFilter(filters, 'engineCapacity'))
          .filter(minMaxFilter(filters, 'enginePowerKW'))
          .filter(minMaxFilter(filters, 'enginePowerPS'))
          .filter(nameFilter(filters, 'bodyType'))
          .filter(nameFilter(filters, 'fuelType'))
      : vehicles
  return (
    <div className="Vehicles">
      <Header back title={`${make} ${model} vehicles`} onSearch={handleOnSearch} />
      <Modal show={showFilters}>
        <VehicleFilters />
      </Modal>
      <ErrorInfo error={error} onFix={fetchData} />
      <VehiclesListWithLoading items={filteredVehicles} loading={loading} />
    </div>
  )
}

export default Vehicles
