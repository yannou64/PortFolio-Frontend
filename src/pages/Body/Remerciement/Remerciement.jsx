import "./remerciement.scss"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react"
import myAvatar from "../../../assets/avatar.webp"


export default function Remerciement(){
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            navigate("/")
        }, 3000)
    }, [navigate])

    return (
        <div className="container_remerciement">
            <img src={myAvatar} alt="Avatar du propriétaire de l'application web" />
            <h1>Merci beaucoup, je vous recontacte rapidement.</h1>
        </div>
    )
}