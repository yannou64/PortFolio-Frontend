import "./hero.scss";
import Reseaux from "../../../components/Reseaux/Reseaux";

export default function Hero() {
  return (
    <section id="hero">
      <div className="containerImage">
        <img src="/avatar.webp" alt="Mon avatar pour le hero du portfolio" fetchPriority="high" />
      </div>
      <div id="accroche">
        <h1 className="titre">Développeur web</h1>
        <p className="texte">
          Passionné par le développement numérique, j’ai entamé ma reconversion en mars 2024. Curieux et motivé, j’adore
          coder et relever des défis. Envie de collaborer avec quelqu’un de positif et enthousiaste ? Parlons-en !
        </p>
        <div className="alerte">
          <div className="animation"></div>
          <div>Prêt pour de nouvelles opportunités</div>
        </div>
        <Reseaux />
      </div>
    </section>
  );
}
