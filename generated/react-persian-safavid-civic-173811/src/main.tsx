import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Pull the design-system tokens + base typography into Vite's bundle so they
// land in dist/assets/. Without this import, the CSS file lives in the task
// root but never gets shipped to dist/.
import '../design-system.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
