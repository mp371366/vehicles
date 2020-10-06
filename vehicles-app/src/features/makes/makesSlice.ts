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
  reducers: {},
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
