import Header from "@/components/NavBar/header";
import Scheme from "@/components/Scheme/scheme";

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
      <header className="">
        <Header />
      </header>
      <main>
        <Scheme />
      </main>
    </div>
  );
}
