import "./header.scss";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Pour la certification je n'utiliserais pas les Link pour garder une sémantique html plus visible
import { TbFileCv } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { GiStarsStack } from "react-icons/gi";
import { GrProjects } from "react-icons/gr";
import { getIsAdmin, subscribeToAuth } from "../../auth.js";

export default function Header() {
  const navigate = useNavigate();
  const iconeSize = 40;
  const mobileDevice = 479;
  // constante d'identification
  const [isAdmin, setIsAdmin] = useState(getIsAdmin());
  // constantes pour cibler des éléments du DOM
  const burger = useRef();
  const burger_icone = useRef();
  const nav = useRef();

  ////
  // Fonction de gestion du comportement du navigateur sur mobile
  ///
  function toggle_MenuBurger_NavVisibility() {
    const is_icone_burger_open = burger_icone.current.classList.contains("open");
    // vérifie d'abord si on est sur mobile ($mobileDevice), sinon aucune action
    if (window.innerWidth < mobileDevice) {
      if (!is_icone_burger_open) {
        burger_icone.current.classList.remove("close");
        burger_icone.current.classList.add("open");
        nav.current.style.display = "flex";
      } else {
        burger_icone.current.classList.remove("open");
        burger_icone.current.classList.add("close");
        nav.current.style.display = "none";
      }
    }
  }

  ////
  // Gestion du navigateur si resize de la fenêtre : résoudre le bug ou le nav est display: none après un resize
  ////
  // On écoute à chaque resize
  window.addEventListener("resize", checkDisplayNavigateur);

  // Fonction de réinitialisation du navigateur si Resize détecté
  function checkDisplayNavigateur() {
    console.log("test");
    if (window.innerWidth > mobileDevice) {
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
  }

  ////
  // Gestion de isAdmin
  ////
  useEffect(() => {
    // Ajoute le isAdmin à listeners (auth.js) pour provoquer le re-render de ce composant si isAdmin change d'état
    subscribeToAuth(setIsAdmin);
  }, []);

  ////
  // Installation du listener sur le menu burger
  ////
  useEffect(() => {
    // Avant d'ajouter un listener on vérifie que le composant à bien été chargé correctement
    const burgerEl = burger.current;
    if (burgerEl) {
      //Listener pour click sur bouton burger
      burgerEl.addEventListener("click", toggle_MenuBurger_NavVisibility);
    }

    // Cleanup pour éviter les doublons
    return () => {
      if (burgerEl) {
        burgerEl.removeEventListener("click", toggle_MenuBurger_NavVisibility);
      }
      window.removeEventListener("resize", checkDisplayNavigateur);
    };
  }, []);

  return (
    // Si admin identifié on charge le style adminStyle
    <header className={isAdmin === true ? "adminStyle" : ""}>
      {/* Pour accéder à la page login, on double clique sur le h1 */}
      <h1 onDoubleClick={() => navigate("/login")}>
        <a
          href="#hero"
          onClick={() => burger_icone.current.classList.contains("open") && toggle_MenuBurger_NavVisibility()}
        >
          Yannick Biot
        </a>
      </h1>
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
          {/* Projets */}
          <li onClick={() => toggle_MenuBurger_NavVisibility()}>
            <a href="#liste_projetsFavoris">
              <GrProjects id="menu_portfolio" className="icone" size={iconeSize - 6} />
              <p>Projets réalisés</p>
            </a>
          </li>
          {/* Technos */}
          <li onClick={() => toggle_MenuBurger_NavVisibility()}>
            <a href="#MesTechnos">
              <GiStarsStack id="menu_portfolio" className="icone" size={iconeSize - 6} />
              <p>Stack technique</p>
            </a>
          </li>
          {/* CV */}
          <li onClick={() => toggle_MenuBurger_NavVisibility()}>
            <a href="../../public/Documents/cv-yannick-biot.pdf" target="_blank">
              <TbFileCv
                id="menu_cv"
                className="logo_cv icone"
                alt="Lien vers le telechargement de CV"
                size={iconeSize}
              />
              <p>Parcours</p>
            </a>
          </li>
          {/* Edition */}
          {isAdmin === true && (
            <li onClick={() => navigate("/edition")}>
              <a href=""></a>
              <MdEditSquare id="menu_edit" className="icone" size={iconeSize} />
            </li>
          )}
          {/* Logout */}
          {isAdmin === true && (
            <li onClick={() => navigate("/logout")}>
              <IoMdLogOut id="menu_logout" className="icone" size={iconeSize} />
            </li>
          )}
          {/* Contact */}
          {isAdmin !== true && (
            <li onClick={() => toggle_MenuBurger_NavVisibility()}>
              <a href="#Contact">
                <TfiEmail id="menu_contact" className="icone" size={iconeSize} />
                <p>Me contacter</p>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
