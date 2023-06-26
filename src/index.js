/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './apps/components/css/index.css'
import App from './apps/App'
import reportWebVitals from './reportWebVitals'
import '@fortawesome/fontawesome-free/css/all.css'
import 'animate.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportWebVitals()
