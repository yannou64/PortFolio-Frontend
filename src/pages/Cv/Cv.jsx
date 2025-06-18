import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import "./cv.css"


export default function Cv() {
  const [redirect, setRedirect] = useState(false)
  // Je récupère mon username
  const username = localStorage.getItem("username")
  console.log(document.cookie)
  async function fetchData(){
    // je fais une demande de données pour le cv, si ok status 200, sinon rediriger vers le login avec un message "vous devez vous reconnecter"
    try {
      const response = await fetch("http://localhost:3444/cv", {
        credentials: "include"
      })
      if(!response.ok) setRedirect(true)

      const data = await response.json()
      console.log(response.status)
      console.log(data.message)
  
    } catch (e) {
      console.log("Demande de données pour cv echoué : ", e)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])

  if(redirect) return <Navigate to="/ErrorPage/Vous n'ête pas identifié" replace/>

  return (
    <div className="container">
      <Header/>
      <p>{username}</p>
    </div>
  );
}
