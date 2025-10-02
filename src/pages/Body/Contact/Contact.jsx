import "./contact.scss";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../Portfolio/components/MyButton/MyButton";
import confirmEmail from "../../../utils/confirmEmail";

export default function Contact() {
  const [emailContact, setEmailContact] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dialogModal = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();

    if (!confirmEmail.test(emailContact) || !emailContact) return dialogModal.current.showModal();

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
      const data = await response.json();
      console.error(data.message);
    } else {
      navigate("/contact/remerciement");
    }
  }

  return (
    <section id="Contact">
      <h2>Contactez-moi</h2>
      <form id="contact_email" onSubmit={onSubmit}>
        <input
          id="userContact"
          autoFocus
          className="input"
          aria-label="Email"
          required
          type="email"
          placeholder="Votre email"
          onChange={(e) => setEmailContact(e.target.value)}
          value={emailContact}
        />
        <textarea
          id="message"
          aria-label="Message"
          placeholder="Votre message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="input"
          required
        ></textarea>
      </form>
      <MyButton id="contact_email" type="submit" titre="Envoyer" lien="#" />
      <dialog ref={dialogModal}>
        <h3>Petite maladraisse</h3>
        <p>
          Vérifiez votre <strong>email</strong>
        </p>

        <div>
          <button onClick={() => dialogModal.current.close()} id="button_modal">
            OK
          </button>
        </div>
      </dialog>
    </section>
  );
}
