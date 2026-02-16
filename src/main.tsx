import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProvider } from './providers/AppContext.js'
import { RouterProvider } from 'react-router'
import { router } from './router/routes.js'

createRoot((document.getElementById('root') as HTMLElement)).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </StrictMode>,
)
