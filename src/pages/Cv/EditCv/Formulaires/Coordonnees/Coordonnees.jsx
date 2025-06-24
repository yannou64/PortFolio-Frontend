import "./coordonnees.scss";
import { useState, useEffect } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { IoFlagSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { MdOutlineWhereToVote } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInternetExplorer } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";

export default function Coordonnees() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [id, setId] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nationalite, setNationalite] = useState("");
  const [permis, setPermis] = useState("");
  const [adresse, setAdresse] = useState("");
  const [linkLinkedin, setLinkLinkedin] = useState("");
  const [linkGithub, setLinkGithub] = useState("");
  const [linkPortfolio, setLinkPortfolio] = useState("");

  // Fetch initial pour récupérer les données et hydrater nos imputs
  async function fetchInitialDatas() {
    // On récupère les données de la base de donnée
    try {
      const response = await fetch(`${API_URL}/cv/coordonnees`);
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }
      setId(data.data._id);
      console.log(data.data._id);
      setNumberPhone(data.data.numberPhone || "");
      setEmail(data.data.email || "");
      setBirthday(data.data.birthday || "");
      setNationalite(data.data.nationalite || "");
      setPermis(data.data.permis || "");
      setAdresse(data.data.adresse || "");
      setLinkLinkedin(data.data.linkLinkedin || "");
      setLinkGithub(data.data.linkGithub || "");
      setLinkPortfolio(data.data.linkPortfolio || "");
    } catch (e) {
      console.log("Erreur de fetchDatas Coordonnees : ", e);
    }
  }

  // Fetch update
  async function fetchUpdateDatas() {
    try {
      const response = await fetch(`${API_URL}/cv/coordonnees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numberPhone,
          email,
          birthday,
          nationalite,
          permis,
          adresse,
          linkLinkedin,
          linkGithub,
          linkPortfolio,
        }),
      });
      const data = await response.json();
      console.log(data.message)
    } catch (e) {
      console.log("Problème sur le front pour le fetch update : ", e);
    }
  }

  // Je click sur logo update
  function onSubmit(e) {
    e.preventDefault();
    fetchUpdateDatas();
  }

  // Code générer au chargement du composant
  useEffect(() => {
    fetchInitialDatas();
  }, []);

  return (
    <div id="coordonneesForm">
      <form onSubmit={onSubmit}>
        <div className="formRow">
          <FaPhoneVolume size={24} />
          <input
            onChange={(e) => setNumberPhone(e.target.value)}
            className="input"
            type="text"
            placeholder="Numéro de téléphone"
            value={numberPhone}
          />
        </div>
        <div className="formRow">
          <MdAlternateEmail size={24} />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            placeholder="email"
            value={email}
          />
        </div>
        <div className="formRow">
          <FaBirthdayCake size={24} />
          <input
            onChange={(e) => setBirthday(e.target.value)}
            className="input"
            type="text"
            placeholder="Date de naissance"
            value={birthday}
          />
        </div>
        <div className="formRow">
          <IoFlagSharp size={24} />
          <input
            onChange={(e) => setNationalite(e.target.value)}
            className="input"
            type="text"
            placeholder="Nationalité"
            value={nationalite}
          />
        </div>
        <div className="formRow">
          <FaCar size={24} />
          <input
            onChange={(e) => setPermis(e.target.value)}
            className="input"
            type="text"
            placeholder="Permis"
            value={permis}
          />
        </div>
        <div className="formRow">
          <MdOutlineWhereToVote size={24} />
          <input
            onChange={(e) => setAdresse(e.target.value)}
            className="input"
            type="text"
            placeholder="Adresse"
            value={adresse}
          />
        </div>
        <div className="formRow">
          <FaLinkedin size={24} />
          <input
            onChange={(e) => setLinkLinkedin(e.target.value)}
            className="input"
            type="text"
            placeholder="Lien linkedin"
            value={linkLinkedin}
          />
        </div>
        <div className="formRow">
          <FaGithub size={24} />
          <input
            onChange={(e) => setLinkGithub(e.target.value)}
            className="input"
            type="text"
            placeholder="Lien github"
            value={linkGithub}
          />
        </div>
        <div className="formRow">
          <FaInternetExplorer size={24} />
          <input
            onChange={(e) => setLinkPortfolio(e.target.value)}
            className="input"
            type="text"
            placeholder="Lien portfolio"
            value={linkPortfolio}
          />
        </div>
        <button id="submitButton">
          <GrUpdate size={40} />
        </button>
      </form>
    </div>
  );
}
