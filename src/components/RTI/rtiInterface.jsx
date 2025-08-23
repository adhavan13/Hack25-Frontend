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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SUGGESTIONS = [
  "Provide the latest government circulars on education policy.",
  "List all government tenders issued in Kerala in 2024.",
  "Show me the annual expenditure report for public health.",
  "Post-Flood Spice Plantation Rehabilitation project in Wayanad district",
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
    id: "disaster-rehabilitation",
    name: "Disaster Rehabilitation",
    icon: Shield,
    queries: 423,
    avgTime: "1.6s",
    description: "Post-disaster rehabilitation projects, flood relief schemes, and recovery programs",
    examples: [
      "Wayanad flood rehabilitation",
      "Spice plantation recovery",
      "Disaster relief fund allocation"
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
  const [processedQueries, setProcessedQueries] = useState(new Set()); // Track processed queries
  
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

  // Common reasons for this issue:
  // 1. **CORS error**: Check your browser console for CORS errors. If present, your backend must allow requests from your frontend's origin.
  // 2. **Network error**: Open browser dev tools → Network tab, check if the request is sent and what response you get.
  // 3. **Incorrect API URL**: Make sure the URL in fetch matches exactly what works in Postman.
  // 4. **HTTPS/HTTP mismatch**: If your frontend is served over HTTPS, your backend must also be HTTPS.
  // 5. **Request body/headers**: Ensure Content-Type and body format in fetch matches what works in Postman.
  // 6. **Backend expects authentication**: If your backend expects headers (like auth tokens), add them in fetch.
  // 7. **Backend response format**: If backend doesn't return JSON, `await res.json()` will fail. Use `await res.text()` to debug.

  // To debug, add a console log for errors and the response:
  const fetchRTIReport = async (query) => {
    try {
      // Generate unique request ID to prevent caching
      const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const trimmedQuery = query.trim();
      
      // Check if this is a specific project query
      const isProjectQuery = trimmedQuery.toLowerCase().includes('wayanad') || 
                           trimmedQuery.toLowerCase().includes('spice plantation') ||
                           trimmedQuery.toLowerCase().includes('rehabilitation') ||
                           trimmedQuery.toLowerCase().includes('flood');
      
      // Log the specific query being processed
      console.log(`Processing ${isProjectQuery ? 'PROJECT-SPECIFIC' : 'GENERAL'} query [${requestId}]:`, trimmedQuery);
      
      // Validate that query is not empty and is unique
      if (!trimmedQuery || trimmedQuery.length < 3) {
        throw new Error("Query too short or empty");
      }
      
      // Create enhanced request payload for project queries
      const requestPayload = {
        query: trimmedQuery,
        requestId: requestId,
        timestamp: new Date().toISOString(),
        queryType: isProjectQuery ? 'project-specific' : 'general',
        district: isProjectQuery && trimmedQuery.toLowerCase().includes('wayanad') ? 'Wayanad' : null,
        projectCategory: isProjectQuery ? 'rehabilitation' : null,
        // Add cache busting parameter
        cacheBuster: Math.random()
      };
      
      console.log("Sending enhanced request payload:", requestPayload);
      
      const res = await fetch("https://hack25-backend-x7el.vercel.app/api/rti/getReport", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Request-ID": requestId,
          "X-Query-Type": isProjectQuery ? "project-specific" : "general",
          "X-District": isProjectQuery && trimmedQuery.toLowerCase().includes('wayanad') ? "Wayanad" : "",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache"
        },
        body: JSON.stringify(requestPayload)
      });
      
      console.log(`🌐 HTTP Response Status for [${requestId}]:`, res.status);
      console.log(`🌐 HTTP Response Headers for [${requestId}]:`, Object.fromEntries(res.headers.entries()));
      
      if (!res.ok) {
        console.error(`❌ HTTP Error for [${requestId}]:`, res.status, res.statusText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      // Get raw response text first
      const rawResponseText = await res.text();
      console.log(`📄 Raw Response Text for [${requestId}]:`, rawResponseText);
      console.log(`📏 Raw Response Length for [${requestId}]:`, rawResponseText.length);
      console.log(`🔍 Raw Response Type for [${requestId}]:`, typeof rawResponseText);
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(rawResponseText);
        console.log(`✅ Parsed JSON Data for [${requestId}]:`, data);
        console.log(`🔍 JSON Data Type for [${requestId}]:`, typeof data);
        console.log(`📊 JSON Data Keys for [${requestId}]:`, Object.keys(data || {}));
      } catch (parseError) {
        console.error(`❌ JSON Parse Error for [${requestId}]:`, parseError);
        console.log(`📄 Treating as plain text response for [${requestId}]`);
        data = rawResponseText;
      }
      
      let reportText = '';
      
      // Log each extraction attempt
      console.log(`🔍 Extracting report text for [${requestId}]...`);
      
      if (data && data.rtiReport) {
        console.log(`✅ Found data.rtiReport for [${requestId}]:`, data.rtiReport);
        reportText = data.rtiReport;
      } else if (data && data.report) {
        console.log(`✅ Found data.report for [${requestId}]:`, data.report);
        reportText = data.report;
      } else if (data && data.message) {
        console.log(`✅ Found data.message for [${requestId}]:`, data.message);
        reportText = data.message;
      } else if (data && data.response) {
        console.log(`✅ Found data.response for [${requestId}]:`, data.response);
        reportText = data.response;
      } else if (data && data.data) {
        console.log(`✅ Found data.data for [${requestId}]:`, data.data);
        reportText = data.data;
      } else if (data && data.content) {
        console.log(`✅ Found data.content for [${requestId}]:`, data.content);
        reportText = data.content;
      } else if (data && data.result) {
        console.log(`✅ Found data.result for [${requestId}]:`, data.result);
        reportText = data.result;
      } else {
        console.log(`⚠️ No standard field found, using raw data for [${requestId}]:`, data);
        reportText = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      }
      
      console.log(`📝 Extracted Report Text for [${requestId}]:`, reportText);
      console.log(`📏 Extracted Report Length for [${requestId}]:`, reportText.length);
      console.log(`🔍 Extracted Report Type for [${requestId}]:`, typeof reportText);
      
      // Validate that we received a meaningful response
      if (!reportText || reportText.trim().length < 10) {
        console.error(`❌ Response too short for [${requestId}]. Length:`, reportText.length);
        throw new Error("Response too short or empty");
      }
      
      // Check if response seems generic or cached (basic validation)
      const responseSignature = reportText.substring(0, 100).toLowerCase();
      console.log(`🔍 Response signature for [${requestId}]:`, responseSignature);
      
      // Log before processing
      console.log(`🔧 Processing response text for [${requestId}]...`);
      console.log(`📝 Before processing - length: ${reportText.length}, preview:`, reportText.substring(0, 200));
      
      // Process the response text
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
      
      console.log(`✅ Processed response for query [${requestId}] - Length:`, reportText.length);
      console.log(`📝 After processing - preview:`, reportText.substring(0, 200));
      
      // Enhanced response processing for project queries
      if (reportText && isProjectQuery) {
        console.log(`🏗️ Processing PROJECT-SPECIFIC response for [${requestId}]...`);
        
        // Add project-specific formatting
        reportText = `# ${trimmedQuery}\n\n` + reportText;
        
        // Add project metadata if Wayanad query
        if (trimmedQuery.toLowerCase().includes('wayanad')) {
          reportText = reportText.replace(
            /^# /,
            `# 🌿 WAYANAD DISTRICT PROJECT REPORT\n\n**Query**: ${trimmedQuery}\n**District**: Wayanad, Kerala\n**Category**: Post-Disaster Rehabilitation\n**Generated**: ${new Date().toLocaleString()}\n\n---\n\n# `
          );
        }
      }
      
      // Add project-specific metadata to response
      const uniqueResponse = `<!-- Project Query: ${trimmedQuery} | District: ${isProjectQuery && trimmedQuery.toLowerCase().includes('wayanad') ? 'Wayanad' : 'N/A'} | Request ID: ${requestId} | Timestamp: ${new Date().toISOString()} -->\n\n${reportText}`;
      
      console.log(`🎯 Final unique response for [${requestId}] - Length:`, uniqueResponse.length);
      console.log(`📝 Final response preview:`, uniqueResponse.substring(0, 300));
      
      return uniqueResponse;
    } catch (err) {
      console.error(`❌ Fetch error for query [${query}]:`, err);
      console.error(`❌ Error name:`, err.name);
      console.error(`❌ Error message:`, err.message);
      console.error(`❌ Error stack:`, err.stack);
      return `❌ Failed to fetch RTI data for your specific query: "${query}". Please check your connection and try again with a different question.`;
    }
  };

  // Function to convert markdown to plain text for PDF
  const markdownToPlainText = (markdown) => {
    if (!markdown || typeof markdown !== 'string') {
      return 'No response data available';
    }
    
    return markdown
      // Convert headers to plain text with emphasis
      .replace(/^#{1}\s+(.+)$/gm, '\n$1\n' + '='.repeat(50) + '\n')
      .replace(/^#{2}\s+(.+)$/gm, '\n$1\n' + '-'.repeat(30) + '\n')
      .replace(/^#{3,6}\s+(.+)$/gm, '\n$1:\n')
      
      // Convert bold/italic to uppercase or emphasis
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      
      // Convert links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      
      // Handle code blocks
      .replace(/```[\s\S]*?```/g, (match) => {
        return '\n' + match.replace(/```/g, '').trim() + '\n';
      })
      .replace(/`([^`]+)`/g, '$1')
      
      // Convert lists to readable format
      .replace(/^\*\s+(.+)$/gm, '• $1')
      .replace(/^-\s+(.+)$/gm, '• $1')
      .replace(/^\+\s+(.+)$/gm, '• $1')
      .replace(/^\d+\.\s+(.+)$/gm, '$1')
      
      // Handle tables - convert to readable format
      .replace(/\|([^|]+)\|/g, (match, content) => {
        return content.trim() + ' | ';
      })
      
      // Clean up horizontal rules
      .replace(/^-{3,}$/gm, '\n' + '-'.repeat(50) + '\n')
      
      // Remove extra whitespace but preserve structure
      .replace(/\n{4,}/g, '\n\n\n')
      .replace(/[ \t]+$/gm, '')
      .trim();
  };

  // Function to generate and download PDF
  const generateAndDownloadPDF = async (query, response) => {
    try {
      console.log(`Starting PROJECT-AWARE PDF generation for query: "${query}"`);
      
      if (!response || response.trim() === '') {
        console.error('No response data to generate PDF');
        return false;
      }

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      // Check if this is a Wayanad/project query
      const isWayanadQuery = query.toLowerCase().includes('wayanad');
      const isProjectQuery = query.toLowerCase().includes('rehabilitation') || 
                           query.toLowerCase().includes('spice plantation') ||
                           query.toLowerCase().includes('flood');
      
      // Enhanced header for project queries
      doc.setFontSize(24);
      doc.setTextColor(40, 40, 40);
      if (isWayanadQuery) {
        doc.text('🌿 WAYANAD PROJECT REPORT', margin, 30);
      } else {
        doc.text('RTI AutoBot Report', margin, 30);
      }
      
      // Add project-specific subtitle
      if (isProjectQuery) {
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        doc.text('Post-Disaster Rehabilitation & Recovery Program', margin, 42);
      }
      
      // Add horizontal line
      doc.setLineWidth(0.5);
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, isProjectQuery ? 48 : 35, pageWidth - margin, isProjectQuery ? 48 : 35);
      
      // Enhanced metadata for project queries
      const queryId = btoa(query).substring(0, 16);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, isProjectQuery ? 58 : 45);
      doc.text(`Query ID: ${queryId}`, pageWidth - margin - 50, isProjectQuery ? 58 : 45);
      
      if (isWayanadQuery) {
        doc.text(`District: Wayanad, Kerala`, margin, isProjectQuery ? 68 : 55);
        doc.text(`Category: Rehabilitation Project`, pageWidth - margin - 80, isProjectQuery ? 68 : 55);
      }
      
      let currentY = isProjectQuery ? 85 : (isWayanadQuery ? 70 : 60);
      
      // Add query section with emphasis on uniqueness
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 60);
      doc.text('SPECIFIC QUERY:', margin, currentY);
      currentY += 10;
      
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      const queryLines = doc.splitTextToSize(query, contentWidth);
      doc.text(queryLines, margin, currentY);
      currentY += (queryLines.length * 6) + 15;
      
      // Add separator line
      doc.setLineWidth(0.3);
      doc.setDrawColor(150, 150, 150);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 15;
      
      // Add response section
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 60);
      doc.text('UNIQUE RESPONSE:', margin, currentY);
      currentY += 15;
      
      // Convert markdown to plain text with query context
      const plainTextResponse = markdownToPlainText(response);
      console.log(`Converted plain text for query "${query}", length:`, plainTextResponse.length);
      
      if (!plainTextResponse || plainTextResponse.trim() === '' || plainTextResponse === 'No response data available') {
        doc.setFontSize(12);
        doc.setTextColor(200, 50, 50);
        doc.text('Error: No unique response data could be processed for this specific query.', margin, currentY);
        doc.text(`Query: "${query}"`, margin, currentY + 15);
        doc.text(`Response length: ${response ? response.length : 0} characters`, margin, currentY + 30);
      } else {
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        
        const responseLines = doc.splitTextToSize(plainTextResponse, contentWidth);
        console.log(`Total lines for query-specific response:`, responseLines.length);
        
        const lineHeight = 5;
        
        for (let i = 0; i < responseLines.length; i++) {
          if (currentY + lineHeight > pageHeight - 30) {
            doc.addPage();
            currentY = margin + 20;
          }
          
          doc.text(responseLines[i], margin, currentY);
          currentY += lineHeight;
        }
      }
      
      // Add footer with query-specific information
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        
        doc.setLineWidth(0.3);
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);
        
        doc.text(
          `RTI AutoBot - Query: "${query.substring(0, 30)}${query.length > 30 ? '...' : ''}"`,
          margin,
          pageHeight - 12
        );
        doc.text(
          `Page ${i} of ${totalPages} | ID: ${queryId}`,
          pageWidth - margin - 50,
          pageHeight - 12
        );
      }
      
      // Generate unique filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      let filename;
      
      if (isWayanadQuery) {
        filename = `Wayanad_Rehabilitation_${timestamp}.pdf`;
      } else if (isProjectQuery) {
        filename = `Project_Report_${timestamp}.pdf`;
      } else {
        const queryShort = query.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
        filename = `RTI_${queryShort}_${timestamp}.pdf`;
      }
      
      console.log(`Saving PROJECT-SPECIFIC PDF as: ${filename}`);
      doc.save(filename);
      
      console.log('Project-specific PDF generation completed successfully');
      return true;
    } catch (error) {
      console.error('Error generating project-specific PDF:', error);
      return false;
    }
  };

  const handleSend = async (msg) => {
    const messageToSend = typeof msg === "string" ? msg : input;
    if (!messageToSend.trim()) return;

    const trimmedMessage = messageToSend.trim();
    const queryHash = btoa(trimmedMessage).substring(0, 16); // Create unique hash for query
    
    console.log(`New query submitted: "${trimmedMessage}" [Hash: ${queryHash}]`);
    
    // Check if this exact query was recently processed (prevent duplicates within session)
    if (processedQueries.has(queryHash)) {
      console.log("Duplicate query detected, processing anyway to ensure fresh response");
    }
    
    // Add to processed queries set
    setProcessedQueries(prev => new Set(prev).add(queryHash));

    // Show user message in chat
    setMessages(prev => [...prev, { 
      sender: "user", 
      text: trimmedMessage, 
      timestamp: new Date(),
      queryHash: queryHash // Add unique identifier
    }]);
    setInput("");
    setIsTyping(true);

    // Show processing message with unique identifier
    const processingMessageId = `processing-${Date.now()}-${Math.random()}`;
    setMessages(prev => [...prev, { 
      sender: "bot", 
      text: `🔄 Processing your specific query: "${trimmedMessage.substring(0, 50)}${trimmedMessage.length > 50 ? '...' : ''}" and generating unique PDF report...`, 
      timestamp: new Date(),
      isProcessing: true,
      processingId: processingMessageId,
      queryHash: queryHash
    }]);

    try {
      const start = Date.now();
      console.log(`Fetching RTI report for unique query [${queryHash}]:`, trimmedMessage);
      
      const response = await fetchRTIReport(trimmedMessage);
      const responseTime = ((Date.now() - start) / 1000).toFixed(1) + "s";
      
      console.log(`RTI report received for query [${queryHash}], length:`, response ? response.length : 0);

      setIsTyping(false);

      // Validate response is unique and meaningful
      if (!response || response.trim() === '' || response.includes('Failed to fetch')) {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages.find(m => m.processingId === processingMessageId);
          if (lastMessage && lastMessage.isProcessing) {
            lastMessage.text = `❌ Failed to generate unique response for your query: "${trimmedMessage}". Please rephrase your question or try again.`;
            lastMessage.isProcessing = false;
            lastMessage.queryResolved = false;
            lastMessage.responseTime = responseTime;
          }
          return newMessages;
        });
        return;
      }

      // Generate unique PDF with query-specific content
      console.log(`Starting PDF generation for query [${queryHash}]...`);
      const pdfGenerated = await generateAndDownloadPDF(trimmedMessage, response);
      
      if (pdfGenerated) {
        // Update the processing message to show success with unique details
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages.find(m => m.processingId === processingMessageId);
          if (lastMessage && lastMessage.isProcessing) {
            lastMessage.text = `✅ Unique PDF report generated for your query!\n\n📊 Query: "${trimmedMessage}"\n📄 Report contains ${response.length} characters of specific government data\n⏱️ Response time: ${responseTime}\n🔍 Query ID: ${queryHash}`;
            lastMessage.isProcessing = false;
            lastMessage.queryResolved = true;
            lastMessage.responseTime = responseTime;
            lastMessage.queryHash = queryHash;
          }
          return newMessages;
        });
      } else {
        // If PDF generation failed, show the unique response in chat
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages.find(m => m.processingId === processingMessageId);
          if (lastMessage && lastMessage.isProcessing) {
            lastMessage.text = `❌ PDF generation failed for your specific query. Here's your unique response:\n\n**Query:** ${trimmedMessage}\n**Response ID:** ${queryHash}\n\n${response}`;
            lastMessage.isProcessing = false;
            lastMessage.queryResolved = true;
            lastMessage.responseTime = responseTime;
            lastMessage.queryHash = queryHash;
          }
          return newMessages;
        });
      }

      setQueryStats(prev => ({
        total: prev.total + 1,
        resolved: prev.resolved + 1
      }));
      
    } catch (error) {
      console.error(`Error processing query [${queryHash}]:`, error);
      setIsTyping(false);
      
      // Update message to show specific error
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages.find(m => m.processingId === processingMessageId);
        if (lastMessage && lastMessage.isProcessing) {
          lastMessage.text = `❌ An error occurred while processing your specific query: "${trimmedMessage}". Please try rephrasing your question.`;
          lastMessage.isProcessing = false;
          lastMessage.queryResolved = false;
          lastMessage.queryHash = queryHash;
        }
        return newMessages;
      });
    }
    
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
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
                <div className="max-w-4xl mx-auto px-6 py-8">
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
                <div className="max-w-4xl mx-auto px-6 py-6">
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
                <div className="max-w-4xl mx-auto px-6 py-6">
                  <div className="flex items-end gap-4">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Ask any question - PDF report will be automatically downloaded..."
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
                      title="Generate PDF Report"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Press Enter to generate and download PDF report
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "categories" && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-6xl mx-auto">
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
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
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
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Query Analytics</h2>
                  <p className="text-gray-500">Performance metrics and usage statistics</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-800 mb-1">44,152</div>
                    <div className="text-sm text-green-700">Queries Resolved</div>
                    <div className="text-xs text-green-600 mt-2">vs 1,520 traditional RTI filed</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 text-center">
                    <Timer className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-blue-800 mb-1">1.8M</div>
                    <div className="text-sm text-blue-700">Hours Saved</div>
                    <div className="text-xs text-blue-600 mt-2">Compared to traditional process</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 text-center">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-purple-800 mb-1">8,234</div>
                    <div className="text-sm text-purple-700">Active Users</div>
                    <div className="text-xs text-purple-600 mt-2">Monthly unique users</div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-xl p-8 text-center">
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