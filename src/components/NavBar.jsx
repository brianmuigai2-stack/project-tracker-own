import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// --- Theme and Font Utilities ---

const THEMES = [
    { name: 'Indigo', class: 'theme-indigo', color: '#4f46e5' },
    { name: 'Teal', class: 'theme-teal', color: '#0d9488' },
    { name: 'Purple', class: 'theme-purple', color: '#9333ea' },
];

// Helper to set the theme class on the document root
// --- FIX: Added try...catch for safety ---
const setThemeClass = (themeClass) => {
    try {
        // 1. Get current class list and filter out old theme classes
        const currentClasses = document.documentElement.className
            .split(' ')
            .filter(c => !c.startsWith('theme-') && c !== ''); // Remove previous theme classes and empty strings
        
        // 2. Preserve dark class
        const isDark = document.documentElement.classList.contains('dark') ? ' dark' : '';

        // 3. Rebuild the class list
        if (themeClass !== 'theme-indigo') {
            document.documentElement.className = currentClasses.join(' ') + ' ' + themeClass + isDark;
        } else {
             // If indigo, just keep dark/light mode and existing non-theme classes
             document.documentElement.className = currentClasses.join(' ') + isDark;
        }
        document.documentElement.className = document.documentElement.className.trim();
    } catch (error) {
        console.error("Error setting theme class:", error);
    }
};

// Component to handle color theme switching
function ColorThemeControl() {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const storedTheme = localStorage.getItem('colorTheme');
        return storedTheme || 'theme-indigo'; 
    });

    useEffect(() => {
        setThemeClass(currentTheme);
    }, [currentTheme]);

    const handleThemeChange = (themeClass) => {
        setCurrentTheme(themeClass);
        localStorage.setItem('colorTheme', themeClass);
        setThemeClass(themeClass);
    };

    return (
        <div className="p-2 border-t" style={{borderColor: 'var(--color-border)'}}>
            <h4 className="text-sm font-semibold mb-2" style={{color: 'var(--color-text-primary)'}}>Color Theme</h4>
            <div className="flex space-x-2 justify-between">
                {THEMES.map(theme => (
                    <button
                        key={theme.name}
                        onClick={() => handleThemeChange(theme.class)}
                        className={`w-1/3 py-1 rounded-lg text-sm transition font-medium ${currentTheme === theme.class ? 'ring-2 ring-offset-2' : 'hover:opacity-75'}`}
                        style={{
                            backgroundColor: theme.color,
                            color: 'white',
                            ringColor: currentTheme === theme.class ? 'var(--color-accent-600)' : 'transparent',
                            ringOffsetColor: 'var(--color-bg-primary)' 
                        }}
                        aria-label={`Select ${theme.name} theme`}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Component to handle font size adjustment
function FontSizeControl() {
    const [fontSize, setFontSize] = useState(() => 
        parseFloat(localStorage.getItem('fontSize') || 16)
    );

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    const changeFontSize = (delta) => {
        const newSize = Math.max(12, Math.min(20, fontSize + delta));
        setFontSize(newSize);
        localStorage.setItem('fontSize', newSize);
        document.documentElement.style.fontSize = `${newSize}px`;
    };

    return (
        <div className="p-2 border-t" style={{borderColor: 'var(--color-border)'}}>
            <h4 className="text-sm font-semibold mb-2" style={{color: 'var(--color-text-primary)'}}>Font Size ({fontSize}px)</h4>
            <div className="flex space-x-3 items-center">
                <button
                    onClick={() => changeFontSize(-1)}
                    disabled={fontSize <= 12}
                    className="w-1/2 py-1 rounded-lg transition text-xl font-bold"
                    style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)'
                    }}
                    aria-label="Decrease font size"
                >
                    A-
                </button>
                <button
                    onClick={() => changeFontSize(1)}
                    disabled={fontSize >= 20}
                    className="w-1/2 py-1 rounded-lg transition text-xl font-bold"
                    style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)'
                    }}
                    aria-label="Increase font size"
                >
                    A+
                </button>
            </div>
        </div>
    );
}

// --- Dark Mode Toggle Component ---
function DarkModeToggle() {
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains('dark')
    );

    useEffect(() => {
        const storedTheme = localStorage.getItem('colorTheme') || 'theme-indigo';
        setThemeClass(storedTheme);
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className="flex items-center justify-between p-2">
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Theme:
            </span>
            <button
                onClick={toggleTheme}
                className="py-1 px-3 rounded-lg transition"
                style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)'
                }}
                aria-label="Toggle theme"
            >
                {isDark ? '☀️ Dark' : '🌙 Light'}
            </button>
        </div>
    );
}

// --- Settings Popover Component ---
function SettingsMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useAuth();

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full transition"
                style={{ color: 'var(--color-text-primary)' }} 
                aria-expanded={showMenu}
                aria-label="Settings"
            >
                ⚙️
            </button>
            
            {showMenu && (
                <div 
                    className="absolute right-0 mt-2 w-64 p-0 rounded-lg shadow-xl z-20 border overflow-hidden"
                    style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)'
                    }}
                >
                    {/* User Profile */}
                    <div className="p-2 border-b" style={{borderColor: 'var(--color-border)'}}>
                        <h3 className="text-md font-semibold px-2 pb-1 border-b mb-2" style={{borderColor: 'var(--color-border)'}}>
                            User Profile
                        </h3>

                        <div className="flex items-center space-x-3 p-2 mb-2">
                            <img
                                src={user?.avatar}
                                alt={user?.name || 'User'}
                                className="w-10 h-10 rounded-full object-cover border-2" 
                                style={{borderColor: 'var(--color-accent-600)'}}
                            />
                            <div>
                                <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{user?.name}</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>@{user?.username || 'user'}</p>
                            </div>
                        </div>
                    </div>

                    {/* App Settings Title */}
                    <div className="p-2 border-b" style={{borderColor: 'var(--color-border)'}}>
                        <h3 className="text-md font-semibold px-2 pb-1" style={{borderColor: 'var(--color-border)'}}>
                            App Settings
                        </h3>
                    </div>

                    <ColorThemeControl />
                    <FontSizeControl />
                    <DarkModeToggle />

                </div>
            )}
        </div>
    );
}

// --- Main Navbar Component ---
function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header 
        className="shadow-md sticky top-0 z-10 transition-colors duration-300"
        style={{
            backgroundColor: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)'
        }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold" style={{color: 'var(--color-accent-600)'}}>
          Project Tracker
        </Link>

        <nav className="flex items-center space-x-4">
            
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-sm font-medium transition hidden sm:inline" style={{color: 'var(--color-text-primary)'}}>
                Home
              </Link>
              
              <Link to="/dashboard" className="text-sm font-medium transition hidden sm:inline" style={{color: 'var(--color-text-primary)'}}>
                Dashboard
              </Link>

              <Link to="/add" className="text-sm font-medium transition hidden sm:inline" style={{color: 'var(--color-text-primary)'}}>
                + Add Project
              </Link>
              
              <SettingsMenu /> 

              <Link to="/profile" className="flex items-center space-x-2 p-1 rounded-md transition hover:opacity-80" aria-label="User Profile">
                <img
                  src={user?.avatar} 
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover border-2"
                  style={{borderColor: 'var(--color-accent-600)'}}
                />
                <span className="text-sm font-medium hidden sm:inline">{user?.name?.split(' ')[0] || 'Guest'}</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="py-1 px-3 text-white text-sm font-medium rounded-lg transition"
                style={{backgroundColor: 'var(--color-red-500)'}}
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="py-1 px-3 text-white text-sm font-medium rounded-lg transition"
              style={{backgroundColor: 'var(--color-accent-600)'}}
            >
              Login
            </Link>
          )}

          <Link 
            to="/about" 
            className="text-sm font-medium transition" 
            style={{color: 'var(--color-text-primary)'}}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;