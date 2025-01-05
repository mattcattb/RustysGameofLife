import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react'

import { themeOptions } from './contexts/Theme.tsx';
import { createTheme } from '@mui/material'

const theme = createTheme(themeOptions);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </StrictMode>,
)
