import logo from "../../../../../assets/avatar.png";
import "./bienvenueEdition.scss";

export default function BienvenueEdition() {
  return (
    <div className="container_bienvenu_edition">
      <img src={logo} alt="Image de l'avatar de yannick biot" />
      <p>Editeur de contenu</p>
    </div>
  );
}
