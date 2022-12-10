import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UploadFile from "./pages/UploadFile/UploadFile";
import ViewFile from "./pages/ViewFile/ViewFile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/view" element={<ViewFile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
