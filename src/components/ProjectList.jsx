import React from 'react';
import ProjectListItem from './ProjectListItem';
import { useProjects } from '../context/ProjectsContext';

// 1. Make sure onUpdateProject is received here as a prop
function ProjectList({ projects: propProjects, onUpdateProject }) {
  const { projects: contextProjects, deleteProject } = useProjects();
  const projects = propProjects || contextProjects;

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No projects yet. Create your first project!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Projects</h2>
      </div>
      <div>
        {projects.map(project => (
          <ProjectListItem 
            key={project.id} 
            project={project} 
            onDelete={deleteProject}
            // 2. Pass the function to each ProjectListItem
            onUpdateProject={onUpdateProject} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;