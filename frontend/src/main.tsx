import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import TheRouter from './Router' ;


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    < TheRouter />
  </StrictMode>,

)
