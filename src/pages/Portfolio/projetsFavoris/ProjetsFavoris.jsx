import "./projetsFavoris.scss";
import { useState } from "react";
import VignetteProjet from "./components/vignetteProjet/VignetteProjet";
import plusDeProjet from "../../../assets/plusDeProjet.svg";
import { useEffect } from "react";

export default function ProjetsFavoris() {
  const [projets, setProjets] = useState([]);
  const [arrayOfProjectsAndTheirTechnos, setArrayOfProjectsAndTheirTechnos] = useState([]);
  // Récupération des projets
  async function getProjets() {
    const response = await fetch(import.meta.env.VITE_API_URL + `/api/edition/projet`);
    if (!response.ok) return;
    const data = await response.json();
    setProjets(data.data);
  }

  // Récupérer les technos qui sont référencées pour chaque projet
  function getTechnoInEachProjet() {
    console.log(projets);
  }

  useEffect(() => {
    getProjets();
  }, []);

  useEffect(() => {
    getTechnoInEachProjet();
  }, [projets]);

  return (
    <section id="projetsFavoris">
      <h2>Mes Projets</h2>
      {projets.map((projet) => (
        <VignetteProjet
          key={projet._id}
          titre={projet.intitule}
          description={projet.synthese}
          image={import.meta.env.VITE_API_URL + "/" + projet.img}
        />
      ))}
      <VignetteProjet titre="Envie de voir tous mes projets" description="" image={plusDeProjet} technos="" />
    </section>
  );
}
