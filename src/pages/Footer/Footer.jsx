import "./footer.scss";
import Reseaux from "../components/Reseaux/Reseaux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Footer() {
  const navigate = useNavigate();
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // setYear(new Date().getFullYear())
  }, []);

  return (
    <footer>
      <p>
        Biot Yannick | {year} - <a onClick={() => navigate("/conditionsGenerales")}>Conditions Générales</a>
      </p>
      <Reseaux dark={true} />

      <div>
        Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0
      </div>
    </footer>
  );
}
