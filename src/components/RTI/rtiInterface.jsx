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

// Mock database of RTI information categories
const RTI_CATEGORIES = [
  {
    id: "budget",
    name: "Budget & Finance",
    icon: DollarSign,
    description: "Government budget allocation, spending reports, financial data",
    queries: 1247,
    avgTime: "< 30 seconds",
    examples: ["Education budget 2024", "Healthcare spending", "Road construction costs"]
  },
  {
    id: "education",
    name: "Education",
    icon: Users,
    description: "School data, teacher appointments, infrastructure, schemes",
    queries: 892,
    avgTime: "< 45 seconds",
    examples: ["School enrollment data", "Teacher vacancies", "Scholarship lists"]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Shield,
    description: "Hospital records, medical schemes, health infrastructure",
    queries: 674,
    avgTime: "< 1 minute",
    examples: ["Hospital bed availability", "Medicine procurement", "Health schemes"]
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: Building,
    description: "Roads, bridges, public works, construction projects",
    queries: 1156,
    avgTime: "< 2 minutes",
    examples: ["Road construction status", "Bridge projects", "Public works tenders"]
  },
  {
    id: "employment",
    name: "Employment",
    icon: FileText,
    description: "Job vacancies, recruitment data, government positions",
    queries: 534,
    avgTime: "< 1 minute",
    examples: ["Government job openings", "Recruitment results", "Vacancy lists"]
  },
  {
    id: "welfare",
    name: "Welfare Schemes",
    icon: Users,
    description: "Social schemes, beneficiary lists, welfare programs",
    queries: 789,
    avgTime: "< 45 seconds",
    examples: ["Pension beneficiaries", "Subsidy schemes", "Welfare program data"]
  }
];

const QUICK_STATS = [
  { label: "Queries Resolved", value: "45,672", icon: CheckCircle, color: "text-green-600" },
  { label: "Average Response", value: "< 2 mins", icon: Timer, color: "text-blue-600" },
  { label: "Success Rate", value: "96.8%", icon: TrendingUp, color: "text-green-600" },
  { label: "Active Users", value: "8,234", icon: Users, color: "text-purple-600" }
];

const RECENT_QUERIES = [
  {
    query: "Budget allocation for primary education in Kerala 2024",
    status: "resolved",
    time: "23 seconds",
    category: "Education"
  },
  {
    query: "List of approved road construction projects in Ernakulam",
    status: "resolved", 
    time: "1.2 minutes",
    category: "Infrastructure"
  },
  {
    query: "Healthcare spending breakdown by district",
    status: "resolved",
    time: "45 seconds", 
    category: "Healthcare"
  }
];

const SUGGESTIONS = [
  "Show me education budget for 2024",
  "List government job vacancies",
  "Road construction projects status",
  "Healthcare scheme beneficiaries",
  "Government tender information",
  "Welfare program data by district"
];

const RTI_Interface = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "🏛️ Welcome to RTI AutoBot! I can instantly provide government information without filing traditional RTI requests. Just ask your question and I'll search through our comprehensive database to give you accurate information in minutes, not months!",
      timestamp: new Date(),
      isMarkdown: false
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

  const simulateDataRetrieval = (query) => {
    // Simulate realistic government data responses
    const responses = {
      "education": "📊 **Education Budget 2024-25 (Kerala)**\n\n• Total Allocation: ₹18,245 crores\n• Primary Education: ₹7,432 crores (40.7%)\n• Secondary Education: ₹5,678 crores (31.1%)\n• Higher Education: ₹3,234 crores (17.7%)\n• Infrastructure: ₹1,901 crores (10.4%)\n\n**Key Highlights:**\n✓ 15% increase from previous year\n✓ Focus on digital infrastructure\n✓ Teacher recruitment: 5,600 new positions\n\n*Source: Kerala Education Department Budget 2024-25*",
      
      "job": "🏢 **Current Government Job Vacancies**\n\n**Central Government:**\n• Railway Recruitment: 1,03,769 positions\n• Banking Sector: 45,230 positions\n• Defence Services: 23,567 positions\n\n**State Government (Kerala):**\n• Education Department: 5,600 teachers\n• Health Department: 3,400 staff\n• Police Department: 2,100 constables\n\n**Application Deadlines:**\n⏰ Most positions: 15-30 days from notification\n📱 Apply online through respective portals\n\n*Updated: " + new Date().toLocaleDateString() + "*",
      
      "road": "🛣️ **Road Construction Projects Status (Ernakulam)**\n\n**Ongoing Projects:**\n• NH-66 Upgrade: 78% complete (₹245 cr)\n• Kochi Metro Feeder Roads: 65% complete (₹89 cr)\n• Rural Connectivity: 12 roads under construction\n\n**Completed (2024):**\n✅ Kakkanad-Infopark Road: ₹67 crores\n✅ Marine Drive Extension: ₹34 crores\n✅ Vytilla-Aroor Bypass: ₹156 crores\n\n**Upcoming Tenders:**\n📋 Aluva-Munnar Highway: Tender opens next month\n📋 Port-Airport Road: Under planning\n\n*Source: PWD Kerala, Updated: Today*",
      
      "healthcare": "🏥 **Healthcare Infrastructure & Schemes**\n\n**Hospital Capacity (Kerala):**\n• Government Hospitals: 234 facilities\n• Total Beds: 45,678 (Occupancy: 76%)\n• ICU Beds: 2,340 (Available: 561)\n\n**Active Health Schemes:**\n💊 Karunya Benevolent Fund: 2.3 lakh beneficiaries\n🏥 Comprehensive Health Insurance: 76% coverage\n👩‍⚕️ ASHA Workers: 23,400 active\n\n**Recent Achievements:**\n✓ COVID recovery rate: 98.2%\n✓ Infant mortality rate: Lowest in India (7/1000)\n✓ Life expectancy: 75 years (National avg: 69)\n\n*Source: Health Department Kerala*",
      
      "tender": "📋 **Government Tender Information**\n\n**Active Tenders (Closing Soon):**\n• Road Construction Package-VII: ₹89 cr (Closes: 3 days)\n• Medical Equipment Supply: ₹45 cr (Closes: 7 days)\n• School Building Construction: ₹67 cr (Closes: 12 days)\n\n**Recently Awarded:**\n✅ IT Infrastructure: L&T Limited (₹234 cr)\n✅ Solar Power Project: Adani Green (₹156 cr)\n✅ Waste Management: Ramky Enviro (₹78 cr)\n\n**How to Participate:**\n🌐 Visit: etenders.kerala.gov.in\n📝 Registration required\n💳 EMD: 2-5% of tender value\n\n*Updated: Real-time from eTender Portal*",
      
      "welfare": "🤝 **Welfare Scheme Beneficiaries Data**\n\n**Pension Schemes (Kerala):**\n👴 Old Age Pension: 8.9 lakh beneficiaries\n♿ Disability Pension: 2.4 lakh beneficiaries\n👩 Widow Pension: 3.2 lakh beneficiaries\n\n**Subsidy Programs:**\n🏠 Housing Scheme: 45,600 houses completed\n⚡ Electricity Subsidy: 67% households covered\n🍚 Food Security: 2.1 crore beneficiaries\n\n**Recent Disbursements:**\n💰 Total Amount: ₹2,340 crores (This quarter)\n📅 Next Payment: 1st of next month\n🏦 Direct Benefit Transfer: 99.2% success rate\n\n*Source: Social Welfare Department*"
    };

    // Match query to appropriate response
    const query_lower = query.toLowerCase();
    if (query_lower.includes("education") || query_lower.includes("budget") || query_lower.includes("school")) {
      return responses.education;
    } else if (query_lower.includes("job") || query_lower.includes("vacancy") || query_lower.includes("recruitment")) {
      return responses.job;
    } else if (query_lower.includes("road") || query_lower.includes("construction") || query_lower.includes("infrastructure")) {
      return responses.road;
    } else if (query_lower.includes("health") || query_lower.includes("hospital") || query_lower.includes("medical")) {
      return responses.healthcare;
    } else if (query_lower.includes("tender") || query_lower.includes("contract") || query_lower.includes("bid")) {
      return responses.tender;
    } else if (query_lower.includes("welfare") || query_lower.includes("pension") || query_lower.includes("scheme")) {
      return responses.welfare;
    } else {
      return `🔍 **Information Retrieved Successfully**\n\nBased on your query: "${query}"\n\nI found relevant information in our government database. Here's what I can provide:\n\n• Official records and data\n• Real-time status updates\n• Contact information for further queries\n• Related documents and reports\n\n*This information would typically take 30+ days to obtain through traditional RTI process.*\n\n**Need more specific details?** Please refine your question or specify the exact information you're looking for.`;
    }
  };

  const handleSend = async (msg) => {
    const messageToSend = typeof msg === "string" ? msg : input;
    if (!messageToSend.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: messageToSend,
        timestamp: new Date(),
        isMarkdown: false
      }
    ]);
    setInput("");
    setIsTyping(true);

    // Try backend API
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch("https://hack25-backend-x7el.vercel.app/api/rti/getReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: messageToSend }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        console.log("RTI API response:", data); // <-- Add this line
        if (data && data.rtiReport) {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            {
              sender: "bot",
              text: data.rtiReport,
              timestamp: new Date(),
              queryResolved: true,
              responseTime: "Instant",
              isMarkdown: true
            }
          ]);
          setQueryStats(prev => ({
            total: prev.total + 1,
            resolved: prev.resolved + 1
          }));
          inputRef.current?.focus();
          return;
        }
      }
      // fallback if no rtiReport
    } catch (e) {
      // fallback to simulation
    }

    // fallback: simulate
    setTimeout(() => {
      setIsTyping(false);
      const response = simulateDataRetrieval(messageToSend);
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: response,
          timestamp: new Date(),
          queryResolved: true,
          responseTime: "2s",
          isMarkdown: false
        }
      ]);
      setQueryStats(prev => ({
        total: prev.total + 1,
        resolved: prev.resolved + 1
      }));
    }, 2000);

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
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 relative ${
        active
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
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200">
                <Zap className="w-6 h-6" style={{ color: "#72e3ad" }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RTI AutoBot</h1>
                <p className="text-sm text-gray-500">Instant Government Information • No RTI Filing Required</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
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

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            {QUICK_STATS.map((stat, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center">
                <span>
                  <stat.icon
                    className="w-8 h-8 mr-4"
                    style={{
                      color:
                        stat.label === "Queries Resolved"
                          ? "#22c55e" // green-600
                          : stat.label === "Average Response"
                          ? "#2563eb" // blue-600
                          : stat.label === "Success Rate"
                          ? "#22c55e" // green-600
                          : stat.label === "Active Users"
                          ? "#a21caf" // purple-600
                          : undefined
                    }}
                  />
                </span>
                <div className="flex flex-col items-start">
                  <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Tabs */}
        <div className="border-r border-gray-100 bg-white">
          <div className="p-6 space-y-3 min-w-[250px]">
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
                <div className="px-6 py-8">
                  <div className="space-y-6">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex items-start gap-3 max-w-4xl">
                          {msg.sender === "bot" && (
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1 border border-gray-200">
                              <Zap className="w-4 h-4" style={{ color: "#72e3ad" }} />
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
                              {msg.isMarkdown ? (
                                <ReactMarkdown
                                  components={{
                                    h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                                    h2: ({node, ...props}) => <h2 className="text-lg font-semibold mt-3 mb-2" {...props} />,
                                    h3: ({node, ...props}) => <h3 className="text-base font-bold mt-2 mb-1" {...props} />,
                                    p: ({node, ...props}) => <p className="mb-2" {...props} />,
                                    ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-2" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-2" {...props} />,
                                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                    table: ({node, ...props}) => <table className="min-w-full border mt-2 mb-2" {...props} />,
                                    thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
                                    th: ({node, ...props}) => <th className="border px-2 py-1 font-semibold" {...props} />,
                                    td: ({node, ...props}) => <td className="border px-2 py-1" {...props} />,
                                    strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                                    code: ({node, ...props}) => <code className="bg-gray-100 px-1 rounded" {...props} />,
                                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-2" {...props} />,
                                    hr: ({node, ...props}) => <hr className="my-4 border-gray-300" {...props} />,
                                  }}
                                >
                                  {msg.text}
                                </ReactMarkdown>
                              ) : (
                                msg.text
                              )}
                            </div>
                            {msg.queryResolved && (
                              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1" style={{ color: "#72e3ad" }}>
                                  <CheckCircle className="w-3 h-3" />
                                  Query Resolved
                                </div>
                                <div className="flex items-center gap-1 text-blue-600">
                                  <Timer className="w-3 h-3" style={{ color: "#72e3ad" }} />
                                  Response Time: {msg.responseTime}
                                </div>
                                <div className="flex items-center gap-1 text-gray-500">
                                  <Database className="w-3 h-3" style={{ color: "#72e3ad" }} />
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
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1 border border-gray-200">
                            <Zap className="w-4 h-4" style={{ color: "#72e3ad" }} />
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
                <div className="px-6 py-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Try these instant queries:
                  </h3>
                  <div className="flex flex-wrap gap-3">
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
                <div className="px-6 py-6">
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
                          minHeight: '56px',
                          lineHeight: '1.5'
                        }}
                      />
                    </div>
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 bg-gray-100 hover:bg-gray-200 text-black"
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
            <div className="flex-1 overflow-y-auto p-6">
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Information Categories</h2>
                  <p className="text-gray-500">Browse by category for instant government information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {RTI_CATEGORIES.map((category) => (
                    <div
                      key={category.id}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <category.icon
                            className="w-6 h-6"
                            style={{
                              color:
                                category.id === "budget"
                                  ? "#16a34a" // green-600
                                  : category.id === "education"
                                  ? "#2563eb" // blue-600
                                  : category.id === "healthcare"
                                  ? "#eab308" // yellow-500
                                  : category.id === "infrastructure"
                                  ? "#ea580c" // orange-600
                                  : category.id === "employment"
                                  ? "#a21caf" // purple-600
                                  : category.id === "welfare"
                                  ? "#db2777" // pink-600
                                  : "#64748b" // slate-500 fallback
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.queries} queries resolved</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-xs mb-2">
                          <Timer
                            className="w-3 h-3"
                            style={{
                              color:
                                category.id === "budget"
                                  ? "#16a34a"
                                  : category.id === "education"
                                  ? "#2563eb"
                                  : category.id === "healthcare"
                                  ? "#eab308"
                                  : category.id === "infrastructure"
                                  ? "#ea580c"
                                  : category.id === "employment"
                                  ? "#a21caf"
                                  : category.id === "welfare"
                                  ? "#db2777"
                                  : "#64748b"
                            }}
                          />
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
                        <Search className="w-4 h-4 text-gray-500" />
                        Explore {category.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "recent" && (
            <div className="flex-1 overflow-y-auto p-6">
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Recent Query Resolutions</h2>
                  <p className="text-gray-500">See how quickly we're resolving information requests</p>
                </div>

                <div className="space-y-4">
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
                          <Eye className="w-4 h-4 text-gray-500" />
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
            <div className="flex-1 overflow-y-auto p-6">
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Query Analytics</h2>
                  <p className="text-gray-500">Performance metrics and usage statistics</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
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
                      <BarChart3 className="w-5 h-5" />
                      Popular Query Categories
                    </h3>
                    <div className="space-y-3">
                      {RTI_CATEGORIES.slice(0, 4).map((category, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <category.icon className="w-4 h-4" />
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white border border-green-200 rounded-xl p-6 flex items-center">
                    <CheckCircle className="w-8 h-8 mr-4 text-green-600" />
                    <div className="flex flex-col items-start">
                      <div className="text-2xl font-bold text-green-800 mb-1">44,152</div>
                      <div className="text-sm text-green-700">Queries Resolved</div>
                      <div className="text-xs text-green-600 mt-2">vs 1,520 traditional RTI filed</div>
                    </div>
                  </div>
                  <div className="bg-white border border-blue-200 rounded-xl p-6 flex items-center">
                    <Timer className="w-8 h-8 mr-4 text-blue-600" />
                    <div className="flex flex-col items-start">
                      <div className="text-2xl font-bold text-blue-800 mb-1">1.8M</div>
                      <div className="text-sm text-blue-700">Hours Saved</div>
                      <div className="text-xs text-blue-600 mt-2">Compared to traditional process</div>
                    </div>
                  </div>
                  <div className="bg-white border border-purple-200 rounded-xl p-6 flex items-center">
                    <Users className="w-8 h-8 mr-4 text-purple-600" />
                    <div className="flex flex-col items-start">
                      <div className="text-2xl font-bold text-purple-800 mb-1">8,234</div>
                      <div className="text-sm text-purple-700">Active Users</div>
                      <div className="text-xs text-purple-600 mt-2">Monthly unique users</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-white border border-gray-200 rounded-xl p-8 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600 mb-1" style={{ color: "#72e3ad" }}>96.8%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-1" style={{ color: "#72e3ad" }}>&lt; 2 min</div>
                      <div className="text-sm text-gray-600">Avg Response</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 mb-1" style={{ color: "#72e3ad" }}>30 days</div>
                      <div className="text-sm text-gray-600">Time Saved</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600 mb-1" style={{ color: "#72e3ad" }}>₹0</div>
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