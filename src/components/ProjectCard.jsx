// src/components/ProjectCard.jsx

import React from 'react';

// Utility map for consistent color styling
const colorMap = {
  indigo: { bg: "bg-indigo-500", text: "text-indigo-600" },
  green: { bg: "bg-green-500", text: "text-green-600" },
  blue: { bg: "bg-blue-400", text: "text-blue-500" },
  red: { bg: "bg-red-500", text: "text-red-500" },
};

function ProjectCard({ title, value, stat, color, icon = '★' }) {
  const { bg, text } = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center transition duration-300 hover:shadow-lg">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className={`text-4xl font-bold mt-1 ${text}`}>{value}</p>
        <p className="text-xs text-gray-500 mt-1">
          {/* Stat is a placeholder for dynamic change indicator */}
          <span className="font-semibold text-green-600 mr-1">{stat}</span> 
          vs last month
        </p>
      </div>
      
      {/* Icon Circle */}
      <div className={`p-3 rounded-full ${bg} text-white text-xl`}>
        {icon} 
      </div>
    </div>
  );
}

export default ProjectCard;