import "./mesTechnos.scss";
import VignetteTechno from "./components/VignetteTechno/VignetteCategorieTechnos.jsx";

export default function MesTechnos({ technosByCategorie = [] }) {
  return (
    <section id="MesTechnos">
      <h2>Ma Stack</h2>
      {technosByCategorie.map((categorieAndHisTechnos, index) => (
        <VignetteTechno key={index} categorie={categorieAndHisTechnos.categorie} listeTechnos={categorieAndHisTechnos.technos} />
      ))}
    </section>
  );
}
