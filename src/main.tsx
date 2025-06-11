import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position='bottom-center'
      containerStyle={{
        borderRadius: 99999,
      }}
    />
  </StrictMode>,
)
