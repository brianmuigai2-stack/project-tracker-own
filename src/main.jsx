// src/main.jsx (Ensure this runs outside React components)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

(function checkThemeOnLoad() {
  const theme = localStorage.getItem('theme');
  const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // This toggles the 'dark' class on the <html> element
  if (theme === 'dark' || (!theme && isDarkPreferred)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);