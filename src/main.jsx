import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { IssueProvider } from './context/IssueContext'
import { BarCounterContextProvider } from './context/BarCounterContext'
import { AuthProvider } from './context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BarCounterContextProvider>
        <IssueProvider>
          <App />
        </IssueProvider>
      </BarCounterContextProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
