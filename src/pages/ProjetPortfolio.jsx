import "./projetPortfolio.scss";
import CvContenu from "./Cv/CvContenu/CvContenu.jsx";
import {useState } from "react";
import Header from "../Header/Header.jsx";
import Portfolio from "./Portfolio/Portfolio.jsx";
import EditCv from "./Cv/EditCv/EditCv.jsx"
import Contact from "./Contact/Contact.jsx";

export default function ProjetPortfolio() {
  // En fonction de la valeur de choice, un composant sera chargé sous le header 
  const [choice, setChoice] = useState("")

  // Fonction passé en props deans Header pour mettre à jours choice
  function iconeMenuClicked(choice) {
    setChoice(choice)
    console.log(choice);
  }

  return (
    <div id="container-Princal">
      <Header menuChoice={iconeMenuClicked} />
      {/* Le composant chargé par défaut est Portfolio */}
      {(choice === "" || choice === "menu_portfolio" )&& <Portfolio />}
      {choice === "menu_cv" && <CvContenu />}
      {choice === "menu_contact" && <Contact />}
      {/* Ce composant ne peut être chargé que par l'admin */}
      {choice === "menu_edit" && <EditCv />}
    </div>
  );
}
