import React, { useState } from "react";
import ProjectModal from "./Modal";

const sectorImages = {
  "Agriculture and Allied Services": [
    "/assets/sector1/image1.jpg",
    "/assets/sector1/image2.jpg",
    "/assets/sector1/image3.jpg",
    "/assets/sector1/image4.jpg",
    "/assets/sector1/image5.jpg",
    "/assets/sector1/image6.jpg",
  ],
  "Rural Development": [
    "/assets/sector2/image1.jpg",
    "/assets/sector2/image2.jpg",
    "/assets/sector2/image3.jpg",
    "/assets/sector2/image4.jpg",
    "/assets/sector2/image5.jpg",
    "/assets/sector2/image6.jpg",
  ],
  "Irrigation and Flood Control": [
    "/assets/sector3/image1.jpg",
    "/assets/sector3/image2.jpg",
    "/assets/sector3/image3.jpg",
    "/assets/sector3/image4.jpg",
    "/assets/sector3/image5.jpg",
    "/assets/sector3/image6.jpg",
  ],
};

const ProjectGrid = ({ projects }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Add the missing getStatusColor function
  const getStatusColor = (status) => {
    // Use the same green color for all statuses
    return "bg-[#72e3ad] text-black";
  };

  // Track image index for each sector
  const sectorImageIndices = {};

  // Helper to get the correct image for a project based on its sector and index
  const getProjectImage = (project) => {
    const sector = project.sector || project.scheme || "";
    if (sectorImages[sector]) {
      // Initialize index for this sector if not present
      if (!(sector in sectorImageIndices)) {
        sectorImageIndices[sector] = 0;
      }
      // Get image and increment index (cycle if needed)
      const images = sectorImages[sector];
      const idx = sectorImageIndices[sector] % images.length;
      const image = images[idx];
      sectorImageIndices[sector] += 1;
      return image;
    }

    // ...existing code for keyword-based fallback...
    const scheme = project.scheme
      ? project.scheme.toLowerCase()
      : project.sector
      ? project.sector.toLowerCase()
      : "";

    if (scheme.includes("agriculture") || scheme.includes("farm"))
      return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60";
    if (scheme.includes("education") || scheme.includes("school"))
      return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60";
    if (scheme.includes("health") || scheme.includes("medical"))
      return "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60";
    if (scheme.includes("water") || scheme.includes("sanitation"))
      return "https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60";
    if (scheme.includes("infrastructure") || scheme.includes("building"))
      return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60";

    return `https://source.unsplash.com/500x300/?${encodeURIComponent(
      project.scheme || "project"
    )}`;
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}m`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views;
  };

  const renderPreview = (preview, projectTitle) => {
    return (
      <div className="w-full h-48 bg-white rounded-lg overflow-hidden relative">
        {preview?.map((item, index) => {
          const updatedColor = item.color?.includes("green")
            ? "bg-gray-100 text-black"
            : item.color;

          if (item.type === "mobile") {
            return (
              <div
                key={index}
                className={`absolute w-16 h-32 rounded-lg ${updatedColor} border-2 border-white shadow-lg`}
                style={{
                  left: `${20 + index * 25}%`,
                  top: "20%",
                  transform: index === 1 ? "translateY(-10px)" : "none",
                }}
              >
                <div className="w-full h-2 bg-white/20 rounded-t-lg"></div>
              </div>
            );
          } else if (item.type === "card") {
            return (
              <div
                key={index}
                className={`absolute w-32 h-40 rounded-lg ${item.color} shadow-lg`}
                style={{
                  left: index === 0 ? "10%" : "50%",
                  top: "10%",
                  transform: index === 1 ? "translateY(20px)" : "none",
                }}
              >
                {projectTitle === "Lantern" && index === 0 && (
                  <div className="p-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white text-xs">🏮</span>
                    </div>
                    <div className="text-white text-sm font-bold">
                      Building the future of distribution
                    </div>
                  </div>
                )}
              </div>
            );
          } else if (item.type === "logo") {
            return (
              <div
                key={index}
                className={`absolute w-20 h-16 rounded-lg ${item.color} flex items-center justify-center shadow-lg`}
                style={{
                  left: index === 0 ? "20%" : "55%",
                  top: "35%",
                  transform: `rotate(${index === 0 ? -15 : 15}deg)`,
                }}
              >
                <span
                  className={`font-bold text-sm ${
                    item.textColor || "text-white"
                  }`}
                >
                  {item.text}
                </span>
              </div>
            );
          } else if (item.type === "brand") {
            return (
              <div
                key={index}
                className={`absolute w-24 h-20 rounded-lg ${item.color} shadow-lg flex items-center justify-center`}
                style={{
                  left: "15%",
                  top: "50%",
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
          } else if (item.type === "dashboard") {
            return (
              <div
                key={index}
                className={`absolute w-36 h-28 rounded-lg ${item.color} shadow-lg p-2`}
                style={{
                  left: index === 0 ? "5%" : "45%",
                  top: index === 0 ? "15%" : "35%",
                }}
              >
                <div
                  className={`w-full h-full rounded ${
                    item.color === "bg-white" ? "bg-gray-100" : "bg-gray-800"
                  } p-2`}
                >
                  <div
                    className={`w-8 h-2 rounded mb-1 ${
                      item.color === "bg-white" ? "bg-gray-300" : "bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`w-12 h-2 rounded mb-2 ${
                      item.color === "bg-white" ? "bg-gray-300" : "bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`w-full h-12 rounded ${
                      item.color === "bg-white" ? "bg-gray-200" : "bg-gray-700"
                    }`}
                  ></div>
                </div>
              </div>
            );
          } else if (item.type === "web") {
            return (
              <div
                key={index}
                className="absolute inset-0 bg-white rounded-lg overflow-hidden"
              >
                <div className="w-full h-full relative">
                  <div className="absolute top-4 left-4 right-4 h-32 bg-gradient-to-r from-[#72e3ad] to-blue-500 rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 right-4 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-xs">
                      THE CREDIT ATTORNEY
                    </span>
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-2">
        {projects.map((project) => {
          // Support both old and new API fields
          const id = project.id || project.project_id;
          const title = project.project_title || project.project_name;
          const scheme =
            project.scheme || project.scheme_name || project.sector;
          const status = project.status || "Ongoing";
          return (
            <div
              key={id}
              className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300 transition-all duration-200 transform hover:-translate-y-1"
              onClick={() => {
                setSelectedProject(project);
                setModalOpen(true);
              }}
            >
              {/* Project Image with Overlapping Title */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={getProjectImage(project)}
                  alt={`${scheme} illustration`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x300?text=Project+Image";
                  }}
                />
                {/* Overlapping title with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="w-full p-4">
                    <h2 className="text-2xl font-bold text-white text-left line-clamp-2 drop-shadow-md ">
                      {title}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white">
                {/* Scheme Name and Status on the same line */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800">{scheme}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      status
                    )} shadow-sm`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedProject && (
        <ProjectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          project={selectedProject}
        />
      )}
    </>
  );
};

export default ProjectGrid;
