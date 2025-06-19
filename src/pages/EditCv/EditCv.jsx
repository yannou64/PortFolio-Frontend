import "./editCv.css"
import TitreAccroche from "./Formulaires/TitreAccroche";
import Coordonnees from "./Formulaires/Coordonnees";
import Experiences from "./Formulaires/Experiences";
import Certifications from "./Formulaires/Certifications";
import Competences from "./Formulaires/Competences";
import Techno from "./Formulaires/Techno";
import Interets from "./Formulaires/Interets";
import Langues from "./Formulaires/Langues";
import { useState } from "react";

export default function EditCv() {
    const [formActif, setFormActif] = useState("")

    function selectForm(e){
        setFormActif(e.target.id)
        document.getElementById(e.target.id).classList.toggle('selected')
    }

    return (
    <div id="EditDisplay">
      <div id="collectionList">
        <button id="Titre" className="btn" onClick={selectForm}>Titre / Accroche</button>
        <button id="Coordonnees" className="btn" onClick={selectForm}>Coordonnées</button>
        <button id="Experiences" className="btn" onClick={selectForm}>Expériences</button>
        <button id="Certifications" className="btn" onClick={selectForm}>Certifications</button>
        <button id="Competences" className="btn" onClick={selectForm}>Compétences</button>
        <button id="Techno" className="btn" onClick={selectForm}>Techno / Outils</button>
        <button id="Interets" className="btn" onClick={selectForm}>Centres d'intérêts</button>
        <button id="Langues" className="btn" onClick={selectForm}>Langues</button>
      </div>
      <div id="formDisplay">
        {formActif === "Titre" && <TitreAccroche />}
        {formActif === "Coordonnees" && <Coordonnees />}
        {formActif === "Experiences" && <Experiences />}
        {formActif === "Certifications" && <Certifications />}
        {formActif === "Competences" && <Competences />}
        {formActif === "Techno" && <Techno />}
        {formActif === "Interets" && <Interets />}
        {formActif === "Langues" && <Langues />}
      </div>
    </div>
  );
}
