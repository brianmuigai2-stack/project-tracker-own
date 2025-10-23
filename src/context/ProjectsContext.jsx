import React, { createContext, useState, useEffect, useContext } from 'react';

// --- IMPORT YOUR JSON FILE ---
import db from '../../db.json'; 

const ProjectsContext = createContext();

export const useProjects = () => {
    return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // This effect runs once on component mount to load the initial data
    useEffect(() => {
        const loadProjects = () => {
            try {
                setIsLoading(true);
                setError(null);

                const savedProjects = localStorage.getItem('projects');
                
                // --- THE FIX IS HERE ---
                // Only use localStorage data if it exists AND is not an empty array string.
                if (savedProjects && savedProjects !== '[]') {
                    const parsedProjects = JSON.parse(savedProjects);
                    setProjects(parsedProjects);
                } else {
                    // If localStorage is empty or has an empty array, load from the JSON file.
                    setProjects(db.projects);
                }
            } catch (e) {
                console.error("Failed to load projects:", e);
                setError("Failed to load projects. Please refresh the page.");
                // As a fallback, try to load from the JSON file
                setProjects(db.projects);
            } finally {
                setIsLoading(false);
            }
        };

        loadProjects();
    }, []); // Empty dependency array means this runs only once

    // This effect saves the projects to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
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