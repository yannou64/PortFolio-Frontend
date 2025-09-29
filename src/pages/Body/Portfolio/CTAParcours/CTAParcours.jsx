import "./CTAParcours.scss";
import MyButton from "../components/MyButton/MyButton.jsx";
import photoId from "../../../../assets/photoIdentite.png";

// erratum
export default function CTAParcours() {
  const cvUrl = "/Documents/cv-yannick-biot.pdf";
  
  return (
    <section id="CTAParcours">
      <h2>Mon parcours</h2>
      <div className="Description_parcours">
        <div className="photoId">
          <img src={photoId} alt="Photo d'identité de yannick biot" loading="lazy"/>
        </div>
        <ul>
          <li>
            <strong>2025 - </strong>RNCP Développeur Web Full Stack
          </li>
          <li>
            <strong>2003 -</strong> DUT Technique Commercial
          </li>
          <li>
            <strong>2002 -</strong> DUT Génie Electrique Info Industriel
          </li>
        </ul>
      </div>
      <MyButton lien={cvUrl} rel="noopener noreferrer" titre="En savoir +" className="myButton" />
    </section>
  );
}
