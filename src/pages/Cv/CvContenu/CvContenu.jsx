import "./cvContenu.scss";
import photo from "../../../assets/photoIdentite.png";
import { useEffect, useState } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { IoFlagSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { MdOutlineWhereToVote } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInternetExplorer } from "react-icons/fa6";

export default function CvContenu() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [coordonnees, setCoordonnees] = useState("");
  const [interets, setInterets] = useState([])
  const [langues, setLangues] = useState([])

  // Récupérer les coordonnées
  async function getCoordonnees() {
    try {
      const response = await fetch(`${API_URL}/cv/coordonnees`);
      const data = await response.json();
      if(response.ok){
        setCoordonnees(data.data);
      } else {
        console.log(data.message)
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  // Récupérer les centres d'intérêts
  async function getInterets(){
    try {
      const response = await fetch(`${API_URL}/cv/interets`)
      const data = await response.json()
      if(response.ok){
        setInterets(data.data)
      } else {
        console.log(data.message)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  // Récupérer les langues
  async function getLangues(){
    try{
      const response = await fetch(`${API_URL}/cv/langues`)
      const data = await response.json()
      if(response.ok){
        setLangues(data.data)
      } else {
        console.log(data.message)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getCoordonnees();
    getInterets()
    getLangues()
  }, []);

  return (
    <div id="cvContainer">
      <div id="columnRight">
        <img id="photoIdentite" src={photo} alt="photo d'identité" />
        <div id="coordonnees">
          <h2>Coordonnées</h2>
          <div className="alignItemCoordonnees">
            <FaPhoneVolume />
            <div>{coordonnees.numberPhone}</div>
          </div>
          <div className="alignItemCoordonnees">
            <MdAlternateEmail />
            <div >{coordonnees.email}</div>
          </div>
          <div className="alignItemCoordonnees">
            <FaBirthdayCake />
            <div>{coordonnees.birthday}</div>
          </div>
          <div className="alignItemCoordonnees">
            <IoFlagSharp />
            <div>{coordonnees.nationalite}</div>
          </div>
          <div className="alignItemCoordonnees">
            <FaCar />
            <div>{coordonnees.permis}</div>
          </div>
          <div className="alignItemCoordonnees">
            <MdOutlineWhereToVote />
            <div>{coordonnees.adresse}</div>
          </div>
          <div className="alignItemCoordonnees">
            <FaLinkedin />
            <a href={coordonnees.linkLinkedin} target="blank">mon linkedin</a>
          </div>
          <div className="alignItemCoordonnees">
            <FaGithub />
            <a href={coordonnees.linkGithub} target="blank">mon Github</a>
          </div>
          <div className="alignItemCoordonnees">
            <FaInternetExplorer />
            <a href={coordonnees.linkPorfolio} target="blank">mon Portfolio</a>
          </div>
        </div>
        <div id="centreInteret" className="w-full">
        <h2>Centres d'intérêts</h2>
        <ul >
          {interets.map(interet => <li>{interet.interet}</li>)}
        </ul>
        </div>
        <div id="langues" className="w-full">
          <h2>Langues</h2>
          <ul>
            {langues.map(langue => <li>{langue.langue} : {langue.level}</li>)}
          </ul>
        </div>
      </div>
      <div id="blocCenter"></div>
    </div>
  );
}
