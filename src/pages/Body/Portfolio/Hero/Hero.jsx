import avatar from "../../../../assets/avatar.png";
import "./hero.scss";
import Reseaux from "../../../components/Reseaux/Reseaux";

export default function Hero() {
  return (
    <section id="hero">
      <div className="containerImage">
        <img src={avatar} alt="Mon avatar" />
      </div>
      <div id="accroche">
        <h1 className="titre">Développeur web junior</h1>
        <p className="texte">
          Passionné par le développement numérique, j’ai entamé ma reconversion en mars 2024. Curieux et motivé, j’adore
          coder et relever des défis. Envie de collaborer avec quelqu’un de positif et enthousiaste ? Parlons-en !
        </p>
        <div className="alerte">
          <div className="animation"></div>
          <p>Prêt pour de nouvelles opportunitées</p>
        </div>
        <Reseaux />
      </div>
    </section>
  );
}
