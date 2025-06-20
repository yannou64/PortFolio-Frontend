import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import "./cv.css";
import CvContenu from "../Cv/CvContenu/CvContenu.jsx";
import EditCv from "../Cv/EditCv/EditCv.jsx";
import { jwtDecode } from "jwt-decode"

export default function Cv() {
  const [redirect, setRedirect] = useState(false);
  const username = localStorage.getItem("username");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [editMode, setEditMode] = useState(false)

  async function fetchData() {
    // je fais une demande de données pour le cv, si ok status 200, sinon rediriger vers le login avec un message "vous devez vous reconnecter"
    try {
      const response = await fetch("http://localhost:3444/cv", {
        credentials: "include",
      });
      if (!response.ok) setRedirect(true);

      const data = await response.json();
      console.log(data.message);
    } catch (e) {
      console.log("Demande de données pour cv echoué : ", e);
    }
  }

  // je fais une fonction que je passe au bouton du header pour charger soit le composant 
  // EditCv ou CvContenu
  function triggerEditMode(){
    setEditMode(!editMode)
  }

  useEffect(() => {
    setToken(document.cookie.split("=")[1]);
  }, []);
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      fetchData();
    }
  }, [token]);

  if (redirect) return <Navigate to="/ErrorPage/Vous n'ête pas identifié" replace />;

  return (
    <div className="container">
      <Header username={username} role={role} triggerEditMode={triggerEditMode} editMode={editMode}/>
      {!editMode ? <CvContenu /> : <EditCv />}
    </div>
  );
}
