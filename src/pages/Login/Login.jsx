import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  console.log(document.cookie)
  async function submitAction(e) {
    e.preventDefault();
    try {
      // Envoyer les donnée à l'api
      console.log("requete envoye"); // test
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
      console.log("requete reçu"); // test

      // récupérer les données
      const data = await response.json();
      console.log(data); //test

      if (!response.ok) return navigate(`/ErrorPage/${data.message}`);

      // Stocker les datas dans le localstorage
      localStorage.setItem("username", data.username);

      // Rediriger vers la page du cv
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
      <Link to="/register">Register</Link>
    </div>
  );
}
