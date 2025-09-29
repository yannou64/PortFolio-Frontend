import "./projetsFavoris.scss";
import VignetteProjet from "./components/vignetteProjet/VignetteProjet";

export default function ProjetsFavoris({ projets = [] }) {
  return (
    <section id="liste_projetsFavoris">
      <h2>Mes Projets</h2>
      <div className="container_vignetteProjet">
        {projets.map((projet) => (
          <VignetteProjet
            key={projet._id}
            titre={projet.titre_projet}
            description={projet.description_projet}
            image={import.meta.env.VITE_API_URL + "/" + projet.image_projet}
            alt={projet.alt_img_projet}
            technos={projet.ListeTechnos}
          />
        ))}
      </div>
    </section>
  );
}
