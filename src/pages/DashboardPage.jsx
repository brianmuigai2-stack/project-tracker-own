import React from 'react';
import { useProjects } from '../context/ProjectsContext'; 
import ProjectList from '../components/ProjectList';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const SummaryCard = ({ icon, label, count, color, percentage }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border-b-4 border-l-2" style={{ borderColor: color }}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{count}</p>
      </div>
      <div className={`p-2 rounded-full text-white ${color} opacity-80`}>
        {icon}
      </div>
    </div>
    {percentage && (
      <p className="text-sm mt-3 font-semibold" style={{ color: color }}>
        {percentage}
      </p>
    )}
  </div>
);

function DashboardPage() {
  const { user } = useAuth();
  // 1. Get the updateProject function from the context
  const { projects, isLoading, error, updateProject } = useProjects(); 

  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
  
  const pendingProjects = totalProjects - completedProjects - inProgressProjects;

  const completionRate = totalProjects > 0 
    ? ((completedProjects / totalProjects) * 100).toFixed(0) + '%'
    : '0%';

  if (isLoading) {
    return <div className="text-center mt-20 text-indigo-600 dark:text-indigo-400"><p className="text-2xl font-semibold">Loading projects...</p></div>;
  }

  if (error) {
    return <div className="text-center mt-20 p-8 bg-red-100 dark:bg-red-900 border border-red-400 rounded-lg text-red-700 dark:text-red-300"><h2 className="text-xl font-bold mb-2">Error Loading Data</h2><p>{error}</p></div>;
  }

  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Hello, {user?.name?.split(' ')[0] || 'User'}!
        </h1>
        <Link to="/add" className="py-2 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition hidden md:block">
          + Add New Project
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <SummaryCard icon="📝" label="Total Projects" count={totalProjects} color="#3b82f6" />
        <SummaryCard icon="⏳" label="Pending Projects" count={pendingProjects} color="#f59e0b" />
        <SummaryCard icon="✅" label="Completed Projects" count={completedProjects} color="#10b981" />
        <SummaryCard icon="📈" label="Completion Rate" count={completionRate} color="#ef4444" percentage={completionRate} />
      </div>

      {/* 2. Pass the function to ProjectList as a prop named "onUpdateProject" */}
      <ProjectList projects={projects} onUpdateProject={updateProject} />
    </div>
  );
}

export default DashboardPage;