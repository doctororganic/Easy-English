import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import './index.css'
import App from './App.tsx'

// Get base path for GitHub Pages
const getBasename = () => {
  // Check if we're on GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    const pathParts = window.location.pathname.split('/');
    // GitHub Pages format: username.github.io/repo-name/
    if (pathParts.length > 1 && pathParts[1]) {
      return '/' + pathParts[1];
    }
  }
  return '/';
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={getBasename()}>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
