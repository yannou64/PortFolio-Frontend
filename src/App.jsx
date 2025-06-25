import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ProjetPortfolio from "./pages/ProjetPortfolio";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter className="BrowserRouter">
      <Routes>
        <Route path="/" element={<ProjetPortfolio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cv" element={<ProjetPortfolio />} />
        <Route path="/ErrorPage/:error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
