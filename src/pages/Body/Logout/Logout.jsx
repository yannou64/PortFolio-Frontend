import { Navigate } from "react-router-dom";
import { setAdmin } from "../../../auth";
import { useEffect } from "react";

export default function Logout() {
  setAdmin(false);

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
    eraseCookie();
  }, []);

  return <Navigate to="/" replace />;
}
