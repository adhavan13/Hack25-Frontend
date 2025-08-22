import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage = { id: Date.now(), text: input.trim(), isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "Thanks for your message! This is a demo chatbot. In a real application, this would connect to an API for responses.",
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`
          bg-[#72e3ad] hover:bg-[#5dd39d] active:bg-[#4cc489] 
          text-black rounded-full p-4 shadow-lg hover:shadow-xl 
          transition-all duration-300 ease-out
          flex items-center justify-center
          transform hover:scale-105 active:scale-95
          ${isOpen ? "rotate-0" : "rotate-0 hover:rotate-12"}
        `}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </div>
      </button>

      {/* Chat Interface */}
      <div
        className={`
        absolute bottom-20 right-0 w-80 sm:w-96 
        bg-white rounded-2xl shadow-2xl border border-gray-100
        flex flex-col overflow-hidden
        transition-all duration-500 ease-out transform-gpu
        ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }
      `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#72e3ad] to-[#5dd39d] text-black px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">Chat Support</h3>
            <p className="text-sm opacity-80">We're here to help</p>
          </div>
          <button
            onClick={toggleChat}
            className="text-black hover:text-gray-700 p-1 rounded-full hover:bg-black/10 transition-all duration-200"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto max-h-80 space-y-4 bg-gray-50/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isBot ? "justify-start" : "justify-end"
              } animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`
                  max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                  ${
                    message.isBot
                      ? "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
                      : "bg-[#72e3ad] text-black shadow-sm rounded-br-md"
                  }
                `}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white text-gray-600 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 flex items-center space-x-1">
                <div className="flex space-x-1">
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
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 p-4 bg-white">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="
                  w-full border border-gray-200 rounded-full px-4 py-3 pr-12
                  focus:outline-none focus:ring-2 focus:ring-[#72e3ad]/50 focus:border-[#72e3ad]
                  transition-all duration-200 text-sm
                  resize-none placeholder-gray-400
                "
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleSubmit}
              className={`
                p-3 rounded-full transition-all duration-200 flex-shrink-0
                ${
                  input.trim() && !isTyping
                    ? "bg-[#72e3ad] hover:bg-[#5dd39d] active:bg-[#4cc489] text-black shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
              disabled={!input.trim() || isTyping}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
