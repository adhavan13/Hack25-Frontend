import React from "react";

const TabButton = ({ id, label, icon: Icon, active, badge, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 relative ${
      active
        ? "bg-gray-100 text-black border border-gray-200"
        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
    }`}
    style={active ? { backgroundColor: "#72e3ad", color: "black" } : {}}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
    {badge && (
      <span
        className="absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center border border-gray-200"
        style={{
          backgroundColor: "#f3f4f6", // Tailwind's bg-gray-100
          color: "black",
        }}
      >
        {badge}
      </span>
    )}
  </button>
);

export default TabButton;
