import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Hide loading spinner when React mounts
const hideLoadingSpinner = () => {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.display = 'none';
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// Hide loading spinner after React mounts
setTimeout(hideLoadingSpinner, 500);
