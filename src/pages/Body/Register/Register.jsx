import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import alerteSonore from "../../../utils/alerteSonore";
import modelMdp from "../../../utils/confirmMdp";
import "./register.scss";

export default function Register() {
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();

  async function submitAction(e) {
    e.preventDefault();

    // validation du mdp
    if(!modelMdp.test(mdp)){
      alerteSonore()
      return
    }

    try {
      const bodycontent = JSON.stringify({ identifiant, mdp });
      const response = await fetch(import.meta.env.VITE_API_URL + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodycontent,
      });

      // Récupérer les donnees de l'api
      const data = await response.json();
      if (!response.ok) return navigate(`/Error/${data.message}`);
      navigate("/login");
    } catch (e) {
      console.log("Erreur de fetch pour s'enregistrer : ", e.message);
      navigate(`/Error/${e.message}`);
    }
  }

  return (
    <div id="container_register">
      <form onSubmit={submitAction}>
        <input
          onChange={(e) => setIdentifiant(e.target.value)}
          className="input"
          type="text"
          placeholder="username"
          required
        />
        <input
          onChange={(e) => setMdp(e.target.value)}
          className="input"
          type="password"
          minLength={8}
          autoComplete="new-password"
          placeholder="mot de passe"
          required
        />
        <div className="mdp_message"><p>Au moins 8 caractères avec au moins un chiffre et un caractère spécial</p></div>
        <button className="btn" type="submit">
          S'enregistrer
        </button>
      </form>
      <Link to="/Login" className="login_return">Return to Login</Link>
    </div>
  );
}
