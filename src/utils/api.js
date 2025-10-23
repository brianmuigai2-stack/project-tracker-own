const API_URL = "http://localhost:3001/projects";

export const fetchProjects = () =>
  fetch(API_URL).then(res => res.json());

export const createProject = (project) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project)
  }).then(res => res.json());
