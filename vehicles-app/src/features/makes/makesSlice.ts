import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../../api/api'

export const fetchMakes = createAsyncThunk('/makes', async () => {
  return await api.get<string[]>('/makes')
})

const makesSlice = createSlice({
  name: 'makes',
  initialState: {
    makes: [] as string[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: {
    [fetchMakes.pending.toString()]: (state) => {
      state.loading = true
    },
    [fetchMakes.fulfilled.toString()]: (state, action: PayloadAction<string[]>) => {
      state.makes = action.payload
      state.loading = false
    },
    [fetchMakes.rejected.toString()]: (state, action) => {
      state.error = action.error.message
      state.loading = false
    },
  },
})

const makesReducer = makesSlice.reducer
export default makesReducer

export const { setError } = makesSlice.actions
