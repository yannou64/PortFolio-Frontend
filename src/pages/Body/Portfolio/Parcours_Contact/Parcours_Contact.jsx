import "./parcours_Contact.scss";
import Contact from "../../Contact/Contact";
import CTAParcours from "../CTAParcours/CTAParcours";
import { FcRotateToPortrait } from "react-icons/fc";

export default function Parcours_Contact() {
  return (
    <div className="container_pc">
      <div className="container_p">
        <CTAParcours />
      </div>
      <div className="container_c">
        <Contact />
      </div>
      <div className="portraitModeIndicator">
        <FcRotateToPortrait size={150}/>
        <p>Passez en mode portrait.</p>
      </div>
    </div>
  );
}
