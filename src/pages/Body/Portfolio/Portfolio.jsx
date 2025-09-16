import Hero from "./Hero/Hero.jsx";
import ProjetsFavoris from "./ProjetsFavoris/ProjetsFavoris.jsx";
import MesTechnos from "./MesTechnos/MesTechnos.jsx";
import { useEffect, useState } from "react";
import Parcours_Contact from "./Parcours_Contact/Parcours_Contact.jsx";

export default function Portfolio() {
  // Centralisation des requêtes et distributions des données dans les composants via les props
  // Récupérer tous les projets
  const [projetsFavoris, setProjetsFavoris] = useState([]);

  // Récupération des projets
  async function getProjetsFavoris() {
    const response = await fetch(import.meta.env.VITE_API_URL + `/api/edition/projets/favoris`);
    const data = await response.json();
    if (!response.ok) return console.log(data.message);
    setProjetsFavoris(data.data);
  }

  // Récupérer toutes les technos
  const [technosByCategorie, setTechnosByCategorie] = useState([]);

  async function getTechnosByCategorie() {
    const response = await fetch(import.meta.env.VITE_API_URL + `/api/edition/technos/byCategories`);
    const data = await response.json();
    if (!response.ok) return console.log(data.message);
    setTechnosByCategorie(data.data);
  }

  // Lancement du programme
  useEffect(() => {
    getProjetsFavoris();
    getTechnosByCategorie()
  }, []);

  return (
    <>
      <Hero />
      <ProjetsFavoris projets={projetsFavoris} />
      <MesTechnos technosByCategorie={technosByCategorie}/>
      <Parcours_Contact />
    </>
  );
}
