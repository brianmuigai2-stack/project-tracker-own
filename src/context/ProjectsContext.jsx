import React, { createContext, useState, useEffect, useContext } from 'react';
import db from '../../db.json'; 

const ProjectsContext = createContext();

export const useProjects = () => {
    return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- LOADING LOGIC (runs once on startup) ---
    useEffect(() => {
        const savedProjects = localStorage.getItem('projects');
        
        if (savedProjects && savedProjects !== '[]') {
            setProjects(JSON.parse(savedProjects));
        } else {
            setProjects(db.projects);
        }
        setIsLoading(false);
    }, []);

    // --- SAVING LOGIC (runs whenever 'projects' changes) ---
    // --- THE FIX IS HERE ---
    useEffect(() => {
        // Only save if there are actually projects to save.
        // This prevents accidentally overwriting localStorage with an empty array.
        if (projects.length > 0) {
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    }, [projects]);

    const addProject = (projectData) => {
        const newProject = {
            id: Date.now().toString(), 
            title: projectData.title,
            description: projectData.description,
            dueDate: projectData.dueDate,
            progress: projectData.progress || 0,
            creatorName: projectData.creatorName,
            creatorAvatar: projectData.creatorAvatar,
            status: projectData.status || 'In Progress',
            createdAt: new Date().toISOString(),
        };
        setProjects(prevProjects => [...prevProjects, newProject]);
    };

    const deleteProject = (projectId) => {
        setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
    };
    
    const updateProject = (projectId, updatedData) => {
        setProjects(prevProjects => 
            prevProjects.map(project => 
                String(project.id) === String(projectId) ? { ...project, ...updatedData } : project
            )
        );
    };

    const value = {
        projects,
        isLoading,
        error,
        addProject,
        deleteProject,
        updateProject,
    };

    return (
        <ProjectsContext.Provider value={value}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsContext;