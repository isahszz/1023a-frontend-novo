import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './componentes/login/login.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
