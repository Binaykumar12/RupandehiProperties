import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { PropertyProvider } from './context/PropertyContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <PropertyProvider>
        <App />
      </PropertyProvider>
    </ThemeProvider>
  </StrictMode>,
);
