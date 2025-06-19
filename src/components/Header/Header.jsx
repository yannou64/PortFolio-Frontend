import "./header.css"
import { useNavigate, useState } from "react-router-dom"


export default function Header({username, role}){
    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)
    
    async function logout(){
        try {
            const response = await fetch("http://localhost:3444/auth/logout", {
                method: "POST",
                credentials: "include"
            })
            
            const data = await response.json()
            if(!response.ok) return navigate(`/ErrorPage/${data.message}`)

            localStorage.clear()

            navigate(`/login`)
        } catch (e) {
            navigate(`/ErrorPage/${e}`)
        }
    }

    return(
        <header>
            {role === "admin" ? <button onClick={()=> setEditMode(true)}>Edit</button> : <button>Me contacter</button>}
            <h1 className="text-white text-2xl">{username}</h1>
            <button onClick={logout}>Logout</button>
        </header>
    )
}