import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./register.scss";

export default function Register() {
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();

  async function submitAction(e) {
    e.preventDefault();
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
          placeholder="mot de passe"
          required
        />
        <button className="btn" type="submit">
          S'enregistrer
        </button>
      </form>
      <Link to="/Login" className="login_return">Return to Login</Link>
    </div>
  );
}
