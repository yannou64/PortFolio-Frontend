import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Cv from "./pages/Cv/Cv"
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter className="BrowserRouter">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cv" element={<Cv />} />
        <Route path="/ErrorPage/:error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
