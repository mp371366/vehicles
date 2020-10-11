import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../../api/api'

export type VehiclesParams = {
  make: string
  model: string
}

export type Vehicle = {
  make: string
  model: string
  enginePowerPS: number
  enginePowerKW: number
  fuelType: string
  bodyType: string
  engineCapacity: number
}

export const fetchVehicles = createAsyncThunk('/vehicles', async (params: VehiclesParams) => {
  return await api.get<Vehicle[]>('/vehicles', params)
})

type MinMax = {
  min: number
  max: number
}

export type VehicleFilters = {
  enginePowerPS: MinMax
  enginePowerKW: MinMax
  fuelType: string
  bodyType: string
  engineCapacity: MinMax
}

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [] as Vehicle[],
    loading: false,
    error: null as string | null,
    showFilters: false,
    filters: null as VehicleFilters | null,
  },
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setShowFilters: (state, action: PayloadAction<boolean>) => {
      state.showFilters = action.payload
    },
    setFilters: (state, action: PayloadAction<VehicleFilters | null>) => {
      state.filters = action.payload
    },
  },
  extraReducers: {
    [fetchVehicles.pending.toString()]: (state) => {
      state.loading = true
    },
    [fetchVehicles.fulfilled.toString()]: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload
      state.loading = false
    },
    [fetchVehicles.rejected.toString()]: (state, action) => {
      state.error = action.error.message
      state.loading = false
    },
  },
})

const vehiclesReducer = vehiclesSlice.reducer
export default vehiclesReducer

export const { setError, setShowFilters, setFilters } = vehiclesSlice.actions
