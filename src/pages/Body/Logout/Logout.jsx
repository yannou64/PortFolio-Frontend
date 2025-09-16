import { Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function Logout() {
  const { setIsAdmin } = useContext(AuthContext);

  // effacer le cookie depuis le backend
  async function eraseCookie() {
    const response = await fetch(import.meta.env.VITE_API_URL + "/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) console.log(`Erreur dans la suppression du cookie : ${data.message}`);
  }

  useEffect(() => {
    setIsAdmin(false);
    eraseCookie();
  }, []);

  return <Navigate to="/" replace />;
}
