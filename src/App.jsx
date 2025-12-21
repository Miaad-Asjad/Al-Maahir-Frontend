
import { BrowserRouter } from "react-router-dom";

import Footer from "./components/Footer";
import MainRoutes from "./routes/MainRoutes";
import "./index.css";

import axios from "axios";
import Navbar from "./components/Navbar";




const token = localStorage.getItem("adminToken");
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
const App = () => (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-950 to-purple-900 text-white">
<Navbar />
      <main className="flex-1">
        <MainRoutes />
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
