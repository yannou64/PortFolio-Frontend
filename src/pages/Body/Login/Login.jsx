import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext.jsx";
import alerteSonore from "../../../utils/alerteSonore.js";
import modelMdp from "../../../utils/confirmMdp.js";
import "./login.scss";

export default function Register() {
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();
  const { setIsAdmin } = useContext(AuthContext);


  async function submitAction(e) {
    e.preventDefault();

    // Validation mdp
    
    const messageError = document.querySelector(".message_error");
    if (!modelMdp.test(mdp)) {
      messageError.classList.remove("message_error-hidden");
      alerteSonore();
      return;
    }

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

      const data = await response.json();

      if (response.ok) {
        setIsAdmin(true);
        navigate("/edition");
      } else {
        return navigate(`/error/${data.message}`);
      }
    } catch (e) {
      console.log("Erreur lors du fetch login : ", e.message);
    }
  }

  return (
    <section id="container_login">
      <form onSubmit={submitAction}>
        <input
          onChange={(e) => setIdentifiant(e.target.value)}
          className="input "
          type="text"
          placeholder="identifiant"
          required
          autoComplete="username"
        />
        <input
          onChange={(e) => setMdp(e.target.value)}
          className="input"
          type="password"
          minLength={8}
          placeholder="mot de passe"
          autoComplete="current-password"
          required
        />
        <div className="message_error message_error-hidden">
          <strong>Erreur : </strong>Le mot de passe doit faire au moins 8 caractères, contenir au moins 1 chiffre et 1
          caractère spécial
        </div>
        <button className="btn" type="submit">
          Se connecter
        </button>
      </form>
    </section>
  );
}
