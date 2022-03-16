import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { IssueProvider } from './context/IssueContext'
import { BarCounterContextProvider } from './context/BarCounterContext'

ReactDOM.render(
  <React.StrictMode>
    <BarCounterContextProvider>
      <IssueProvider>
        <App />
      </IssueProvider>
    </BarCounterContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
