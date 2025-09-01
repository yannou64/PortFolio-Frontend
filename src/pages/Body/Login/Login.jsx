import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.scss";
import { setAdmin } from "../../../auth.js";

export default function Register() {
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();

  async function submitAction(e) {
    e.preventDefault();
    try {
      // Envoyer les donnée à l'api pour vérifier les données d'identification
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mdp,
          identifiant,
        }),
      });
      const data = await response.json()
      if (response.ok) {
        setAdmin(true);
        navigate("/edition");
      } else {
        return navigate(`/error/${data.message}`);
      }
    } catch (e) {
      console.log("Erreur lors du fetch login : ", e.message);
    }
  }

  return (
    <div id="container_login">
      <form onSubmit={submitAction}>
        <input
          onChange={(e) => setIdentifiant(e.target.value)}
          className="input "
          type="text"
          placeholder="identifiant"
          required
          autoComplete="off"
        />
        <input
          onChange={(e) => setMdp(e.target.value)}
          className="input"
          type="password"
          placeholder="mot de passe"
          required
        />
        <button className="btn" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}
