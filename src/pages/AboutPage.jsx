import React from 'react';
import { useAuth } from '../context/AuthContext';

function AboutPage() {
    const { user, isAuthenticated } = useAuth();
    
    // Use the secondary background and border colors via CSS variables
    const cardStyle = {
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        borderColor: 'var(--color-border)',
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-4xl font-extrabold mb-6" style={{ color: 'var(--color-indigo-600)' }}>
                About Project Tracker
            </h1>
            
            <div className="p-6 rounded-xl shadow-lg border" style={cardStyle}>
                <p className="text-lg mb-4">
                    Welcome to **Project Tracker**, your simple, collaborative tool for managing small team projects, assignments, or personal goals. 
                    This application is designed to demonstrate modern React development practices, including:
                </p>

                <ul className="list-disc ml-6 space-y-2 mb-6" style={{ color: 'var(--color-text-primary)' }}>
                    <li>**State Persistence:** Utilizing `localStorage` (as implemented in your `AuthContext.jsx`) to keep users logged in across browser refreshes.</li>
                    <li>**Context API:** Centralized state management for Authentication and Projects.</li>
                    <li>**Functional Routing:** Using `react-router-dom` to manage navigation between pages like Home, Dashboard, and Login.</li>
                    <li>**Theming:** Implementing a dynamic light/dark mode using pure CSS variables for robust styling.</li>
                </ul>

                <p className="text-md mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {isAuthenticated 
                        ? `You are currently logged in as ${user?.name}. Head over to the Dashboard to manage your projects.`
                        : `Log in now to start tracking your projects!`
                    }
                </p>

                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-indigo-600)' }}>Developer Notes</h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        This application is built for learning and collaboration. Key technologies used include React, React Router DOM, and a custom CSS variable setup for theming.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;