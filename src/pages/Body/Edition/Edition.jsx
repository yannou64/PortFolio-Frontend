import "./edition.scss";
import TitreAccroche from "./Formulaires/TitreAccroche/TitreAccroche.jsx";
import Coordonnees from "./Formulaires/Coordonnees/Coordonnees.jsx";
import Experiences from "./Formulaires/Experiences/Experiences.jsx";
import Certifications from "./Formulaires/Certications/Certifications.jsx";
import Competences from "./Formulaires/Competences/Competences.jsx";
import Techno from "./Formulaires/Technos/Techno.jsx";
import Interets from "./Formulaires/Interets/Interets.jsx";
import Langues from "./Formulaires/Langues/Langues.jsx";
import Projet from "./Formulaires/Projets/Projets.jsx";
import BienvenueEdition from "./Formulaires/BienvenueEdition/BienvenueEdition.jsx";
import { useState } from "react";

export default function EditCv() {
  const [formActif, setFormActif] = useState("");

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

  return (
    <div id="container_edition">
      <section id="editDisplay">
        <div id="collectionList">
          {/* <button id="Titre" className="btn " onClick={selectForm}>
          Titre / Accroche
        </button> */}
          {/* <button id="Coordonnees" className="btn" onClick={selectForm}>
          Coordonnées
        </button> */}
          {/* <button id="Interets" className="btn" onClick={selectForm}>
          Centres d'intérêts
        </button> */}
          {/* <button id="Langues" className="btn" onClick={selectForm}>
          Langues
        </button> */}
          {/* <button id="Certifications" className="btn" onClick={selectForm}>
          Certifications
        </button> */}
          {/* <button id="Competences" className="btn" onClick={selectForm}>
          Compétences
        </button> */}
          <button id="Techno" className="btn" onClick={selectForm}>
            Techno / Outils
          </button>
          <button id="Projet" className="btn" onClick={selectForm}>
            Projets
          </button>
          {/* <button id="Experiences" className="btn" onClick={selectForm}>
          Expériences
        </button> */}
        </div>
        <div id="formDisplay">
          {formActif === "" && <BienvenueEdition />}
          {formActif === "Titre" && <TitreAccroche />}
          {formActif === "Coordonnees" && <Coordonnees />}
          {formActif === "Certifications" && <Certifications />}
          {formActif === "Competences" && <Competences />}
          {formActif === "Techno" && <Techno />}
          {formActif === "Interets" && <Interets />}
          {formActif === "Langues" && <Langues />}
          {formActif === "Projet" && <Projet />}
          {formActif === "Experiences" && <Experiences />}
        </div>
      </section>
      <section id="isNotDesktop">
        <h2 className="messageError">- Mode Edition uniquement sur Desktop -</h2>
      </section>
    </div>
  );
}
