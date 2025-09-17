import "./contact.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../Portfolio/components/MyButton/MyButton";

export default function Contact() {
  const [emailContact, setEmailContact] = useState("");
  const [message, setMessage] = useState("");
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
        emailContact,
        message,
      }),
    });
    if (!response.ok) {
      const data = response.json();
      console.log(data.message);
    }
    navigate("/contact/remerciement");
  }

  return (
    <section id="Contact">
        <h2>Contactez-moi</h2>
      <form id="contact_email" onSubmit={onSubmit} >
        <input
          id="userContact"
          className="input"
          required
          type="email"
          placeholder="Votre email"
          onChange={(e) => setEmailContact(e.target.value)}
          value={emailContact}
        />
        <textarea
          id="message"
          placeholder="Votre message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="input"
          required
        ></textarea>
      </form>
        <MyButton id="contact_email" type="submit" titre="Envoyer" lien="#"/>
    </section>
  );
}
