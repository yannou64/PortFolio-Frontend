import "./titreAccroche.scss";
import { useState, useEffect } from "react";
import { GrUpdate } from "react-icons/gr";

export default function TitreAccroche() {
  const URI_API = import.meta.env.VITE_API_URL;
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [nameAndSurname, setNameAndSurname] = useState("");
  const [accroche, setAccroche] = useState("");

  // Les fonctions de mon composants
  async function fetchGetData() {
    try {
      const response = await fetch(`${URI_API}/api/cv/titreAccroche`);
      if (response.ok) {
        const data = await response.json();
        setId(data.data._id);
        setTitle(data.data.title);
        setNameAndSurname(data.data.nameAndSurname);
        setAccroche(data.data.accroche);
      }
    } catch (e) {
      console.log("Erreur dans fecthGetData : ", e);
    }
  }

  async function fetchUpdateData() {
    console.log(title);
    try {
      const response = await fetch(`${URI_API}/api/cv/titreAccroche/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          nameAndSurname,
          accroche,
        }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (e) {
      console.log(`Error in fetchUpdateData : ${e}`);
    }
  }

  // Code génére en appuyant sur update
  async function submitButton(e) {
    e.preventDefault();
    fetchUpdateData();
  }

  // Code lancé au chargement du composant
  useEffect(() => {
    fetchGetData();
  }, []);

  return (
    <form id="titreAccrocheForm" onSubmit={submitButton}>
      <input
        
        onChange={(e) => setNameAndSurname(e.target.value)}
        className="input"
        type="text"
        placeholder="Nom et Prenom"
        value={nameAndSurname}
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
        type="text"
        placeholder="Titre"
      />
      <textarea
      wrap="soft"
        value={accroche}
        onChange={(e) => setAccroche(e.target.value)}
        className="input"
        type="text"
        placeholder="Accroche"
      />
      <button id="submitButton">
        <GrUpdate size={40} />
      </button>
    </form>
  );
}
