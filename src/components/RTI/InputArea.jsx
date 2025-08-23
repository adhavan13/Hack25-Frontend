import React from "react";
import { Zap, Send } from "lucide-react";

const InputArea = ({
  input,
  setInput,
  handleSend,
  handleInputKeyDown,
  inputRef,
}) => (
  <div className="border-t border-gray-100 bg-white">
    <div className="max-w-4xl mx-auto px-6 py-6">
      <div className="flex items-end gap-4">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Ask any question about government information, data, or services..."
            className="w-full resize-none rounded-2xl border border-gray-200 px-5 py-4 pr-12 text-sm leading-relaxed bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none transition-colors duration-200 max-h-32"
            rows={1}
            style={{
              minHeight: "56px",
              lineHeight: "1.5",
            }}
          />
        </div>
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
          style={{
            backgroundColor: input.trim() ? "#72e3ad" : "#f3f4f6",
            color: "black",
          }}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-2">
        <Zap className="w-3 h-3" style={{ color: "#72e3ad" }} />
        Instant results from live government database • No RTI filing needed
      </p>
    </div>
  </div>
);

export default InputArea;
