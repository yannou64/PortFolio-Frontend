import "./projetsFavoris.scss";
import VignetteProjet from "./components/vignetteProjet/VignetteProjet";


export default function ProjetsFavoris({ projets = []}) {
  return (
    <section id="liste_projetsFavoris">
      <h2>Mes Projets</h2>
      {projets.map((projet) => (
        <VignetteProjet
          key={projet._id}
          titre={projet.titre_projet}
          description={projet.description_projet}
          image={import.meta.env.VITE_API_URL + "/" + projet.image_projet}
          technos={projet.ListeTechnos}
        />
      ))}
      {/* <p className="plusDeProjets">Voir tous mes projets</p> */}
    </section>
  );
}
