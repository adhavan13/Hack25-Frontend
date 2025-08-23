import React from "react";
import { TrendingUp, BarChart3, CheckCircle, Timer, Users } from "lucide-react";

const Analytics = ({ categories }) => (
  <div className="flex-1 overflow-y-auto p-6">
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Query Analytics
        </h2>
        <p className="text-gray-500">
          Performance metrics and usage statistics
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" style={{ color: "#72e3ad" }} />
            Resolution Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Average Response Time
              </span>
              <span style={{ color: "#72e3ad" }} className="font-medium">
                &lt; 2 minutes
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Success Rate
              </span>
              <span style={{ color: "#72e3ad" }} className="font-medium">
                96.8%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Database Accuracy
              </span>
              <span style={{ color: "#72e3ad" }} className="font-medium">
                99.2%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Time Saved vs Traditional RTI
              </span>
              <span className="font-medium text-blue-600">
                29.8 days avg
              </span>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Popular Query Categories
          </h3>
          <div className="space-y-3">
            {categories.slice(0, 4).map((category, i) => (
              <div
                key={i}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <category.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(category.queries / 1500) * 100}%`,
                        backgroundColor: "#72e3ad",
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {category.queries}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="border border-gray-200 rounded-xl p-6 text-center"
          style={{ backgroundColor: "#72e3ad", color: "black" }}
        >
          <CheckCircle className="w-8 h-8 mx-auto mb-3" style={{ color: "black" }} />
          <div className="text-2xl font-bold mb-1">
            44,152
          </div>
          <div className="text-sm">
            Queries Resolved
          </div>
          <div className="text-xs mt-2">
            vs 1,520 traditional RTI filed
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 text-center">
          <Timer className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-blue-800 mb-1">
            1.8M
          </div>
          <div className="text-sm text-blue-700">Hours Saved</div>
          <div className="text-xs text-blue-600 mt-2">
            Compared to traditional process
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 text-center">
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-purple-800 mb-1">
            8,234
          </div>
          <div className="text-sm text-purple-700">Active Users</div>
          <div className="text-xs text-purple-600 mt-2">
            Monthly unique users
          </div>
        </div>
      </div>
      <div className="mt-8 border border-gray-200 rounded-xl p-8 text-center"
        style={{ background: "linear-gradient(to right, #f0f9f4, #f0f9ff)" }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Impact Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold mb-1" style={{ color: "#72e3ad" }}>
              96.8%
            </div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              2 min
            </div>
            <div className="text-sm text-gray-600">Avg Response</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 mb-1">
              30 days
            </div>
            <div className="text-sm text-gray-600">Time Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1" style={{ color: "#72e3ad" }}>
              ₹0
            </div>
            <div className="text-sm text-gray-600">Cost to Users</div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-6 max-w-2xl mx-auto">
          RTI AutoBot has revolutionized government transparency by
          providing instant access to information that previously
          required lengthy formal processes. Citizens save time,
          money, and effort while getting accurate, up-to-date
          information.
        </p>
      </div>
    </div>
  </div>
);

export default Analytics;
