import { useParams, useNavigate} from "react-router-dom"
import "./errorPage.css"

export default function ErrorPage(){
    const {error} = useParams()
    const navigate = useNavigate()

    return (
        <div className="container">
            <div>Erreur : {error}</div>
            <button className="btn btn-primary" onClick={()=>navigate("/login")}>Retour</button>
        </div>
    )
}