// src/context/ThemeContext.jsx (Complete Code)

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const DEFAULT_FONT_SIZE = 16;
const FONT_STEP = 2;

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem('fontSize')) || DEFAULT_FONT_SIZE
  );

  // Apply theme class and font size to the <html> element
  useEffect(() => {
    const root = document.documentElement;
    
    // CRITICAL: Clear all potential theme classes first
    root.classList.remove('dark', 'colorful');

    // Apply the current theme class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'colorful') {
      root.classList.add('colorful');
    }
    
    // Apply font size and save state
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', fontSize);
  }, [theme, fontSize]);

  // Function to switch between the three themes: light -> dark -> colorful -> light
  const cycleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'colorful';
      return 'light';
    });
  };

  const increaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + FONT_STEP, 22));
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - FONT_STEP, 12));
  };

  const contextValue = {
    theme,
    fontSize,
    cycleTheme,
    increaseFontSize,
    decreaseFontSize,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};