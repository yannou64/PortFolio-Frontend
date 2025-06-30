import "./competences.scss";
import { useState, useEffect } from "react";
import Item from "../../components/Item/Item";

export default function Competences() {
  const [competence, setCompetence] = useState("");
  const [categorie, setCategorie] = useState("");
  const [allCompetences, setAllCompetences] = useState([]);
  const [isChmapsInvalide, setIsChampsInvalide] = useState(false);
  const [competenceToChange, setCompetenceToChange] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // Obtenir toutes les compétence
  async function getAllCompetence() {
    try {
      console.log("envoie getAll");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/competences`);
      const data = await response.json();
      if (!response.ok) return console.log(data.message);
      setAllCompetences(data.data);
    } catch (e) {
      console.lot(e);
    }
  }

  // Ajouter une compétence
  async function addCompetence(e) {
    e.preventDefault();
    console.log(categorie);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/competences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competence,
          categorie,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setIsChampsInvalide(true);
        return console.log(data.message);
      }
      setCompetence("");
      setCategorie("");
      getAllCompetence();
      setIsChampsInvalide(false);
    } catch (e) {
      console.log(e);
    }
  }

  // Supprimer
  async function deleteElement(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/competences/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) return console.log(data.message);
      getAllCompetence();
    } catch (e) {
      console.log(e);
    }
  }

  // Update
  async function getElement(element) {
    try {
      console.log(element._id);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/competences/${element._id}`);
      const data = await response.json();
      console.log(data);
      if (!response.ok) return console.log("Mauvais retour du backend");
      setCompetence(data.data.competence);
      setCategorie(data.data.categorie);
      setIsUpdateMode(true);
      setCompetenceToChange(element);
    } catch (e) {
      console.log(e);
    }
  }

  async function updateElement(e) {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cv/competences/${competenceToChange._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competence,
          categorie
        }),
      });
      const data = await response.json();
      if (!response.ok) return console.log(data.message);
      getAllCompetence();
      setIsUpdateMode(false);
      setCompetenceToChange("");
      setCompetence("");
      setCategorie("");
    } catch (e) {
      console.log(e);
    }
  }

  // Code exécuté au chargement du composant
  useEffect(() => {
    getAllCompetence();
  }, []);

  return (
    <div id="competencesContainer">
      <form id="competencesForm" onSubmit={isUpdateMode ? updateElement : addCompetence}>
        <input
          type="text"
          className="input w-full"
          placeholder="compétence"
          onChange={(e) => setCompetence(e.target.value)}
          value={competence}
        />
        <select type="text" className=" w-full" onChange={(e) => setCategorie(e.target.value)} value={categorie}>
          <option value="" disabled>
            --choisir--
          </option>
          <option value="Soft Skill">Soft skill</option>
          <option value="Hard Skill">Hard skill</option>
        </select>

        <button className="btn">{isUpdateMode ? "Update" : "Add"}</button>
        {isChmapsInvalide && <p>Champs invalides</p>}
      </form>
      <div id="competencesList">
        <p>-- Mes softs skills --</p>
        <ul>
          {allCompetences
            .filter((item) => item.categorie === "Soft Skill")
            .map((item) => (
              <Item item={item} element={item.competence} updateElement={getElement} deleteElement={deleteElement} />
            ))}
        </ul>
        <p>-- Mes hards skills --</p>
        <ul>
          {allCompetences
            .filter((comp) => comp.categorie === "Hard Skill")
            .map((item) => (
              <Item item={item} element={item.competence} updateElement={getElement} deleteElement={deleteElement} />
            ))}
        </ul>
      </div>
    </div>
  );
}
