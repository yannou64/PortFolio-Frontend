import "./edition.scss";
import Techno from "./Formulaires/Technos/Techno.jsx";
import Projet from "./Formulaires/Projets/Projets.jsx";
import BienvenueEdition from "./Formulaires/BienvenueEdition/BienvenueEdition.jsx";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext.jsx";


export default function Edition() {
  const [formActif, setFormActif] = useState("");
  const {isAdmin} = useContext(AuthContext)

  // Quand on clique sur un des boutons de formulaire
  function selectForm(e) {
    // sélectionner tous les boutons et réinitialiser la class selected
    const allBtn = document.querySelectorAll("#collectionList .btn");
    for (let btn of allBtn) {
      btn.classList.remove("selected");
    }

    // ajouter la class selected au bouton qui aura été clické
    setFormActif(e.target.id);
    document.getElementById(e.target.id).classList.add("selected");
  }

  // Si l'utilisateur n'est pas admin, on redirige vers logout
  if (!isAdmin) {
    return <Navigate to="/logout" replace />;
  }

  return (
    <div id="container_edition">
      <section id="editDisplay">
        <div id="collectionList">
          <button id="Techno" className="btn" onClick={selectForm}>
            Techno / Outils
          </button>
          <button id="Projet" className="btn" onClick={selectForm}>
            Projets
          </button>
        </div>
        <div id="formDisplay">
          {formActif === "" && <BienvenueEdition />}
          {formActif === "Techno" && <Techno />}
          {formActif === "Projet" && <Projet />}
        </div>
      </section>
      <section id="isNotDesktop">
        <h2 className="messageError">- Mode Edition uniquement sur Desktop -</h2>
      </section>
    </div>
  );
}
