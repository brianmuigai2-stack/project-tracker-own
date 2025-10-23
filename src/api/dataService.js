// src/api/dataService.js

// CRITICAL: Must match the port used by json-server
const API_URL = "http://localhost:4000"; 

/**
 * Fetches all projects from the API.
 */
export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // Re-throw the error so it can be caught by the context provider
    throw error; 
  }
};

/**
 * Creates a new project in the API.
 */
export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error; 
  }
};