// src/components/ProjectList.jsx

import React from 'react';
import { useProjects } from '../context/ProjectsContext'; 
import ProjectListItem from './ProjectListItem'; 

function ProjectList() {
  const { projects, deleteProject } = useProjects();
  
  const sortedProjects = projects.slice().sort((a, b) => b.id - a.id);

  if (sortedProjects.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
        <h2 className="text-2xl font-semibold mb-2">No Projects Found</h2>
        <p className="text-lg">Add a new project to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800 dark:text-white">
        Recent Projects ({sortedProjects.length})
      </h2>
      
      {/* Header Row for alignment */}
      <div className="flex items-center space-x-4 py-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 border-b-2 border-indigo-500 mb-2">
        <div className="flex-1 min-w-0">Project Detail</div>
        <div className="w-56 hidden md:block">Progress</div>
        <div className="w-10 text-right hidden md:block">%</div>
        <div className="w-20 text-right">Status</div>
        <div className="w-10 text-right"></div>
      </div>

      {/* List Items */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedProjects.map((project) => (
          <ProjectListItem 
            key={project.id} 
            project={project} 
            onDelete={deleteProject} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;