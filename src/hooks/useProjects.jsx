// src/hooks/useProjects.jsx

import { useEffect } from 'react';
import { useProjectsContext } from '../context/ProjectsContext';
// ... other imports

export const useProjects = () => {
  // 🔑 CRITICAL FIX: Ensure setIsLoading is correctly destructured here
  const { 
    setInitialProjects, 
    setIsLoading, // <-- This is the one that was missing or misspelled!
    setError 
  } = useProjectsContext();
  
  // ... rest of the code
}