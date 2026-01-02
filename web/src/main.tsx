import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssVarsProvider } from '@mui/joy'
import { BrowserRouter } from 'react-router'

import './index.css'
import App from './App.tsx'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CssVarsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CssVarsProvider>   
    </Provider>
  </StrictMode>,
);
