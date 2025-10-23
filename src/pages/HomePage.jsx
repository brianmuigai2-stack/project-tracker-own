import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { user } = useAuth();

  return (
    <div 
        className="p-8 rounded-xl shadow-2xl max-w-2xl mx-auto text-center"
        style={{
            backgroundColor: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)',
            borderColor: 'var(--color-border)'
        }}
    >
      <h1 
        className="text-4xl font-extrabold mb-4"
        style={{ color: 'var(--color-indigo-600)' }}
      >
        Welcome, {user?.name || 'User'}!
      </h1>
      
      <p 
        className="text-xl mb-8"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        You've successfully logged into the Project Tracker.
      </p>

      <div className="space-y-4">
        <Link 
            to="/dashboard" 
            className="inline-block py-3 px-6 text-white text-lg font-semibold rounded-lg transition"
            style={{ backgroundColor: 'var(--color-indigo-600)' }}
        >
            Go to My Projects Dashboard
        </Link>
        
        <p className="text-sm pt-4" style={{ color: 'var(--color-text-secondary)' }}>
            Start managing your tasks and tracking your team's progress.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
