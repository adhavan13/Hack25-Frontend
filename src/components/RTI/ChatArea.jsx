import React from "react";
import { Zap, CheckCircle, Timer, Database, Search } from "lucide-react";

const ChatArea = ({ messages, isTyping, chatEndRef }) => (
  <div className="flex-1 overflow-y-auto">
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start gap-3 max-w-4xl">
              {msg.sender === "bot" && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: "#72e3ad" }}
                >
                  <Zap className="w-4 h-4 text-black" />
                </div>
              )}
              <div
                className={`rounded-2xl px-6 py-4 ${
                  msg.sender === "user"
                    ? "bg-gray-100 text-black ml-12"
                    : "bg-gray-100 text-black"
                } shadow-sm`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {msg.text}
                </div>
                {msg.queryResolved && (
                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs">
                    <div
                      className="flex items-center gap-1"
                      style={{
                        backgroundColor: "#f3f4f6",
                        color: "black",
                        borderRadius: "0.25rem",
                        padding: "0 0.5rem",
                      }}
                    >
                      <CheckCircle className="w-3 h-3" style={{ color: "black" }} />
                      Query Resolved
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Timer className="w-3 h-3" />
                      Response Time: {msg.responseTime}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Database className="w-3 h-3" />
                      Live Data
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-4xl">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{ backgroundColor: "#72e3ad" }}
              >
                <Zap className="w-4 h-4 text-black" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-6 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Search className="w-4 h-4 animate-spin" />
                  Searching government database...
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  </div>
);

export default ChatArea;
