import "./header.css"
import { useNavigate } from "react-router-dom"

export default function Header(){
    const navigate = useNavigate()

    async function logout(){
        try {
            const response = await fetch("http://localhost:3444/auth/logout", {
                method: "POST",
                credentials: "include"
            })
            
            const data = await response.json()
            if(!response.ok) return navigate(`/ErrorPage/${data.message}`)

            navigate(`/login`)
        } catch (e) {
            navigate(`/ErrorPage/${e}`)
        }
    }

    return(
        <header>
            <button>Edit</button>
            <button onClick={logout}>Logout</button>
        </header>
    )
}