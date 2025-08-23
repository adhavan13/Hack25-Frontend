import React from 'react';

const ProjectGrid = ({ projects }) => {
  // Helper function to determine status badge color - now always returns green
  const getStatusColor = (status) => {
    // Use the same green color for all statuses
    return 'bg-[#72e3ad] text-black';
  };

  // Function to get a placeholder image based on project data
  const getProjectImage = (project) => {
    // Use project scheme or title to determine image
    const scheme = project.scheme.toLowerCase();
    
    // Return appropriate image based on scheme keywords
    if (scheme.includes('agriculture') || scheme.includes('farm'))
      return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWdyaUNCdUx0dXJlJTIwZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';
    if (scheme.includes('education') || scheme.includes('school'))
      return 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWR1Y2F0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60';
    if (scheme.includes('health') || scheme.includes('medical'))
      return 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoY2FyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60';
    if (scheme.includes('water') || scheme.includes('sanitation'))
      return 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';
    if (scheme.includes('infrastructure') || scheme.includes('building'))
      return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5mcmFzdHJ1Y3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';
    
    // Default image if no specific category matches
    return `https://source.unsplash.com/500x300/?${encodeURIComponent(project.scheme)}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-2">
      {projects.map((project) => (
        <div 
          key={project.id}
          className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300 transition-all duration-200 transform hover:-translate-y-1"
        >
          {/* Project Image with Overlapping Title - Reduced height from h-64 to h-48 */}
          <div className="h-48 overflow-hidden relative">
            <img 
              src={getProjectImage(project)}
              alt={`${project.scheme} illustration`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/500x300?text=Project+Image";
              }}
            />
            {/* Overlapping title with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="w-full p-4">
                <h2 className="text-2xl font-bold text-white text-left line-clamp-2 drop-shadow-md ">
                  {project.project_title}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white">
            {/* Scheme Name and Status on the same line */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">{project.scheme}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} shadow-sm`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;