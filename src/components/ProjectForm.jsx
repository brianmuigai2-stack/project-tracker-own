// src/components/ProjectForm.jsx

import React, { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

function ProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  // --- NEW: Add state for progress ---
  const [progress, setProgress] = useState(0);

  const { addProject } = useProjects();
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Error: User data missing.");
      return;
    }
    
    // --- UPDATED: Pass the progress value as well ---
    addProject({
      title,
      description,
      dueDate,
      progress, // Include the progress from the state
      creatorName: user.name,
      creatorAvatar: user.avatar,
      status: 'In Progress', // Default status
    });

    // Reset form fields
    setTitle('');
    setDescription('');
    setDueDate('');
    setProgress(0); // Also reset progress
    
    // Navigate to dashboard to see the new project
    navigate('/dashboard');
  };

  return (
    <div className="p-8 rounded-xl shadow-lg max-w-2xl mx-auto bg-white dark:bg-gray-800 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 border-b pb-3 text-gray-900 dark:text-white">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium mb-1">Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
            placeholder="e.g., Redesign homepage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full p-3 border rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Detailed plan of the project..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full p-3 border rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* --- NEW: Progress Slider Input --- */}
        <div>
          <label htmlFor="progress" className="block text-sm font-medium mb-1">
            Initial Progress: <span className="font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
          </label>
          <input
            type="range"
            id="progress"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;