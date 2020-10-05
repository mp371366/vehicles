import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Makes from './features/makes/Makes'
import Models from './features/models/Models'
import Vehicles from './features/vehicles/Vehicles'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/:make/:model">
          <Vehicles />
        </Route>
        <Route path="/:make">
          <Models />
        </Route>
        <Route path="/">
          <Makes />
        </Route>
      </Switch>
    </div>
  )
}

export default App
