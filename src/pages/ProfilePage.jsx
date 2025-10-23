import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';

// Define the available avatars and ranks (same as in LoginPage)
const AVATARS = [
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=6',
    'https://i.pravatar.cc/150?img=8',
    'https://i.pravatar.cc/150?img=12',
];

const RANKS = ['Intern', 'Associate', 'Senior', 'Lead'];

function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        avatar: user?.avatar || AVATARS[0],
        rank: user?.rank || RANKS[0],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAvatarSelect = (avatarUrl) => {
        setFormData({ ...formData, avatar: avatarUrl });
    };

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset form data to the original user data
        setFormData({
            name: user?.name || '',
            avatar: user?.avatar || AVATARS[0],
            rank: user?.rank || RANKS[0],
        });
        setIsEditing(false);
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (!user) {
        return <div className="text-center p-8">Please log in to view your profile.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-5">
            <div 
                className="card p-8 rounded-xl shadow-2xl transition-colors duration-300"
                style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    border: '1px solid var(--color-border)'
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold" style={{ color: 'var(--color-accent-600)' }}>
                        My Profile
                    </h1>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="py-2 px-4 text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: 'var(--color-accent-600)' }}
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="space-x-2">
                            <button
                                onClick={handleSave}
                                className="py-2 px-4 text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: 'var(--color-green-500)' }}
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="py-2 px-4 text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: 'var(--color-gray-500)' }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Profile Content */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar Section */}
                    <div className="flex-shrink-0">
                        <img
                            src={isEditing ? formData.avatar : user.avatar}
                            alt="Profile Avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 mx-auto md:mx-0"
                            style={{ borderColor: 'var(--color-accent-600)' }}
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex-grow space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                                Name
                            </label>
                            {!isEditing ? (
                                <p className="text-lg" style={{ color: 'var(--color-text-primary)' }}>{user.name}</p>
                            ) : (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50"
                                    style={{
                                        color: 'var(--color-text-primary)',
                                        borderColor: 'var(--color-border)',
                                        '--tw-ring-color': 'var(--color-accent-600)',
                                    }}
                                />
                            )}
                        </div>

                        {/* Rank */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                                Rank
                            </label>
                            {!isEditing ? (
                                <p className="text-lg" style={{ color: 'var(--color-text-primary)' }}>{user.rank}</p>
                            ) : (
                                <select
                                    name="rank"
                                    value={formData.rank}
                                    onChange={handleChange}
                                    className="input-field w-full px-4 py-2 rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-opacity-50"
                                    style={{
                                        color: 'var(--color-text-primary)',
                                        borderColor: 'var(--color-border)',
                                        '--tw-ring-color': 'var(--color-accent-600)',
                                    }}
                                >
                                    {RANKS.map((rank) => (
                                        <option key={rank} value={rank}>{rank}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                                Email
                            </label>
                            <p className="text-lg" style={{ color: 'var(--color-text-primary)' }}>{user.email}</p>
                        </div>

                        {/* Member Since */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                                Member Since
                            </label>
                            <p className="text-lg" style={{ color: 'var(--color-text-primary)' }}>{formatDate(user.loginTime)}</p>
                        </div>
                    </div>
                </div>

                {/* Avatar Selection in Edit Mode */}
                {isEditing && (
                    <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                        <label className="block text-sm font-medium mb-3">Change Avatar</label>
                        <div className="flex justify-center md:justify-start space-x-3">
                            {AVATARS.map((avatarUrl) => (
                                <img
                                    key={avatarUrl}
                                    src={avatarUrl}
                                    alt="Profile Avatar"
                                    onClick={() => handleAvatarSelect(avatarUrl)}
                                    className={`w-16 h-16 rounded-full object-cover cursor-pointer transition-all duration-200 border-4 ${
                                        formData.avatar === avatarUrl
                                            ? 'ring-2 ring-offset-2'
                                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                                    }`}
                                    style={{
                                        borderColor: formData.avatar === avatarUrl ? 'var(--color-accent-600)' : 'var(--color-border)',
                                        '--tw-ring-color': 'var(--color-accent-600)',
                                        ringOffsetColor: 'var(--color-bg-primary)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;