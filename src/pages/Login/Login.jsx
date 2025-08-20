import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.scss";
import {setAdmin} from "../../auth.js"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submitAction(e) {
    e.preventDefault();
    try {
      // Envoyer les donnée à l'api pour vérifier les données d'identification
      const response = await fetch("http://localhost:3444/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email,
        }),
      });
      // si response.ok 
      //     mise à jours status admin  
      //     redirection vers la page edition 
      // sinon 
      //     redirection vers la page error
      if (response.ok) {
        setAdmin(true)
        navigate("/edition");
      } else {
        return navigate(`/error`);
      }
    } catch (e) {
      console.log("Erreur lors du fetch login : ", e.message);
    }
  }

  return (
    <form onSubmit={submitAction} id="container-login">
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="input "
        type="email"
        placeholder="email"
        required
        autoComplete="off"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        type="password"
        placeholder="mot de passe"
        required
      />
      <button className="btn" type="submit">
        Se connecter
      </button>
    </form>
  );
}
