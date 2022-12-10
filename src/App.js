import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UploadFile from "./pages/UploadFile/UploadFile";
import ViewFile from "./pages/ViewFile/ViewFile";
import { Nav } from "./components/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/view" element={<ViewFile />} />
          <Route path="/login" element={<LoginPage/>} />       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
