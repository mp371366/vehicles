import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../../api/api'

export const fetchModels = createAsyncThunk('/models', async (make: string) => {
  return await api.get<string[]>('/models', { make })
})

const modelsSlice = createSlice({
  name: 'models',
  initialState: { models: [] as string[] },
  reducers: {},
  extraReducers: {
    [fetchModels.fulfilled.toString()]: (state, action: PayloadAction<string[]>) => {
      state.models = action.payload
    },
  },
})

const modelsReducer = modelsSlice.reducer
export default modelsReducer
