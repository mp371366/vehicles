import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../../api/api'

export const fetchMakes = createAsyncThunk('/makes', async () => {
  return await api.get<string[]>('/makes')
})

const makesSlice = createSlice({
  name: 'makes',
  initialState: { makes: [] as string[] },
  reducers: {},
  extraReducers: {
    [fetchMakes.fulfilled.toString()]: (state, action: PayloadAction<string[]>) => {
      state.makes = action.payload
    },
  },
})

const makesReducer = makesSlice.reducer
export default makesReducer
