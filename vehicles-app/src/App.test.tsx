import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

test('renders makes header', () => {
  const { getByText } = render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  )

  expect(getByText(/Makes/i)).toBeInTheDocument()
})
