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

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [] as Vehicle[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
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
