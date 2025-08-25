import "./techno.scss";
import { useState, useEffect } from "react";
import { FaFileDownload } from "react-icons/fa";
import apercuDefault from "../../../../assets/noImage.jpg";
import Item from "../../components/Item/Item";

export default function Techno() {
  const [updateMode, setUpdateMode] = useState(false);
  const [techno, setTechno] = useState("");
  const [categorie, setCategorie] = useState("");
  const [level, setLevel] = useState("");
  const [allTechnos, setAllTechnos] = useState([]);
  const [technoIdToUpdate, setTechnoIdToUpdate] = useState("");

  const [logoFile, setLogoFile] = useState(null);
  const [logoApercuUrl, setLogoApercuUrl] = useState("");

  // Add missing functions to prevent errors
  async function getAllTechnos() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos`);
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur de Status de la réponse du fetch getAllTechno : ${data.message}`);
      setAllTechnos(data.data);
      console.log("getAllTechnos success");
    } catch (e) {
      console.log(`CatchErreur front dans getAllTechno : ${e.message}`);
    }
  }

  async function updateTechno(e) {
    e.preventDefault(e);
    const formData = new FormData();
    formData.append("techno", techno);
    formData.append("categorie", categorie);
    formData.append("level", level);
    formData.append("logo", logoFile);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos/${technoIdToUpdate}`, {
        method: "PUT",
        body: formData,
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur de Status de la réponse du fetch updateTechno : ${data.message}`);
      setTechno("");
      setLevel("");
      setLogoApercuUrl("");
      setLogoFile("")
      setCategorie("");
      getAllTechnos();
      setUpdateMode(false)
    } catch (e) {
      console.log(`CatchErreur front dans getTechno : ${e.message}`);
    }
  }

  async function getTechno(techno) {
    try {
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos/${techno._id}`)
      // const data = await response.json()
      // if(!response.ok) return console.log(`Erreur de Status de la réponse du fetch getTechno : ${data.message}`);
      setTechno(techno.techno);
      setCategorie(techno.categorie);
      setLevel(techno.level);
      setLogoApercuUrl(`${import.meta.env.VITE_API_URL}/${techno.logo}`);
      setLogoFile(techno.logo)
      setUpdateMode(true);
      setTechnoIdToUpdate(techno._id);
    } catch (e) {
      console.log(`CatchErreur front dans getTechno : ${e.message}`);
    }
  }

  async function deleteTechno(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur de Status de la réponse du fetch deleteTechno : ${data.message}`);
      getAllTechnos();
    } catch (e) {
      console.log(`CatchErreur front dans getAllTechno : ${e.message}`);
    }
  }

  async function addSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("techno", techno);
    formData.append("categorie", categorie);
    formData.append("level", level);
    formData.append("logo", logoFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur dans fetch addSubmit : ${data.message}`);
      console.log("add techno success");
      setTechno("");
      setLevel("");
      setLogoApercuUrl("");
      setCategorie("");
      getAllTechnos();
    } catch (e) {
      console.log(`Erreur dans addSubmit : ${e.message}`);
    }
  }

  useEffect(() => {
    getAllTechnos();
  }, []);

  return (
    <div id="technoContainer">
      <form onSubmit={updateMode ? updateTechno : addSubmit} id="technoForm">
        {/* Champ competence */}
        <input
          value={techno}
          onChange={(e) => setTechno(e.target.value)}
          className="input w-full"
          type="text"
          placeholder="Entrez la compétence"
          required
        />

        {/* Champ logo */}
        <div id="logo_row">
          <label htmlFor="logo">
            <FaFileDownload size={40} color="gray" />
          </label>
          <input
            id="logo"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              setLogoFile(e.target.files[0]);
              const objectUrl = URL.createObjectURL(e.target.files[0]);
              setLogoApercuUrl(objectUrl);
            }}
          />
          <div id="logo_container">
            <img src={logoApercuUrl ? logoApercuUrl : apercuDefault} alt="Image représentant la techno" />
          </div>
        </div>

        {/* Champ categorie */}
        <select onChange={(e) => setCategorie(e.target.value)} value={categorie}>
          <option value="" disabled>
            --Categorie--
          </option>
          <option value="Langage / Framework">Langage / Framework</option>
          <option value="Outil de développement">Outil de développement</option>
          <option value="Design / Organisation">Organisation / Design</option>
        </select>

        {/* Champ level */}
        <select onChange={(e) => setLevel(e.target.value)} value={level}>
          <option value="" disabled>
            --Niveau--
          </option>
          <option value="Debutant">Débutant</option>
          <option value="Maitrise">Maitrise</option>
          <option value="Expertise">Expertise</option>
        </select>

        {/* Boutton soummission */}
        <button className="btn">{updateMode ? "Update" : "Add"}</button>
      </form>

      {/* Listing des compétences déjà enregistré dans la bdd */}
      <div id="technoList">
        {allTechnos.map((item) => (
          <Item
            key={item._id}
            item={item}
            element={item.techno}
            updateElement={getTechno}
            deleteElement={deleteTechno}
          />
        ))}
      </div>
    </div>
  );
}
