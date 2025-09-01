import "./footer.scss"
import Reseaux from "../components/Reseaux/Reseaux"

export default function Footer(){
    return (
        <footer>
            <p>Biot Yannick | 2025</p>
            <Reseaux dark={true}/>
        </footer>
    )
}