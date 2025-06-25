import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  async function submitAction(e) {
    e.preventDefault();
    try {
      // Envoyer les donnée à l'api
      const response = await fetch("http://localhost:3444/auth/login", {
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

      // récupérer les données
      const data = await response.json();
      if (!response.ok) return navigate(`/ErrorPage/${data.message}`);

      // Rediriger vers la page du cv
      console.log(data.message)
      navigate("/cv");

    } catch (e) {
      console.log("Erreur lors du fetch login : ", e.message);
    }
  }

  return (
    <div id="container">
      <form onSubmit={submitAction}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input input-primary"
          type="email"
          placeholder="email"
          required
          autoComplete="off"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="input input-primary"
          type="password"
          placeholder="mot de passe"
          required
        />
        <button className="btn btn-primary" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}
