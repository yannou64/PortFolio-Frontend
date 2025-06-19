import "./header.css"
import { useNavigate } from "react-router-dom"
import EditBtn from "./EditBtn/EditBtn.jsx"


export default function Header({username, role, triggerEditMode, editMode}){
    const navigate = useNavigate()
    
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
            <EditBtn role={role} editMode={editMode} triggerEditMode={triggerEditMode}/>
            <h1 className="text-white text-2xl">{username}</h1>
            <button onClick={logout}>Logout</button>
        </header>
    )
}