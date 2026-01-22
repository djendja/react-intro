import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProvider } from './providers/AppContext.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </StrictMode>,
)
