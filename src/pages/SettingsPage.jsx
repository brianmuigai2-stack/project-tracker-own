// src/pages/SettingsPage.jsx (Complete Code)

import React from 'react';
import { useThemeContext } from '../context/ThemeContext'; 

function SettingsPage() {
  const { 
    theme, 
    fontSize, 
    cycleTheme, // Use the 3-way cycle function
    increaseFontSize, 
    decreaseFontSize 
  } = useThemeContext();

  const getNextThemeLabel = () => {
    if (theme === 'light') return 'Dark 🌙';
    if (theme === 'dark') return 'Colorful 🌈';
    return 'Light 💡';
  };

  // FINAL FIX: Use custom theme classes and rely on CSS variables
  const containerClasses = "theme-card-bg p-8 rounded-xl shadow-lg min-h-[500px] transition duration-300";
  const sectionClasses = "mb-8 p-4 theme-section-bg rounded-lg flex justify-between items-center transition duration-300";
  // Text inherits primary color from App.jsx or uses custom classes
  const headingClasses = "text-xl font-semibold"; 
  const textClasses = "text-sm theme-text-secondary"; 
  const mainHeadingClasses = "text-3xl font-bold mb-6 border-b pb-3 border-gray-200";

  return (
    <div className={containerClasses}>
      <h1 className={mainHeadingClasses}>
        Application Settings & Preferences
      </h1>

      {/* --- 1. Theme Toggle Setting --- */}
      <div className={sectionClasses}>
        <div>
          <h2 className={headingClasses}>Theme Mode</h2>
          <p className={textClasses}>Current setting: {theme.toUpperCase()}</p>
        </div>
        
        <button 
          onClick={cycleTheme}
          className="px-4 py-2 rounded-full font-medium transition duration-300 bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Switch to {getNextThemeLabel()}
        </button>
      </div>

      {/* --- 2. Font Size Setting --- */}
      <div className={sectionClasses.replace('mb-8', '')}>
        <div>
          <h2 className={headingClasses}>Font Size</h2>
          <p className={textClasses}>Current base size: {fontSize}px</p>
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={decreaseFontSize} 
            disabled={fontSize <= 12}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-red-600 transition"
          >
            A-
          </button>
          <button 
            onClick={increaseFontSize} 
            disabled={fontSize >= 22}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-600 transition"
          >
            A+
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;