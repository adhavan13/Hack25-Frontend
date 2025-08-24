import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Search, 
  Zap,
  Database,
  FileText,
  Users,
  TrendingUp,
  AlertCircle,
  BarChart3,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  Shield,
  ArrowRight,
  Sparkles,
  Timer,
  Eye,
  Download,
  Star
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const SUGGESTIONS = [
  "Provide the latest government circulars on education policy.",
  "List all government tenders issued in Kerala in 2024.",
  "Show me the annual expenditure report for public health.",
  "Give details of sanctioned government jobs in the last year.",
  "Share the RTI response for road construction in Ernakulam."
];

const RECENT_QUERIES = [
  {
    query: "Latest government job notifications in Kerala",
    time: "1.2s",
    category: "Employment"
  },
  {
    query: "Budget allocation for road infrastructure 2024",
    time: "0.8s",
    category: "Infrastructure"
  },
  {
    query: "Education policy updates for higher secondary",
    time: "1.5s",
    category: "Education"
  },
  {
    query: "Healthcare scheme beneficiary statistics",
    time: "2.1s",
    category: "Healthcare"
  },
  {
    query: "Municipal corporation tender details",
    time: "1.7s",
    category: "Tenders"
  },
  {
    query: "Environmental clearance status reports",
    time: "1.3s",
    category: "Environment"
  }
];

const RTI_CATEGORIES = [
  {
    id: "employment",
    name: "Employment & Jobs",
    icon: Users,
    queries: 1250,
    avgTime: "1.2s",
    description: "Government job notifications, recruitment details, and employment schemes",
    examples: [
      "Latest job notifications",
      "Selection list status",
      "Employment scheme details"
    ]
  },
  {
    id: "tenders",
    name: "Tenders & Contracts",
    icon: FileText,
    queries: 980,
    avgTime: "1.5s",
    description: "Government tenders, contract awards, and procurement information",
    examples: [
      "Active tender notifications",
      "Contract award details",
      "Vendor registration info"
    ]
  },
  {
    id: "budget",
    name: "Budget & Finance",
    icon: DollarSign,
    queries: 856,
    avgTime: "1.8s",
    description: "Budget allocations, expenditure reports, and financial schemes",
    examples: [
      "Annual budget breakdown",
      "Scheme fund allocation",
      "Expenditure reports"
    ]
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: Building,
    queries: 742,
    avgTime: "1.3s",
    description: "Road projects, construction updates, and development plans",
    examples: [
      "Road construction status",
      "Infrastructure projects",
      "Development plans"
    ]
  },
  {
    id: "education",
    name: "Education",
    icon: FileText,
    queries: 698,
    avgTime: "1.1s",
    description: "Educational policies, schemes, and institutional information",
    examples: [
      "Admission notifications",
      "Scholarship details",
      "Policy updates"
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Shield,
    queries: 634,
    avgTime: "1.4s",
    description: "Health schemes, hospital information, and medical services",
    examples: [
      "Health scheme eligibility",
      "Hospital facilities",
      "Medical assistance programs"
    ]
  }
];

const RTI_Interface = () => {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "🏛️ Welcome to RTI AutoBot! Instantly access government information and RTI reports. Ask your question and I'll fetch the latest data for you.",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [queryStats, setQueryStats] = useState({ total: 45672, resolved: 44152 });
  const [activeTab, setActiveTab] = useState("chat");

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (activeTab === "chat") {
      inputRef.current?.focus();
    }
  }, [activeTab]);

  const fetchRTIReport = async (query) => {
    try {
      const res = await fetch("https://hack25-backend-x7el.vercel.app/api/rti/getReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      let reportText = '';
      if (data && data.rtiReport) {
        reportText = data.rtiReport;
      } else if (data && data.report) {
        reportText = data.report;
      } else if (data && data.message) {
        reportText = data.message;
      } else {
        reportText = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      }
      
      reportText = reportText
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\')
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\r/g, '\r')
        .replace(/\\#/g, '#')
        .replace(/\\\*/g, '*')
        .replace(/\\-/g, '-')
        .replace(/\\\|/g, '|')
        .replace(/\\`/g, '`')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/^(#{1,6})\s*/gm, '$1 ')
        .replace(/^\*\s+/gm, '* ')
        .replace(/^-\s+/gm, '- ')
        .replace(/^\+\s+/gm, '+ ')
        .replace(/\*\*([^*]+)\*\*/g, '**$1**')
        .replace(/\|\s*([^|]+)\s*\|/g, '| $1 |')
        .replace(/^-{3,}$/gm, '---')
        .replace(/[ \t]+$/gm, '')
        .trim();
      
      console.log("Processed markdown:", reportText.substring(0, 200) + "...");
      
      return reportText;
    } catch (err) {
      console.error("Fetch error:", err);
      return "❌ Failed to fetch RTI data. Please check your connection and try again.";
    }
  };

  const decodeEntities = (str) => {
    // Basic HTML entity decoding
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  };

  const handleSend = async (msg) => {
    const messageToSend = typeof msg === "string" ? msg : input;
    if (!messageToSend.trim()) return;

    setMessages(prev => [...prev, { 
      sender: "user", 
      text: messageToSend, 
      timestamp: new Date() 
    }]);
    setInput("");
    setIsTyping(true);

    const start = Date.now();
    let response = await fetchRTIReport(messageToSend);
    const responseTime = ((Date.now() - start) / 1000).toFixed(1) + "s";

    setIsTyping(false);

    // --- Clean and decode response ---
    response = decodeEntities(response)
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // --- PDF generation and download (multi-page support) ---
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4"
    });
    let y = 15;
    doc.setFontSize(14);
    doc.text("RTI AutoBot Response", 10, y);
    y += 10;
    doc.setFontSize(11);
    doc.text(`Query: ${messageToSend}`, 10, y);
    y += 10;
    doc.setFontSize(10);
    doc.text("Response:", 10, y);
    y += 7;

    // Split response into lines that fit the page width
    const pageHeight = doc.internal.pageSize.height || 297;
    const leftMargin = 10;
    const rightMargin = 10;
    const maxLineWidth = doc.internal.pageSize.width - leftMargin - rightMargin;
    const lines = doc.splitTextToSize(response, maxLineWidth);

    lines.forEach(line => {
      if (y > pageHeight - 15) {
        doc.addPage();
        y = 15;
      }
      doc.text(line, leftMargin, y);
      y += 6;
    });

    doc.save("RTI_Response.pdf");
    // --- End PDF generation ---

    setQueryStats(prev => ({
      total: prev.total + 1,
      resolved: prev.resolved + 1
    }));
    inputRef.current?.focus();
  };

  const handleSuggestion = (suggestion) => {
    handleSend(suggestion);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const TabButton = ({ id, label, icon: Icon, active, badge }) => (
    <button
      onClick={() => {
        setActiveTab(id);
      }}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 relative w-full text-left
        ${active
          ? "bg-gray-100 text-black border border-gray-200"
          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
      {badge && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-0">
          {/* Added px-2 for mobile */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">RTI AutoBot</h1>
                <p className="text-xs sm:text-sm text-gray-500">Instant Government Information • No RTI Filing Required</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600">Real-time database active</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{queryStats.total.toLocaleString()} queries resolved</span>
              </div>
            </div>
          </div>
          {/* Mobile stats */}
          <div className="sm:hidden mt-2 flex items-center gap-2 text-xs text-gray-600 px-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Real-time database active
            </div>
            <span className="text-gray-400">•</span>
            <span>{queryStats.total.toLocaleString()} queries resolved</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        {/* Desktop sidebar only */}
        <div className="border-r border-gray-100 bg-white hidden sm:block">
          <div className="p-6 space-y-3 min-w-[220px]">
            <TabButton id="chat" label="Ask Anything" icon={MessageCircle} active={activeTab === "chat"} />
            <TabButton id="categories" label="Browse Categories" icon={Database} active={activeTab === "categories"} />
            <TabButton id="recent" label="Recent Queries" icon={Clock} active={activeTab === "recent"} badge="24" />
            <TabButton id="analytics" label="Query Analytics" icon={BarChart3} active={activeTab === "analytics"} />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {activeTab === "chat" && (
            <>
              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
                  <div className="space-y-6">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex items-start gap-3 max-w-4xl">
                          {msg.sender === "bot" && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div
                            className={`rounded-2xl px-6 py-4 ${
                              msg.sender === "user"
                                ? "bg-gray-100 text-black ml-12"
                                : "bg-gray-100 text-black"
                            } shadow-sm`}
                          >
                            <div className={`text-sm leading-relaxed ${msg.sender === "bot" ? "prose prose-sm max-w-none overflow-hidden" : ""}`}>
                              {msg.sender === "bot" ? (
                                <ReactMarkdown
                                  components={{
                                    a: ({node, ...props}) => <a {...props} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" />,
                                    code: ({node, inline, ...props}) => 
                                      inline ? (
                                        <code {...props} className="bg-gray-200 px-1 rounded text-xs break-words" />
                                      ) : (
                                        <code {...props} className="block bg-gray-200 px-1 rounded text-xs break-words whitespace-pre-wrap" />
                                      ),
                                    pre: ({node, ...props}) => (
                                      <pre {...props} className="bg-gray-100 p-3 rounded mb-3 overflow-x-auto max-w-full text-xs" style={{wordBreak: 'break-word', whiteSpace: 'pre-wrap'}} />
                                    ),
                                    ul: ({node, ...props}) => <ul {...props} className="list-disc ml-5 mb-3" />,
                                    ol: ({node, ...props}) => <ol {...props} className="list-decimal ml-5 mb-3" />,
                                    li: ({node, ...props}) => <li {...props} className="mb-1 break-words" />,
                                    blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-gray-300 pl-3 text-gray-600 italic mb-3 break-words" />,
                                    table: ({node, ...props}) => (
                                      <div className="overflow-x-auto mb-3">
                                        <table {...props} className="min-w-full border border-gray-300 text-xs" />
                                      </div>
                                    ),
                                    th: ({node, ...props}) => <th {...props} className="border border-gray-300 px-2 py-1 bg-gray-100 text-left break-words" />,
                                    td: ({node, ...props}) => <td {...props} className="border border-gray-300 px-2 py-1 break-words" />,
                                    h1: ({node, ...props}) => <h1 {...props} className="text-lg font-bold mb-3 mt-4 break-words" />,
                                    h2: ({node, ...props}) => <h2 {...props} className="text-base font-bold mb-2 mt-3 break-words" />,
                                    h3: ({node, ...props}) => <h3 {...props} className="text-sm font-bold mb-2 mt-3 break-words" />,
                                    h4: ({node, ...props}) => <h4 {...props} className="text-sm font-semibold mb-2 mt-2 break-words" />,
                                    h5: ({node, ...props}) => <h5 {...props} className="text-xs font-semibold mb-1 mt-2 break-words" />,
                                    h6: ({node, ...props}) => <h6 {...props} className="text-xs font-semibold mb-1 mt-2 break-words" />,
                                    p: ({node, ...props}) => <p {...props} className="mb-3 break-words leading-relaxed" />,
                                    strong: ({node, ...props}) => <strong {...props} className="font-semibold break-words" />,
                                    em: ({node, ...props}) => <em {...props} className="italic break-words" />,
                                  }}
                                >
                                  {msg.text}
                                </ReactMarkdown>
                              ) : (
                                <span className="whitespace-pre-line break-words">{msg.text}</span>
                              )}
                            </div>
                            {msg.queryResolved && (
                              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
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
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-gray-100 rounded-2xl px-6 py-4 shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Search className="w-4 h-4 animate-spin" />
                              Searching government database...
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={chatEndRef} />
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="border-t border-gray-100 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Try these instant queries:
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {SUGGESTIONS.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestion(suggestion)}
                        className="bg-gray-100 hover:bg-gray-200 text-black rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-sm border border-gray-200 flex items-center gap-2"
                      >
                        {suggestion}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-100 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                  <div className="flex items-end gap-2 sm:gap-4">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Ask any question about government information, data, or services..."
                        className="w-full resize-none rounded-2xl border border-gray-200 px-4 sm:px-5 py-3 sm:py-4 pr-10 sm:pr-12 text-sm leading-relaxed bg-gray-50 focus:bg-white focus:border-gray-300 focus:outline-none transition-colors duration-200 max-h-32"
                        rows={1}
                        style={{
                          minHeight: '48px',
                          lineHeight: '1.5'
                        }}
                      />
                    </div>
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 bg-gray-100 hover:bg-gray-200 text-black"
                      style={{
                        backgroundColor: input.trim() ? '#72e3ad' : '',
                        color: input.trim() ? 'black' : ''
                      }}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "categories" && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* p-4 for mobile */}
              <div className="max-w-6xl mx-auto">
                <div className="mb-6 sm:mb-8 px-2 sm:px-0">
                  {/* px-2 for mobile */}
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Information Categories</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Browse by category for instant government information</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-2 sm:px-0">
                  {/* px-2 for mobile */}
                  {RTI_CATEGORIES.map((category) => (
                    <div
                      key={category.id}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <category.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.queries} queries resolved</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-xs text-green-600 mb-2">
                          <Timer className="w-3 h-3" />
                          Avg Response: {category.avgTime}
                        </div>
                        <div className="text-xs text-gray-500">Example queries:</div>
                        <ul className="text-xs text-gray-500 mt-1 space-y-1">
                          {category.examples.map((example, i) => (
                            <li key={i}>• {example}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <button
                        onClick={() => {
                          setActiveTab("chat");
                          setTimeout(() => {
                            handleSuggestion(`Show me information about ${category.name.toLowerCase()}`);
                          }, 100);
                        }}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-black py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        Explore {category.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "recent" && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* p-4 for mobile */}
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 sm:mb-8 px-2 sm:px-0">
                  {/* px-2 for mobile */}
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Recent Query Resolutions</h2>
                  <p className="text-xs sm:text-sm text-gray-500">See how quickly we're resolving information requests</p>
                </div>
                <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
                  {/* px-2 for mobile */}
                  {RECENT_QUERIES.map((query, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-2">{query.query}</h3>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              Resolved
                            </span>
                            <span className="flex items-center gap-1 text-blue-600">
                              <Timer className="w-4 h-4" />
                              {query.time}
                            </span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {query.category}
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => {
                            setActiveTab("chat");
                            setTimeout(() => {
                              handleSuggestion(query.query);
                            }, 100);
                          }}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-lg text-sm transition-colors flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* p-4 for mobile */}
              <div className="max-w-6xl mx-auto">
                <div className="mb-6 sm:mb-8 px-2 sm:px-0">
                  {/* px-2 for mobile */}
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Query Analytics</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Performance metrics and usage statistics</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8 px-2 sm:px-0">
                  {/* px-2 for mobile */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Resolution Performance
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Average Response Time</span>
                        <span className="font-medium text-green-600">&lt; 2 minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Success Rate</span>
                        <span className="font-medium text-green-600">96.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Database Accuracy</span>
                        <span className="font-medium text-green-600">99.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Time Saved vs Traditional RTI</span>
                        <span className="font-medium text-blue-600">29.8 days avg</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Popular Query Categories
                    </h3>
                    <div className="space-y-3">
                      {RTI_CATEGORIES.slice(0, 4).map((category, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <category.icon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{category.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{width: `${(category.queries / 1500) * 100}%`}}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{category.queries}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 px-2 sm:px-0">
                  {/* px-2 for mobile */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 sm:p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-800 mb-1">44,152</div>
                    <div className="text-sm text-green-700">Queries Resolved</div>
                    <div className="text-xs text-green-600 mt-2">vs 1,520 traditional RTI filed</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 sm:p-6 text-center">
                    <Timer className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-blue-800 mb-1">1.8M</div>
                    <div className="text-sm text-blue-700">Hours Saved</div>
                    <div className="text-xs text-blue-600 mt-2">Compared to traditional process</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 sm:p-6 text-center">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-purple-800 mb-1">8,234</div>
                    <div className="text-sm text-purple-700">Active Users</div>
                    <div className="text-xs text-purple-600 mt-2">Monthly unique users</div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-xl p-4 sm:p-8 text-center px-2 sm:px-8">
                  {/* px-2 for mobile */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600 mb-1">96.8%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">&lt; 2 min</div>
                      <div className="text-sm text-gray-600">Avg Response</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 mb-1">30 days</div>
                      <div className="text-sm text-gray-600">Time Saved</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600 mb-1">₹0</div>
                      <div className="text-sm text-gray-600">Cost to Users</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-6 max-w-2xl mx-auto">
                    RTI AutoBot has revolutionized government transparency by providing instant access to information that previously required lengthy formal processes. Citizens save time, money, and effort while getting accurate, up-to-date information.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RTI_Interface;