import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Mic, Square, X } from "lucide-react";

const ChatBot = ({
  onCategoryFilter,
  onLocationFilter,
  onSearchFilter,
  currentFilters = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

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

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Speech synthesis (text-to-speech)
  const speak = async (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop any ongoing speech before starting new
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech synthesis
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Speech recognition (voice-to-text)
  const initRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return null;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      handleVoiceInput(voiceText);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    return recognition;
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initRecognition();
    }
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Handle voice input as user message
  const handleVoiceInput = (voiceText) => {
    setInput(voiceText);
    setTimeout(() => handleSubmit(voiceText), 100);
  };

  // Modified handleSubmit to optionally accept inputText
  const handleSubmit = async (inputText) => {
    const textToSend = typeof inputText === "string" ? inputText : input;
    if (textToSend.trim() === "") return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: textToSend.trim(),
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Call backend API for response
    try {
      const res = await fetch(
        "https://hack25-backend-x7el.vercel.app/api/chatbot/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: textToSend.trim() }),
        }
      );
      const data = await res.json();
      const botResponse =
        data?.response ||
        "🤔 Sorry, I couldn't get a response. Please try again.";
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
      // Speak bot response
      speak(botResponse);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠️ There was an error connecting to the chatbot service.",
          isBot: true,
        },
      ]);
    }
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Add a simple Markdown-to-HTML converter for bold, lists, and line breaks
  function formatBotMessage(text) {
    // Bold: **text** or *text*
    let html = text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "<b>$1</b>");
    // Lists: lines starting with *
    html = html.replace(/(^|\n)\* (.*?)(?=\n|$)/g, "$1<li>$2</li>");
    // Wrap <li> in <ul> if any <li> present
    if (html.includes("<li>")) {
      html = html.replace(/((<li>.*<\/li>\s*)+)/g, "<ul>$1</ul>");
    }
    // Line breaks
    html = html.replace(/\n\n/g, "<br/><br/>").replace(/\n/g, "<br/>");
    return html;
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 font-sans">
      {/* Floating Chat Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-[#72e3ad] hover:bg-[#5dd39d] active:bg-[#4cc489] text-black rounded-full p-5 sm:p-4 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
          style={{
            zIndex: 60,
            minWidth: "56px",
            minHeight: "56px",
          }}
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div
          className={`
            fixed bottom-0 left-1/2 -translate-x-1/2 sm:bottom-8 sm:right-8 sm:left-auto sm:translate-x-0
            w-[90vw] max-w-[90vw] sm:w-80 sm:max-w-xs
            bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#e0f5ea]
            flex flex-col overflow-hidden
            transition-all duration-500 ease-out transform-gpu
            opacity-100 translate-y-0 scale-100 pointer-events-auto
          `}
          style={{
            minHeight: "28rem",
            maxHeight: "90vh",
            height: "auto",
            boxSizing: "border-box",
            pointerEvents: "auto",
          }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#72e3ad] to-[#5dd39d] text-black px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center z-10 border-b border-[#e0f5ea]">
            <div>
              <h3 className="font-semibold text-lg">Chat Support</h3>
              <p className="text-sm opacity-80">We're here to help</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black hover:text-gray-700 p-1 rounded-full hover:bg-black/10 transition-all duration-200"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-2 py-4 sm:px-4 sm:py-6 overflow-y-auto max-h-[60vh] sm:max-h-[20rem] space-y-4 bg-gray-50/30 border-b border-[#e0f5ea]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                } animate-in slide-in-from-bottom-2 duration-300`}
              >
                {message.isBot ? (
                  <div
                    className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                             bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
                    style={{ borderRadius: "1.2rem 1.2rem 0.5rem 1.2rem" }}
                    dangerouslySetInnerHTML={{
                      __html: formatBotMessage(message.text),
                    }}
                  />
                ) : (
                  <div
                    className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                             bg-[#72e3ad] text-black shadow-sm rounded-br-md"
                    style={{ borderRadius: "1.2rem 1.2rem 1.2rem 0.5rem" }}
                  >
                    {message.text}
                  </div>
                )}
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
            {/* Stop speaking button */}
            {isSpeaking && (
              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  onClick={stopSpeaking}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-100 text-red-600 text-xs font-semibold hover:bg-red-200 hover:text-red-700 transition-all duration-200 shadow"
                  aria-label="Stop voice reading"
                  title="Stop voice reading"
                >
                  <Square size={16} /> Stop Voice
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[#e0f5ea] p-2 sm:p-4 bg-white">
            <div className="flex items-end space-x-2 sm:space-x-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`
                  w-full border border-gray-200 rounded-full px-4 py-3 pr-20 sm:pr-24
                  focus:outline-none focus:ring-2 focus:ring-[#72e3ad]/50 focus:border-[#72e3ad]
                  transition-all duration-200 text-sm
                  resize-none placeholder-gray-400
                  ${isListening ? "bg-[#eafaf3]" : ""}
                `}
                  disabled={isTyping}
                  style={{
                    fontSize: "1rem",
                    minHeight: "44px",
                  }}
                />
                {/* Voice Controls */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1 sm:space-x-2">
                  <button
                    type="button"
                    onClick={startListening}
                    className={`
                    p-2 rounded-full border-2 shadow-sm
                    ${
                      isListening
                        ? "bg-[#72e3ad]/70 text-black border-[#72e3ad]"
                        : "bg-gray-100 text-gray-400 border-gray-200"
                    }
                    hover:bg-[#72e3ad]/30 hover:text-[#72e3ad]
                    transition-all duration-200
                  `}
                    disabled={isTyping || isListening}
                    aria-label="Start voice input"
                    title="Speak your message"
                  >
                    <Mic
                      size={20}
                      className={isListening ? "animate-pulse" : ""}
                    />
                  </button>
                  {isListening && (
                    <button
                      type="button"
                      onClick={stopListening}
                      className="p-2 rounded-full border-2 shadow-sm
                               bg-red-100 text-red-600 border-red-300
                               hover:bg-red-200 hover:text-red-700
                               transition-all duration-200"
                      aria-label="Stop voice input"
                      title="Stop listening"
                    >
                      <Square size={18} />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleSubmit()}
                className={`
                p-4 sm:p-3 rounded-full transition-all duration-200 flex-shrink-0
                ${
                  input.trim() && !isTyping
                    ? "bg-[#72e3ad] hover:bg-[#5dd39d] active:bg-[#4cc489] text-black shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
                style={{
                  minWidth: "44px",
                  minHeight: "44px",
                }}
                disabled={!input.trim() || isTyping}
              >
                <Send size={20} />
              </button>
            </div>
            {/* Listening indicator */}
            {isListening && (
              <div className="mt-2 text-xs text-[#72e3ad] flex items-center gap-2 animate-in fade-in duration-300">
                <Mic size={14} className="animate-pulse" /> Listening...
                <button
                  type="button"
                  onClick={stopListening}
                  className="ml-2 px-3 py-1 rounded-lg bg-red-100 text-red-600 text-xs font-semibold hover:bg-red-200 hover:text-red-700 transition-all duration-200 flex items-center gap-1 shadow"
                  aria-label="Stop voice input"
                  title="Stop listening"
                >
                  <Square size={14} /> Stop
                </button>
              </div>
            )}
          </div>
          {/* End Input */}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
