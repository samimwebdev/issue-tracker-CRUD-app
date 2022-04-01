import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './routes/App'
import { IssueProvider } from './context/IssueContext'
import { BarCounterContextProvider } from './context/BarCounterContext'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BarCounterContextProvider>
          <IssueProvider>
            <App />
          </IssueProvider>
        </BarCounterContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
