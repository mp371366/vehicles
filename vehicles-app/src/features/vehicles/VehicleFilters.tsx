import React from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../app/store'
import { setFilters, setShowFilters } from './vehiclesSlice'

function minAndMax(arr: number[]): [number, number] {
  return [Math.min(...arr), Math.max(...arr)]
}

function uniqueValues<T>(array: T[]) {
  return array.sort().filter((elem, idx, arr) => idx === 0 || elem !== arr[idx - 1])
}

function VehicleFilters() {
  const dispatch = useDispatch()
  const { vehicles, showFilters, filters } = useTypedSelector((state) => state.data.vehicles)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      return
    }

    const data = new FormData(form)
    dispatch(
      setFilters({
        enginePowerPS: {
          min: parseInt(data.get('minEnginePowerPS') as string, 10),
          max: parseInt(data.get('maxEnginePowerPS') as string, 10),
        },
        enginePowerKW: {
          min: parseInt(data.get('minEnginePowerKW') as string, 10),
          max: parseInt(data.get('maxEnginePowerKW') as string, 10),
        },
        bodyType: data.get('bodyType') as string,
        fuelType: data.get('fuelType') as string,
        engineCapacity: {
          min: parseInt(data.get('minEngineCapacity') as string, 10),
          max: parseInt(data.get('maxEngineCapacity') as string, 10),
        },
      })
    )
    dispatch(setShowFilters(false))
  }

  function handleCancel() {
    dispatch(setShowFilters(false))
  }

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    dispatch(setFilters(null))
  }

  const [minEnginePowerPS, maxEnginePowerPS] = minAndMax(vehicles.map(({ enginePowerPS }) => enginePowerPS))
  const [minEnginePowerKW, maxEnginePowerKW] = minAndMax(vehicles.map(({ enginePowerKW }) => enginePowerKW))
  const bodyTypes = uniqueValues(vehicles.map(({ bodyType }) => bodyType))
  const fuelTypes = uniqueValues(vehicles.map(({ fuelType }) => fuelType))
  const [minEngineCapacity, maxEngineCapacity] = minAndMax(vehicles.map(({ engineCapacity }) => engineCapacity))

  if (!showFilters) {
    return null
  }

  return (
    <div className="FilterModal">
      <form className="FilterModal-form" onSubmit={handleSubmit} onReset={handleReset}>
        <section>
          <div>
            <p>Engine power [PS]</p>
          </div>
          <div>
            <label htmlFor="minEnginePowerPS">Min</label>
            <input
              type="number"
              step="1"
              name="minEnginePowerPS"
              min={minEnginePowerPS}
              max={maxEnginePowerPS}
              defaultValue={filters?.enginePowerPS?.min ?? minEnginePowerPS}
            />
            <label htmlFor="maxEnginePowerPS">Max</label>
            <input
              type="number"
              step="1"
              name="maxEnginePowerPS"
              min={minEnginePowerPS}
              max={maxEnginePowerPS}
              defaultValue={filters?.enginePowerPS?.max ?? maxEnginePowerPS}
            />
          </div>
        </section>
        <section>
          <div>
            <p>Engine power [KW]</p>
          </div>
          <div>
            <label htmlFor="minEnginePowerKW">Min</label>
            <input
              type="number"
              step="1"
              name="minEnginePowerKW"
              min={minEnginePowerKW}
              max={maxEnginePowerKW}
              defaultValue={filters?.enginePowerKW?.min ?? minEnginePowerKW}
            />
            <label htmlFor="maxEnginePowerKW">Max</label>
            <input
              type="number"
              step="1"
              name="maxEnginePowerKW"
              min={minEnginePowerKW}
              max={maxEnginePowerKW}
              defaultValue={filters?.enginePowerKW?.max ?? maxEnginePowerKW}
            />
          </div>
        </section>
        <section>
          <label htmlFor="fuelType">Fuel type</label>
          <select name="fuelType" id="fuelType" defaultValue={filters?.fuelType ?? ''}>
            <option value="">any</option>
            {fuelTypes.map((fuelType) => (
              <option value={fuelType} key={fuelType}>
                {fuelType}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="bodyType">Body type</label>
          <select name="bodyType" id="bodyType" defaultValue={filters?.bodyType ?? ''}>
            <option value="">any</option>
            {bodyTypes.map((bodyType) => (
              <option value={bodyType} key={bodyType}>
                {bodyType}
              </option>
            ))}
          </select>
        </section>
        <section>
          <div>
            <p>Engine capacity [ml]</p>
          </div>
          <div>
            <label htmlFor="minEngineCapacity">Min</label>
            <input
              type="number"
              step="1"
              name="minEngineCapacity"
              min={minEngineCapacity}
              max={maxEngineCapacity}
              defaultValue={filters?.engineCapacity?.min ?? minEngineCapacity}
            />
            <label htmlFor="maxEngineCapacity">Max</label>
            <input
              type="number"
              step="1"
              name="maxEngineCapacity"
              min={minEngineCapacity}
              max={maxEngineCapacity}
              defaultValue={filters?.engineCapacity?.max ?? maxEngineCapacity}
            />
          </div>
        </section>
        <input type="reset" value="Reset" />
        <button onClick={handleCancel}>Cancel</button>
        <input type="submit" value="Apply filters" />
      </form>
    </div>
  )
}

export default VehicleFilters
