import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout"
import Portfolio from "./pages/Portfolio/Portfolio";
import Cv from "./pages/Cv/Cv"
import EditCv from "./pages/EditCv/EditCv";
import Contact from "./pages/Contact/Contact";
import Remerciement from "./pages/Remerciement/Remerciement";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Portfolio />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/editCv" element={<EditCv />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/remerciement" element={<Remerciement />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
