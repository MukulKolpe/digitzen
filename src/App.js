import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UploadFile from "./pages/UploadFile/UploadFile";
import ViewFile from "./pages/ViewFile/ViewFile";
import { Nav } from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/view" element={<ViewFile />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
