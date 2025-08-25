import "./header.scss";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Pour la certification je n'utiliserais pas les Link pour garder une sémantique html plus visible
import { TbFileCv } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { GrProjects } from "react-icons/gr";
import { getIsAdmin, subscribeToAuth } from "../auth.js";

export default function Header() {
  const navigate = useNavigate();
  const iconeSize = 40;

  // constante d'identification
  const [isAdmin, setIsAdmin] = useState(getIsAdmin());

  // constantes pour cibler des éléments du DOM
  const burger = useRef();
  const burger_icone = useRef();
  const nav = useRef();

  // Gestion de isAdmin
  useEffect(() => {
    // Ajoute le isAdmin à listeners (auth.js) pour provoquer le re-render de ce composant si isAdmin change d'état
    subscribeToAuth(setIsAdmin);
  }, []);

  // Gestion du bouton burger qui apparait sur mobile
  useEffect(() => {
    // Clique #burger-menu (mobile): on déclenche une action sur .burger-icon (changement de forme) et nav (apparait ou disparait)
    const burgerClick = () => {
      // Par défaut icone_burger possède la class "close", la class change en "open" au premier clique et vice versa ensuite
      // Au clique on vérifie si burger_icone à la class "open" pour adapter le comportement de nav et burger_icone
      const is_icone_burger_open = burger_icone.current.classList.contains("open");
      if (!is_icone_burger_open) {
        burger_icone.current.classList.remove("close");
        burger_icone.current.classList.add("open");
        nav.current.style.display = "flex";
      } else {
        burger_icone.current.classList.remove("open");
        burger_icone.current.classList.add("close");
        nav.current.style.display = "none";
      }
    };

    // Avant d'ajouter un listener on vérifie que le composant à bien été chargé correctement
    const burgerEl = burger.current;
    if (burgerEl) {
      //Listener pour click sur bouton burger
      burgerEl.addEventListener("click", burgerClick);
    }

    // Resize : pour réinitialiser le navigateur au resize
    const checkDisplayNavigateur = () => {
      console.log("test");
      if (window.innerWidth > 768) {
        document.querySelector("nav").style.display = "flex";
      } else {
        const burgerIcon = document.querySelector(".burger-icon");
        const isOpen = burgerIcon.classList.contains("open");
        if (isOpen) {
          burgerIcon.classList.remove("open");
          burgerIcon.classList.add("close");
          document.querySelector("nav").style.display = "none";
        } else {
          document.querySelector("nav").style.display = "none";
        }
      }
    };
    // listener pour le resizing afin de résoudre le bug ou le nav est display: none apèrs un resize
    window.addEventListener("resize", checkDisplayNavigateur);

    // Cleanup pour éviter les doublons
    return () => {
      if (burgerEl) {
        burgerEl.removeEventListener("click", burgerClick);
      }
      window.removeEventListener("resize", checkDisplayNavigateur);
    };
  }, []);

  return (
    // Si admin identifié on charge le style adminStyle
    <header className={isAdmin === true ? "adminStyle" : ""}>
      {/* Pour accéder à la page login, on double clique sur le h1 */}
      <h1 onDoubleClick={() => navigate("/login")}>Yannick Biot</h1>
      {/* Le bouton burger est visible en dessous de 768 px */}
      <button ref={burger} id="burger-menu">
        <span ref={burger_icone} className="burger-icon close">
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </span>
      </button>
      {/* En cliquant sur les icones on va appeler la fonction menuChoice qui va render le composant associé à l'id de l'icone */}
      <nav ref={nav}>
        <ul>
          <li>
            <GrProjects
              id="menu_portfolio"
              className="icone"
              size={iconeSize - 6}
              onClick={() => navigate("/portfolio")}
            />
            <p>Consulter les projets</p>
          </li>
          <li>
            <a href="../../public/Documents/cv-yannick-biot.pdf" target="_blank">
              <TbFileCv
                id="menu_cv"
                className="logo_cv icone"
                alt="Lien vers le telechargement de CV"
                size={iconeSize}
              />
            </a>
            <p>Télécharger mon CV</p>
          </li>
          {isAdmin === true && (
            <li>
              <a href=""></a>
              <MdEditSquare id="menu_edit" className="icone" size={iconeSize} onClick={() => navigate("/edition")} />
            </li>
          )}
          {isAdmin === true && (
            <li>
              <IoMdLogOut id="menu_logout" className="icone" size={iconeSize} onClick={() => navigate("/logout")} />
            </li>
          )}
          {isAdmin !== true && (
            <li>
              <TfiEmail id="menu_contact" className="icone" size={iconeSize} onClick={() => navigate("/contact")} />
              <p>Me contacter</p>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
