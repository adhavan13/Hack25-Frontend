import React from 'react';
import { Heart, Eye } from 'lucide-react';

const ProjectGrid = ({ projects }) => {
  const formatViews = (views) => {
    return views >= 1000 ? `${(views / 1000).toFixed(1)}k` : `${views}k`;
  };

  const renderPreview = (preview, projectTitle) => {
    return (
      <div className="w-full h-48 bg-white rounded-lg overflow-hidden relative">
        {preview.map((item, index) => {
          // Replace green colors with our custom light green
          const updatedColor = item.color.includes('green') 
            ? 'bg-gray-100 text-black' 
            : item.color;
          
          if (item.type === 'mobile') {
            return (
              <div
                key={index}
                className={`absolute w-16 h-32 rounded-lg ${updatedColor} border-2 border-white shadow-lg`}
                style={{
                  left: `${20 + index * 25}%`,
                  top: '20%',
                  transform: index === 1 ? 'translateY(-10px)' : 'none'
                }}
              >
                <div className="w-full h-2 bg-white/20 rounded-t-lg"></div>
              </div>
            );
          } else if (item.type === 'card') {
            return (
              <div
                key={index}
                className={`absolute w-32 h-40 rounded-lg ${item.color} shadow-lg`}
                style={{
                  left: index === 0 ? '10%' : '50%',
                  top: '10%',
                  transform: index === 1 ? 'translateY(20px)' : 'none'
                }}
              >
                {projectTitle === 'Lantern' && index === 0 && (
                  <div className="p-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white text-xs">🏮</span>
                    </div>
                    <div className="text-white text-sm font-bold">Building the future of distribution</div>
                  </div>
                )}
              </div>
            );
          } else if (item.type === 'logo') {
            return (
              <div
                key={index}
                className={`absolute w-20 h-16 rounded-lg ${item.color} flex items-center justify-center shadow-lg`}
                style={{
                  left: index === 0 ? '20%' : '55%',
                  top: '35%',
                  transform: `rotate(${index === 0 ? -15 : 15}deg)`
                }}
              >
                <span className={`font-bold text-sm ${item.textColor || 'text-white'}`}>
                  {item.text}
                </span>
              </div>
            );
          } else if (item.type === 'brand') {
            return (
              <div
                key={index}
                className={`absolute w-24 h-20 rounded-lg ${item.color} shadow-lg flex items-center justify-center`}
                style={{
                  left: '15%',
                  top: '50%'
                }}
              >
                <div className="text-white">
                  <div className="w-8 h-8 border-2 border-white rounded-full mb-1 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="text-xs font-bold">LUMINA</div>
                </div>
              </div>
            );
          } else if (item.type === 'dashboard') {
            return (
              <div
                key={index}
                className={`absolute w-36 h-28 rounded-lg ${item.color} shadow-lg p-2`}
                style={{
                  left: index === 0 ? '5%' : '45%',
                  top: index === 0 ? '15%' : '35%'
                }}
              >
                <div className={`w-full h-full rounded ${item.color === 'bg-white' ? 'bg-gray-100' : 'bg-gray-800'} p-2`}>
                  <div className={`w-8 h-2 rounded mb-1 ${item.color === 'bg-white' ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                  <div className={`w-12 h-2 rounded mb-2 ${item.color === 'bg-white' ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                  <div className={`w-full h-12 rounded ${item.color === 'bg-white' ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                </div>
              </div>
            );
          } else if (item.type === 'web') {
            return (
              <div
                key={index}
                className="absolute inset-0 bg-white rounded-lg overflow-hidden"
              >
                <div className="w-full h-full relative">
                  <div className="absolute top-4 left-4 right-4 h-32 bg-gradient-to-r from-[#72e3ad] to-blue-500 rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 right-4 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-xs">THE CREDIT ATTORNEY</span>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group cursor-pointer border-b border-gray-300 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.12)] bg-white rounded-lg p-3 md:p-4"
        >
          {/* Project Preview */}
          <div className="relative mb-3 md:mb-4 transform transition-transform group-hover:scale-105">
            {renderPreview(project.preview, project.title)}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="bg-white rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform">
                <Eye className="w-4 h-4 text-gray-700" />
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Avatar */}
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
              
              <div>
                <h3 className="font-medium text-gray-900 text-xs md:text-sm">{project.title}</h3>
                <div className="flex items-center space-x-2 mt-0.5 md:mt-1">
                  <span className="text-gray-500 text-[10px] md:text-xs truncate max-w-[100px] sm:max-w-[150px]">
                    {project.author}
                  </span>
                  <span className={`px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs rounded-full font-medium ${
                    project.badge === 'PRO' 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'bg-gray-100 text-black'
                  }`}>
                    {project.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-2 md:space-x-3 text-[10px] md:text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{project.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{formatViews(project.views)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;