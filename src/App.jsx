import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./pages/Header/Header";
import Register from "./pages/Body/Register/Register";
import Login from "./pages/Body/Login/Login";
import ErrorPage from "./pages/Body/ErrorPage/ErrorPage";
import Logout from "./pages/Body/Logout/Logout";
import Portfolio from "./pages/Body/Portfolio/Portfolio";
import Edition from "./pages/Body/Edition/Edition";
import Remerciement from "./pages/Body/Remerciement/Remerciement";
import Footer from "./pages/Footer/Footer";
import AuthContext from "./context/AuthContext";

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const value = {isAdmin, setIsAdmin}

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/edition" element={<Edition />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/error/:message" element={<ErrorPage />} />
            <Route path="/contact/remerciement" element={<Remerciement />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
