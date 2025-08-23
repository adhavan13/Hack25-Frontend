import Router from "./routes/router";
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Router />
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

