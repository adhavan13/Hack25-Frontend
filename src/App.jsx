import { useState, useEffect } from "react";
import Router from "./routes/router";
import { BrowserRouter } from "react-router-dom";
import ElephantAnimation from '../src/utils/loading/ElephantAnimation';
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user/session or app initialization
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ElephantAnimation />
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Router />
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
