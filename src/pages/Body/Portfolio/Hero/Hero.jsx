import "./hero.scss";
import Reseaux from "../../../components/Reseaux/Reseaux";
import { useState, useEffect } from "react";

export default function Hero() {
  const [widthWisdom, setWidthWisdom] = useState(null);

  useEffect(() => {
    setWidthWisdom(window.innerWidth);
  }, []);

  return (
    <section id="hero">
      <div className="containerImage">
        {widthWisdom < 480 ? (
          <img src="/avatar.webp" alt="Mon avatar pour le hero du portfolio" fetchPriority="high" />
        ) : (
          <img src="/avatarDesktop.webp" alt="Mon avatar pour le hero du portfolio" fetchPriority="high" />
        )}
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
