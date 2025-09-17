import "./footer.scss"
import Reseaux from "../components/Reseaux/Reseaux"
import {useNavigate} from "react-router-dom"

export default function Footer(){
    const navigate = useNavigate()

    return (
        <footer>
            <p>Biot Yannick | 2025 -   <a href="" onClick={()=>navigate("/conditionsGenerales")}>Conditions Générales</a></p>
            <Reseaux dark={true}/>
          
            <div>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div>
        </footer>
    )
}