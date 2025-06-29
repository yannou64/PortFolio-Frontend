import "./header.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbFileCv } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { MdEditSquare } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { GrProjects } from "react-icons/gr";



export default function Header({menuChoice}) {
  const navigate = useNavigate();
  const iconeSize = 40;
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [refresh, setRefresh] = useState(true);

  async function logout() {
    try {
      const response = await fetch("http://localhost:3444/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) return navigate(`/ErrorPage/${data.message}`);
      setRole("");
      setUsername("");
      menuChoice("")
      setRefresh((prev) => !prev);
    } catch (e) {
      navigate(`/ErrorPage/${e}`);
    }
  }

  useEffect(() => {
    try {
      const cookieToken = document.cookie.split("=")[1];
      const decoded = jwtDecode(cookieToken);
      setRole(decoded.role);
      console.log(decoded.role);
      setUsername(decoded.username);
    } catch (e) {
      console.log(e.message);
    }
  }, [refresh]);

  return (
    <header className={role === "admin" && "adminStyle"}>
      <h1 onDoubleClick={() => navigate("/login")}>Yannick Biot</h1>
      <nav>
        <ul>
          <li>
            <GrProjects id="menu_portfolio" className="icone" size={iconeSize-6} onClick={(e) => menuChoice(e.currentTarget.id)}/>
          </li>
          <li>
            <TbFileCv id="menu_cv" className="logo_cv icone" size={iconeSize} onClick={(e) => menuChoice(e.currentTarget.id)}/>
          </li>
          {/* En cliquant sur les icone on va appeler la fonction menuChoice qui va render le composant associé  */}
          {role === "admin" && <li><MdEditSquare id="menu_edit" className="icone" size={iconeSize} onClick={(e) => menuChoice(e.currentTarget.id)}/></li>}
          {role === "admin" && <li><IoMdLogOut id="menu_logout" className="icone" onClick={logout} size={iconeSize} /></li>}
          {role !== "admin" && <li><TfiEmail id="menu_contact" className="icone" size={iconeSize} onClick={(e) => menuChoice(e.currentTarget.id)}/></li>}
        </ul>
      </nav>
    </header>
  );
}
