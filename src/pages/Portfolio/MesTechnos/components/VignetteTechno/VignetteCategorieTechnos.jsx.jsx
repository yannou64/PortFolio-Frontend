import "./vignetteTechno.scss";
import { useRef, useEffect } from "react";

export default function VignetteCategorieTechnos({ categorie, listeTechnos = [] }) {
  const technos = useRef(null);

  useEffect(() => {
    // nettoyer
    technos.current.innerHTML = "";

    // création manuelle du contenu pour chaque categories
    for (const techno of listeTechnos) {
      // création de tous les éléments avec leurs class et leurs contenues
      const techno_container = document.createElement("div");
      techno_container.classList.add("techno_container");
      const logo_container = document.createElement("div");
      logo_container.classList.add("logo_container");
      const logo = document.createElement("img");
      logo.setAttribute("src", `${import.meta.env.VITE_API_URL}/${techno.image}`);
      logo.setAttribute("alt", techno.alt_img);
      const titre = document.createElement("p");
      titre.textContent = techno.titre;
      const niveau = document.createElement("p");
      niveau.textContent = techno.niveau;
      // construction
      techno_container.appendChild(logo_container);
      technos.current.appendChild(techno_container);
      techno_container.appendChild(titre);
      techno_container.appendChild(niveau);
      logo_container.appendChild(logo);
    }
  }, [listeTechnos]);

  return (
    <div className="vignetteCategorieTechnos">
      <h3>{categorie}</h3>
      <div className="technos" ref={technos}>
        {/* <div className="techno_container">
          <div className="logo_container">
            <img src="" alt="" />
          </div>
          <p></p>
          <p></p>
        </div> */}
      </div>
    </div>
  );
}
