import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Define the available avatars and ranks
const AVATARS = [
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=6',
    'https://i.pravatar.cc/150?img=8',
    'https://i.pravatar.cc/150?img=12',
];

const RANKS = ['Intern', 'Associate', 'Senior', 'Lead'];

function LoginPage() {
    const [name, setName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
    const [selectedRank, setSelectedRank] = useState(RANKS[0]);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Please enter your name.');
            return;
        }

        // Simulate login: pass the collected profile data to the context.
        // We generate a default email and use the password 'password' to match the AuthContext.
        const defaultEmail = `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
        const defaultPassword = 'password'; // IMPORTANT: Must match the password in AuthContext
        
        // Call the login function with all the user's profile data
        login(defaultEmail, defaultPassword, name, selectedAvatar, selectedRank);
        
        // Navigate to the home page after successful login
        navigate('/');
    };

    return (
        <div 
            className="flex flex-col items-center justify-center min-h-[70vh]"
            style={{ color: 'var(--color-text-primary)' }}
        >
            <div 
                className="card p-8 w-full max-w-md rounded-xl shadow-2xl transition-colors duration-300"
                style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    border: '1px solid var(--color-border)'
                }}
            >
                <h2 
                    className="text-3xl font-bold mb-6 text-center"
                    style={{ color: 'var(--color-accent-600)' }}
                >
                    Create Your Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 1. Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="input-field w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50"
                            style={{
                                color: 'var(--color-text-primary)',
                                borderColor: 'var(--color-border)',
                                '--tw-ring-color': 'var(--color-accent-600)',
                            }}
                            required
                        />
                    </div>

                    {/* 2. Avatar Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-3">
                            Select Avatar
                        </label>
                        <div className="flex justify-between space-x-3">
                            {AVATARS.map((avatarUrl) => (
                                <img
                                    key={avatarUrl}
                                    src={avatarUrl}
                                    alt="Profile Avatar"
                                    onClick={() => setSelectedAvatar(avatarUrl)}
                                    className={`w-16 h-16 rounded-full object-cover cursor-pointer transition-all duration-200 border-4 ${
                                        selectedAvatar === avatarUrl 
                                            ? 'ring-2 ring-offset-2' 
                                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                                    }`}
                                    style={{
                                        borderColor: selectedAvatar === avatarUrl ? 'var(--color-accent-600)' : 'var(--color-border)',
                                        '--tw-ring-color': 'var(--color-accent-600)',
                                        ringOffsetColor: 'var(--color-bg-primary)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 3. Rank Selection */}
                    <div>
                        <label htmlFor="rank" className="block text-sm font-medium mb-2">
                            Select Rank
                        </label>
                        <select
                            id="rank"
                            value={selectedRank}
                            onChange={(e) => setSelectedRank(e.target.value)}
                            className="input-field w-full px-4 py-2 rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-opacity-50"
                            style={{
                                color: 'var(--color-text-primary)',
                                borderColor: 'var(--color-border)',
                                '--tw-ring-color': 'var(--color-accent-600)',
                            }}
                        >
                            {RANKS.map((rank) => (
                                <option key={rank} value={rank}>
                                    {rank}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-sm font-medium p-2 rounded-lg" style={{ color: 'var(--color-red-500)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                            {error}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity duration-200"
                        style={{ backgroundColor: 'var(--color-accent-600)' }}
                    >
                        Create Profile & Start Tracking
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;