import "./footer.scss"
import Reseaux from "../components/Reseaux/Reseaux"

export default function Footer(){
    return (
        <footer>
            <p>Biot Yannick | 2025</p>
            <Reseaux dark={true}/>
            <div>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div>
        </footer>
    )
}