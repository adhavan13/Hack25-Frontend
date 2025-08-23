import React from "react";

const QuickStats = ({ stats }) => (
  <div className="grid grid-cols-4 gap-4 mt-6">
    {stats.map((stat, i) => (
      <div
        key={i}
        className={`border border-gray-200 rounded-lg p-4 text-center ${
          stat.accent ? "bg-gray-100" : "bg-gray-50"
        }`}
        style={
          stat.accent
            ? { backgroundColor: "#72e3ad", color: "black" }
            : {}
        }
      >
        <stat.icon
          className={`w-5 h-5 mx-auto mb-2`}
          style={
            stat.accent
              ? { color: "black" }
              : stat.color
              ? { color: stat.color.replace("text-", "") }
              : {}
          }
        />
        <div
          className="text-lg font-semibold"
          style={stat.accent ? { color: "black" } : {}}
        >
          {stat.value}
        </div>
        <div
          className="text-xs"
          style={stat.accent ? { color: "black" } : {}}
        >
          {stat.label}
        </div>
      </div>
    ))}
  </div>
);

export default QuickStats;
