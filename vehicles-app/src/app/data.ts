import { combineReducers } from '@reduxjs/toolkit'
import makesReducer from '../features/makes/makesSlice'
import modelsReducer from '../features/models/modelsSlice'
import vehiclesReducer from '../features/vehicles/vehiclesSlice'

const dataReducer = combineReducers({
  makes: makesReducer,
  models: modelsReducer,
  vehicles: vehiclesReducer,
})

export default dataReducer
