import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { CountProvider } from './context/CounterContext'

ReactDOM.render(
  <React.StrictMode>
    <CountProvider>
      <App />
    </CountProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
