import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import Header from "./pages/Header/Header";
import Register from "./pages/Body/Register/Register";
import Login from "./pages/Body/Login/Login";
import ErrorPage from "./pages/Body/ErrorPage/ErrorPage";
import Logout from "./pages/Body/Logout/Logout";
import Portfolio from "./pages/Body/Portfolio/Portfolio";
import Cv from "./pages/Body/Cv/Cv";
import Edition from "./pages/Body/Edition/Edition";
import Contact from "./pages/Body/Contact/Contact";
import Remerciement from "./pages/Body/Remerciement/Remerciement";
import Footer from "./pages/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error/:message" element={<ErrorPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/edition" element={<Edition />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/remerciement" element={<Remerciement />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
