import "./remerciement.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Remerciement() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(()=>{
        navigate("/")
    }, 3000)
  }, []);

  return (
    <div className="container_remerciement">
      <div className="image_container">
        <img src="/avatar.webp" alt="Avatar du propriétaire de l'application web" loading="lazy"/>
      </div>
      <h1>Merci beaucoup, je vous recontacte rapidement.</h1>
    </div>
  );
}
