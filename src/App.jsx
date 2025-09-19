import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./pages/Header/Header";
import Register from "./pages/Body/Register/Register";
import Login from "./pages/Body/Login/Login";
import ErrorPage from "./pages/Body/ErrorPage/ErrorPage";
import Logout from "./pages/Body/Logout/Logout";
import Portfolio from "./pages/Body/Portfolio/Portfolio";
import CG from "./pages/Body/ConditionsGenerales/CG";
import Edition from "./pages/Body/Edition/Edition";
import Remerciement from "./pages/Body/Remerciement/Remerciement";
import Footer from "./pages/Footer/Footer";
import AuthContext from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const value = { isAdmin, setIsAdmin };

  // Vérification si un token admin existe et si il n'est pas expiré, renvoie auth: true ou false
  async function isAlreadyAdmin() {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/api/auth/checkIfAdmin", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        if (data.auth) setIsAdmin(true);
      } else {
        console.log("Error : ", data.message);
      }
    } catch (e) {
      console.log("Error : ", e.message);
    }
  }

  useEffect(() => {
    isAlreadyAdmin();
  }, []);

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
            <Route path="/conditionsGenerales" element={<CG />} />
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
