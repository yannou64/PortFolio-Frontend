import "./coordonnees.css";
import {useState} from "react"
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
  const [numberPhone, setNumberPhone] = useState("")
  const [email, setEmail] = useState("")
  const [birthday, setBirthday] = useState("")
  const [nationalite, setNationalite] = useState("")
  const [permis, setPermis] = useState("")
  const [adresse, setAdresse] = useState("")
  const [linkLinkedin, setLinkLinkedin] = useState("")
  const [linkGithub, setLinkGithub] = useState("")
  const [linkPortfolio, setLinkPortfolio] = useState("")

  async function fetchDatas(){
    // On récupère les données de la base de donnée
    
  }

  return (
    <div id="coordonneesForm">
      <form>
        <div className="formRow">
          <FaPhoneVolume size={24} />
          <input className="input" type="text" placeholder="Numéro de téléphone" required />
        </div>
        <div className="formRow">
          <MdAlternateEmail size={24} />
          <input className="input" type="email" placeholder="email" required />
        </div>
        <div className="formRow">
          <FaBirthdayCake size={24} />
          <input className="input" type="text" placeholder="Date de naissance" required />
        </div>
        <div className="formRow">
          <IoFlagSharp size={24} />
          <input className="input" type="text" placeholder="Nationalité" required />
        </div>
        <div className="formRow">
          <FaCar size={24} />
          <input className="input" type="text" placeholder="Permis" required />
        </div>
        <div className="formRow">
          <MdOutlineWhereToVote size={24} />
          <input className="input" type="text" placeholder="Adresse" required />
        </div>
        <div className="formRow">
          <FaLinkedin size={24} />
          <input className="input" type="text" placeholder="Lien linkedin" required />
        </div>
        <div className="formRow">
          <FaGithub size={24} />
          <input className="input" type="text" placeholder="Lien github" required />
        </div>
        <div className="formRow">
          <FaInternetExplorer size={24} />
          <input className="input" type="text" placeholder="Lien portfolio" required />
        </div>
        <button id="submitButton"><GrUpdate size={40}/></button>
      </form>
    </div>
  );
}
