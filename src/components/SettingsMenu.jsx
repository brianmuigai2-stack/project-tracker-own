// src/components/SettingsMenu.jsx

import React from 'react';
import { useTheme } from '../context/ThemeContext';

const themes = [
  { value: 'bright', label: 'Bright ☀️' },
  { value: 'dark', label: 'Dark 🌙' },
  { value: 'colorful', label: 'Colorful ✨' },
];

const fontSizes = [
  { value: 'small', label: 'A (Small)' },
  { value: 'medium', label: 'A+ (Medium)' },
  { value: 'large', label: 'A++ (Large)' },
];

function SettingsMenu() {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  
  const buttonClass = (current, value) => 
    `flex-1 p-2 rounded-lg font-semibold text-sm transition text-center ${
      current === value 
        ? 'bg-indigo-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`;
    
  const containerStyle = "p-4 space-y-4 rounded-xl shadow-2xl bg-white border border-gray-300 transform translate-x-0";

  return (
    <div className="absolute top-full right-0 mt-2 w-80 z-50">
      <div className={containerStyle}>
        
        {/* Theme Selector */}
        <div>
          <h4 className="text-sm font-bold mb-2 text-gray-700 border-b pb-1">Display Theme</h4>
          <div className="flex justify-between space-x-2">
            {themes.map(t => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={buttonClass(theme, t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Selector */}
        <div>
          <h4 className="text-sm font-bold mb-2 text-gray-700 border-b pb-1">Font Size</h4>
          <div className="flex justify-between space-x-2">
            {fontSizes.map(f => (
              <button
                key={f.value}
                onClick={() => setFontSize(f.value)}
                className={buttonClass(fontSize, f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;