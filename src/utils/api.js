const API_URL = "https://poppy-flix-server-88cl.vercel.app/projects";

export const fetchProjects = () =>
  fetch(API_URL).then(res => res.json());

export const createProject = (project) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project)
  }).then(res => res.json());
