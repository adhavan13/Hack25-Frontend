import Header from "@/components/NavBar/header";
import Scheme from "@/components/Scheme/scheme";
import ChatBot from "@/components/ChatBot/chatbot";
import { Routes, Route } from "react-router-dom";
import GrievancesPage from "../components/Grievances/grievances";
import Dashboard from "../components/dashboard/dashboard";
import Suggestion from "../components/SchemeSuggestion/schemeSuggestion";
// Add scrollbar styling
const scrollbarStyle = `
  ::-webkit-scrollbar {
    width: 10px;
    background-color: white;
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
    border: 2px solid white;
  }
`;

export default function Router() {
  return (
    <div>
      {/* Add style tag for scrollbar styling */}
      <style>{scrollbarStyle}</style>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Scheme />} />
          <Route path="/grievances" element={<GrievancesPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/suggestion" element={<Suggestion />} />
          {/* Add other routes here as needed */}
        </Routes>
      </main>
      <ChatBot />
    </div>
  );
}
