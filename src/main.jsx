import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/themeContext';
import './utility/db';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';

window.navigator.serviceWorker.register('sw.js');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
