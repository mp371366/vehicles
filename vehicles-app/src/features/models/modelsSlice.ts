import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../../api/api'

export const fetchModels = createAsyncThunk('/models', async (make: string) => {
  return await api.get<string[]>('/models', { make })
})

const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    models: [] as string[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: {
    [fetchModels.pending.toString()]: (state) => {
      state.loading = true
    },
    [fetchModels.fulfilled.toString()]: (state, action: PayloadAction<string[]>) => {
      state.models = action.payload
      state.loading = false
    },
    [fetchModels.rejected.toString()]: (state, action) => {
      state.error = action.error.message
      state.loading = false
    },
  },
})

const modelsReducer = modelsSlice.reducer
export default modelsReducer
