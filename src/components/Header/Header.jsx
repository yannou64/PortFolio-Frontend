import "./header.scss";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TbFileCv } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { MdEditSquare } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { GrProjects } from "react-icons/gr";

export default function Header({ menuChoice }) {
  const navigate = useNavigate();
  const iconeSize = 40;
  // constantes d'état pour les données admin si existe
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  // constantes pour cibler des éléments du DOM
  const burger = useRef();
  const burger_icone = useRef();
  const nav = useRef()

  async function logout() {
    try {
      const response = await fetch("http://localhost:3444/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        return navigate(`/ErrorPage/${data.message}`);
      }
      setRole("");
      setUsername("");
      menuChoice("");
      setRefresh((prev) => !prev);
    } catch (e) {
      navigate(`/ErrorPage/${e}`);
    }
  }

  // Gestion du bouton burger qui apparait lorsque le display à une largeur < 768 px
  useEffect(() => {
    // Lorsque on clique sur burger-menu, on déclenche une action sur .burger-icon (changement de forme) et nav (apparait ou disparait)
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

    //fonction pour réinitialiser le navigateur au resize
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

    const burgerEl = burger.current;

    // Avant d'ajouter un listener on vérifie que le composant à bien été chargé correctement
    if (burgerEl) {
      //Listener pour click sur bouton burger
      burgerEl.addEventListener("click", burgerClick);
    }

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

  // Récupération des données admin si existe
  useEffect(() => {
    try {
      const cookieToken = document.cookie.split("=")[1];
      const decoded = jwtDecode(cookieToken);
      setRole(decoded.role);
      console.log(decoded.role);
      setUsername(decoded.username);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return (
    // Si admin identifié on charge le style adminStyle
    <header className={role === "admin" ? "adminStyle" : ""}>
      {/* Pour accéder à la page login, on double clique sur le h1 */}
      <h1 onDoubleClick={() => navigate("/login")}>Yannick Biot</h1>
      {/* Le bouton burger est visible en dessous de 768 px */}
      <button ref={burger} id="burger-menu" aria-label="Menu principal" aria-expanded="false" aria-controls="main-nav">
        <span ref={burger_icone} className="burger-icon close">
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </span>
      </button>
      <nav ref={nav}>
        <ul>
          <li>
            <GrProjects
              id="menu_portfolio"
              className="icone"
              size={iconeSize - 6}
              onClick={(e) => menuChoice(e.currentTarget.id)}
            />
            <p>Consulter les projets</p>
          </li>
          <li>
            <TbFileCv
              id="menu_cv"
              className="logo_cv icone"
              size={iconeSize}
              onClick={(e) => menuChoice(e.currentTarget.id)}
            />
            <p>Télécharger mon CV</p>
          </li>
          {/* En cliquant sur les icone on va appeler la fonction menuChoice qui va render le composant associé  */}
          {role === "admin" && (
            <li>
              <MdEditSquare
                id="menu_edit"
                className="icone"
                size={iconeSize}
                onClick={(e) => menuChoice(e.currentTarget.id)}
              />
            </li>
          )}
          {role === "admin" && (
            <li>
              <IoMdLogOut id="menu_logout" className="icone" onClick={logout} size={iconeSize} />
            </li>
          )}
          {role !== "admin" && (
            <li>
              <TfiEmail
                id="menu_contact"
                className="icone"
                size={iconeSize}
                onClick={(e) => menuChoice(e.currentTarget.id)}
              />
              <p>Me contacter</p>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
