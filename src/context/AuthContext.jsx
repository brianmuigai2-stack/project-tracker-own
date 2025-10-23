import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); 

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
        return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
        return null;
    }
  });

  const mockTemplateUser = {
    avatar: 'https://i.pravatar.cc/150?img=47',
    rank: 'Intern'
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, user]);

  const login = (input, password, name, avatar, rank) => {
    if (input && password === 'password') {
      const cleanInput = input.split('@')[0].trim();
      const displayName = name || (cleanInput.charAt(0).toUpperCase() + cleanInput.slice(1));
      
      const userData = input.includes('@') 
        ? { email: input, username: cleanInput }
        : { email: `${cleanInput}@example.com`, username: cleanInput };

      setIsAuthenticated(true);
      setUser({
        ...mockTemplateUser,
        ...userData, 
        name: displayName,
        avatar: avatar || mockTemplateUser.avatar,
        rank: rank || mockTemplateUser.rank,
        loginTime: new Date().toISOString()
      });
      return true;
    }
    return false;
  };

  const updateProfile = (profileData) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('theme'); 
  };

  const contextValue = { 
    isAuthenticated, 
    user, 
    login, 
    logout,
    updateProfile 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};