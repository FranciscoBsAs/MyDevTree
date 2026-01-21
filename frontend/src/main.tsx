import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TheRouter from './Router' ;
import { QueryClient , QueryClientProvider } from '@tanstack/react-query' ;
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' ;


const theQueryClient = new QueryClient ;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={theQueryClient} >
      < TheRouter />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </StrictMode>,

)
