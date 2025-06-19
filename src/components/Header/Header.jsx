import "./header.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

export default function Header({username}){
    const navigate = useNavigate()
    const [role, setRole] = useState("")
    const [token, setToken] = useState("")
   
    
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

    useEffect(()=>{
         setToken(document.cookie.split("=")[1])
    }, [])

    useEffect(() => {
        if(token){
            const decoded = jwtDecode(token)
            setRole(decoded.role)
        }
    }, [token])

    return(
        <header>
            
            {role === "admin" ? <button>Edit</button> : <button>Me contacter</button>}
            <h1 className="text-white text-2xl">{username}</h1>
            <button onClick={logout}>Logout</button>
        </header>
    )
}