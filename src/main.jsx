import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/context/AuthProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster 
          gutter={8}
          toastOptions={{
            duration: 4000
          }}
        />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
