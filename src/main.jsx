import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { IssueProvider } from './context/IssueContext'

ReactDOM.render(
  <React.StrictMode>
    <IssueProvider>
      <App />
    </IssueProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
