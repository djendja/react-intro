import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProvider } from './providers/AppContext.js'
import { RouterProvider } from 'react-router'
import { router } from './router/routes.js'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from './router/routesTanstack.js'
import { Provider } from 'react-redux'
import { store } from './state/store.js'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
});
const tanstackRouter = createRouter(queryClient);

createRoot((document.getElementById('root') as HTMLElement)).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <RouterProvider router={tanstackRouter}/>
        </AppProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
