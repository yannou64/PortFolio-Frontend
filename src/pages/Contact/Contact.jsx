import "./contact.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [userContact, setUserContact] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [fromWho, setFromWho] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    console.log("test");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/priseDeContact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userContact,
        sujet,
        message,
        fromWho,
      }),
    });
    if (!response.ok) {
      const data = response.json();
      console.log(data.message);
    }
    navigate("/contact/remerciement");
  }

  return (
    <div className="container_contact">
      <form onSubmit={onSubmit} >
        <h1>Laissez moi un message</h1>
        <input
          type="text"
          className="input"
          placeholder="Votre nom / fonction"
          onChange={(e) => setFromWho(e.target.value)}
          value={fromWho}
        />
        <input
          id="userContact"
          className="input"
          type="text"
          placeholder="Vous recontacter : tel / email"
          onChange={(e) => setUserContact(e.target.value)}
          value={userContact}
        />
        <input
          id="sujet"
          className="input"
          type="text"
          placeholder="Sujet "
          onChange={(e) => setSujet(e.target.value)}
          value={sujet}
        />
        <textarea
          id="message"
          placeholder="Votre message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="input"
        ></textarea>
        <button className="btn">Envoyer</button>
      </form>
    </div>
  );
}
