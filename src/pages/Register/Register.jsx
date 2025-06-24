import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./register.scss";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function submitAction(e) {
    e.preventDefault();
    try {
      const bodycontent = JSON.stringify({ username, email, password });
      console.log();
      const response = await fetch("http://localhost:3444/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodycontent,
      });
    
      // Récupérer les donnees de l'api
      const data = await response.json();
      if(!response.ok) return navigate(`/ErrorPage/${data.message}`)

      console.log(data.message);
      navigate('/login')
    } catch (e) {
      console.log("Erreur de fetch pour s'enregistrer : ", e.message);
      navigate(`/ErrorPage/${e.message}`)
    }
  }

  return (
    <div id="container">
      <form onSubmit={submitAction}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="input input-secondary"
          type="text"
          placeholder="username"
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input input-secondary"
          type="email"
          placeholder="email"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="input input-secondary"
          type="password"
          placeholder="mot de passe"
          required
        />
        <button className="btn btn-secondary" type="submit">
          S'enregistrer
        </button>
      </form>
      <Link to="/Login">Return to Register</Link>
    </div>
  );
}
