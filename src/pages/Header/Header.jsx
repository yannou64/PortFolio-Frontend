import "./header.scss";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TbFileCv } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import cvUrl from "../../../public/Documents/cv-yannick-biot.pdf?url";

export default function Header() {
  ////
  // Variables
  ////
  const iconeSize = 40;
  const navigate = useNavigate();

  ////
  // Gestion isAdmin
  ////
  const { isAdmin } = useContext(AuthContext);

  ////
  // Gestion comportement header
  // Animation burger : dépend de la classe open, toggle en appuyant et initialisation au changement d'état de isMobile
  // Style header : change en fonction de isAdmin
  // Nav : display none ou flex, en fonction de la taille : toujours flex si desktop, toggle sur mobile en fonction clic sur menu burger
  ////

  // On garde un oeil sur la taille de l'écran avec widhDevice
  const [widthDevice, setWidthDevice] = useState(() => window.innerWidth);
  // Listener : met à jour widthDevice au resize
  useEffect(() => {
    const onResize = () => setWidthDevice(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // En fonction de widthDevice et de isAdmin, on défini le style du header et on vérifie si on est sur mobile
  const mobile = 479;
  const [isMobile, setIsMobile] = useState(widthDevice < mobile);
  const myHeader = useRef();

  useEffect(() => {
    if (widthDevice < mobile) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    if (isAdmin) {
      headerStyle("admin");
    } else {
      headerStyle("user");
    }
  }, [widthDevice, isAdmin]);

  function headerStyle(style) {
    const el = myHeader.current;
    if (!el) return; // Pour régler des problème avec classList quand les élements n'existe pas
    switch (style) {
      case "admin":
        el.classList.add("adminStyle");
        break;
      default:
        el.classList.remove("adminStyle");
    }
  }

  ////
  // Gestion du MenuBurger et de l'affichage du navigateur
  ////
  const [isMenuBurgerOpen, setIsMenuBurgerOpen] = useState(false);
  const burger_icone = useRef();
  const nav = useRef();

  // Initialisation du menuBurger et du navigateur à chaque changement d'état de isMobile
  useEffect(() => {
    burger_icone.current.classList.remove("open");
    if (isMobile) {
      nav.current.style.display = "none";
    } else {
      nav.current.style.display = "flex";
    }
  }, [isMobile]);

  // Animation du menuBurger et gestion de l'affichage du navigateur à chaque clique sur le menu
  function handleBurgerMenu() {
    setIsMenuBurgerOpen(!isMenuBurgerOpen);
    if (isMobile) {
      burger_icone.current.classList.toggle("open");
      if (burger_icone.current.classList.contains("open")) {
        nav.current.style.display = "flex";
      } else {
        nav.current.style.display = "none";
      }
    }
  }

  ////
  // Gestion du cas ou un Admin n'est pas sur desktop
  ////
  const desktop = 1000;

  if (widthDevice < desktop && isAdmin) {
    return <Navigate to="/logout" replace />;
  }

  ////
  // Rendu du composant
  ///

  return (
    // Si admin identifié on charge le style adminStyle
    <header ref={myHeader}>
      {/* Pour accéder à la page login, on double clique sur le h1 */}
      <button id="logo" onDoubleClick={() => !isMobile && navigate("/login")}>
        <a
          href="#hero"
          onClick={() => {
            isMenuBurgerOpen && handleBurgerMenu();
            navigate("/");
          }}
        >
          Yannick Biot
        </a>
      </button>
      {/* Le bouton burger est visible en dessous de 768 px */}
      <button id="burger-menu" onClick={handleBurgerMenu}>
        <span ref={burger_icone} className="burger-icone">
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </span>
      </button>
      {/* En cliquant sur les icones on va appeler la fonction menuChoice qui va render le composant associé à l'id de l'icone */}
      <nav ref={nav}>
        <ul>
          {/* Projets */}
          {!isAdmin && (
            <li onClick={handleBurgerMenu} title="Mes projets">
              <a href="#liste_projetsFavoris">
                <LuBriefcaseBusiness id="menu_portfolio" className="icone" size={iconeSize} />
                <p>Projets réalisés</p>
              </a>
            </li>
          )}
          {/* Technos */}
          {!isAdmin && (
            <li onClick={handleBurgerMenu} title="Ma Stack">
              <a href="#MesTechnos">
                <FaCode id="menu_portfolio" className="icone" size={iconeSize - 6} />
                <p>Stack technique</p>
              </a>
            </li>
          )}
          {/* CV */}
          {!isAdmin && (
            <li onClick={handleBurgerMenu} title="Mon CV">
              <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                <TbFileCv
                  id="menu_cv"
                  className="logo_cv icone"
                  alt="Lien vers le telechargement de CV"
                  size={iconeSize}
                />
                <p>Parcours</p>
              </a>
            </li>
          )}
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
            <li onClick={handleBurgerMenu} title="Me Contacter">
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
