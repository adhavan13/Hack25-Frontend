import Router from "./routes/router";
import Navbar from './components/Navbar/header';
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

