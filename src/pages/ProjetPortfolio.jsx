import "./projetPortfolio.scss";
import CvContenu from "./Cv/CvContenu/CvContenu.jsx";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header.jsx";
import Portfolio from "./Portfolio/Portfolio.jsx";
import EditCv from "./Cv/EditCv/EditCv.jsx"
import Contact from "./Contact/Contact.jsx";

export default function Cv() {
  const [choice, setChoice] = useState("")

  function iconeMenuClicked(choice) {
    setChoice(choice)
    console.log(choice);
  }

  useEffect(()=>{
    
  }, [])

  return (
    <div className="container">
      <Header menuChoice={iconeMenuClicked} />
      {choice === "menu_edit" && <EditCv />}
      {choice === "menu_cv" && <CvContenu />}
      {choice === "menu_contact" && <Contact />}
      {(choice === "" || choice === "menu_portfolio" )&& <Portfolio />}

    </div>
  );
}
