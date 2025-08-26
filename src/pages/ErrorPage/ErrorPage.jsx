import { useParams, useNavigate } from "react-router-dom";
import "./errorPage.scss";

export default function ErrorPage() {
  const { message } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container_errorPage">
      <div className="box">
        <div>Erreur : {message}</div>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Retour
        </button>
      </div>
    </div>
  );
}
