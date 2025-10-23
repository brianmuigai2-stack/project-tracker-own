import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectsProvider } from './context/ProjectsContext';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage'; // NEW IMPORT
import ProjectForm from './components/ProjectForm';
import Navbar from './components/NavBar';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Router>
        <AuthProvider>
          <ProjectsProvider>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="/add" element={<PrivateRoute><ProjectForm /></PrivateRoute>} />
                {/* NEW ROUTE */}
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              </Routes>
            </main>
          </ProjectsProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;