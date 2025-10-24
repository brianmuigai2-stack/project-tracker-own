import React, { useState } from 'react';

// ===================================================================
// IMPORTANT: These helper functions at the top are required.
// Do not delete them.
// ===================================================================

// List of icons for projects
const PROJECT_ICONS = [
  '📊', '📈', '📉', '📋', '📝', '🗂️', '📁', '🗃️', 
  '📌', '📍', '🔍', '💡', '🎯', '🚀', '⚡', '🔧',
  '🎨', '🖌️', '📐', '📏', '🔬', '🧪', '🔭', '🌐'
];

// List of sample names for project creators
const CREATOR_NAMES = [
  'Alex Johnson', 'Sam Williams', 'Jordan Smith', 'Taylor Brown',
  'Morgan Davis', 'Casey Miller', 'Riley Wilson', 'Avery Moore',
  'Quinn Taylor', 'Drew Anderson', 'Blake Thomas', 'Cameron Jackson',
  'Dakota White', 'Emerson Harris', 'Parker Martin', 'Reese Thompson',
  'Rowan Garcia', 'Sage Martinez', 'River Robinson', 'Skye Clark'
];

// Function to get a consistent icon based on project ID
function getProjectIcon(projectId) {
  const idString = String(projectId); 
  const index = idString.charCodeAt(0) % PROJECT_ICONS.length;
  return PROJECT_ICONS[index];
}

// Function to get a consistent creator based on project ID
function getProjectCreator(projectId) {
  const idString = String(projectId);
  const index = idString.charCodeAt(0) % CREATOR_NAMES.length;
  const name = CREATOR_NAMES[index];
  const avatarIndex = index + 1;
  return {
    name,
    avatar: `https://i.pravatar.cc/150?img=${avatarIndex}`
  };
}

// ===================================================================
// Main Component
// ===================================================================

function ProjectListItem({ project, onDelete, onUpdateProject }) {
  // State for managing edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [tempProgress, setTempProgress] = useState(project.progress || 0);

  const progress = project.progress || 0; 
  const progressWidth = `${progress}%`;
  
  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-red-500';
  };
  
  const progressBarColor = getProgressColor(progress);

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case 'Completed':
        return { bgColor: 'bg-green-100', textColor: 'text-green-800', darkBgColor: 'dark:bg-green-800', darkTextColor: 'dark:text-green-100' };
      case 'In Progress':
        return { bgColor: 'bg-blue-100', textColor: 'text-blue-800', darkBgColor: 'dark:bg-blue-800', darkTextColor: 'dark:text-blue-100' };
      case 'Stuck':
        return { bgColor: 'bg-red-100', textColor: 'text-red-800', darkBgColor: 'dark:bg-red-800', darkTextColor: 'dark:text-red-100' };
      default:
        return { bgColor: 'bg-gray-100', textColor: 'text-gray-800', darkBgColor: 'dark:bg-gray-800', darkTextColor: 'dark:text-gray-100' };
    }
  };

  const statusStyles = getStatusBadgeStyles(project.status);
  
  const projectIcon = project.icon || getProjectIcon(project.id);
  const creator = project.creatorName && project.creatorAvatar 
    ? { name: project.creatorName, avatar: project.creatorAvatar }
    : getProjectCreator(project.id);

  // Handlers for editing
  const handleEditClick = () => {
    setIsEditing(true);
    setTempProgress(progress); 
  };

  const handleSaveClick = () => {
    onUpdateProject(project.id, { progress: tempProgress });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTempProgress(progress); 
  };

  // Handler for deleting with confirmation
  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`);
    
    if (isConfirmed) {
      onDelete(project.id);
    }
  };

  return (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150">
      
      {/* 1. Project Icon */}
      <div className="flex-shrink-0 text-2xl">
        {projectIcon}
      </div>
      
      {/* 2. Project Title and Creator */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">{project.title}</p>
        <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mt-0.5">
          <span className="font-medium">Project by:</span>
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-4 h-4 rounded-full object-cover"
          />
          <span className="truncate">{creator.name.split(' ')[0]}</span> 
        </div>
      </div>
      
      {/* 3. Progress Bar / Editor */}
      <div className="w-56 hidden md:block">
        {isEditing ? (
          <input
            type="range"
            min="0"
            max="100"
            value={tempProgress}
            onChange={(e) => setTempProgress(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        ) : (
          <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-2 rounded-full ${progressBarColor}`}
              style={{ width: progressWidth }}
            ></div>
          </div>
        )}
      </div>
      
      {/* 4. Progress Percentage / Edit Controls */}
      <div className="w-24 text-right text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:flex items-center justify-end space-x-1">
        {isEditing ? (
          <>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{tempProgress}%</span>
            <button onClick={handleSaveClick} className="text-green-600 hover:text-green-800 font-bold" title="Save">✓</button>
            <button onClick={handleCancelClick} className="text-red-600 hover:text-red-800 font-bold" title="Cancel">✕</button>
          </>
        ) : (
          <>
            <span>{progressWidth}</span>
            <button onClick={handleEditClick} className="text-gray-500 hover:text-indigo-600 font-bold" title="Edit Progress">✏️</button>
          </>
        )}
      </div>

      {/* 5. Status Badge */}
      <div className="w-20 text-right">
        <span 
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles.bgColor} ${statusStyles.textColor} ${statusStyles.darkBgColor} ${statusStyles.darkTextColor}`}
        >
          {project.status || 'N/A'} 
        </span>
      </div>

      {/* 6. Delete Button */}
      <div className="w-20 text-right">
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 text-white text-xs font-medium py-1 px-2 rounded-lg hover:bg-red-600 transition"
          aria-label="Delete Project"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectListItem;