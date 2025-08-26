import "./techno.scss";
import { useState, useEffect } from "react";
import { FaFileDownload } from "react-icons/fa";
import apercuDefault from "../../../../assets/noImage.jpg";
import Item from "../../components/Item/Item";

export default function Techno() {
  const [updateMode, setUpdateMode] = useState(false);
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [niveau, setNiveau] = useState("");
  const [allTechnos, setAllTechnos] = useState([]);
  const [technoIdToUpdate, setTechnoIdToUpdate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageApercuUrl, setImageApercuUrl] = useState("");
  const [alt_img, setAlt_img] = useState("");

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
    formData.append("titre", titre);
    formData.append("categorie", categorie);
    formData.append("niveau", niveau);
    formData.append("image", imageFile);
    formData.append("alt_img", alt_img);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos/${technoIdToUpdate}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur de Status de la réponse du fetch updateTechno : ${data.message}`);
      setTitre("");
      setNiveau("");
      setImageApercuUrl("");
      setImageFile("");
      setCategorie("");
      getAllTechnos();
      setUpdateMode(false);
    } catch (e) {
      console.log(`CatchErreur front dans getTechno : ${e.message}`);
    }
  }

  async function getTechno(techno) {
    try {
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos/${techno._id}`)
      // const data = await response.json()
      // if(!response.ok) return console.log(`Erreur de Status de la réponse du fetch getTechno : ${data.message}`);
      setTitre(techno.titre);
      setCategorie(techno.categorie);
      setNiveau(techno.niveau);
      setImageApercuUrl(`${import.meta.env.VITE_API_URL}/${techno.image}`);
      setImageFile(techno.image);
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
        credentials: "include",
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
    formData.append("titre", titre);
    formData.append("categorie", categorie);
    formData.append("niveau", niveau);
    formData.append("image", imageFile);
    formData.append("alt_img", alt_img);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/edition/technos`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) return console.log(`Erreur dans fetch addSubmit : ${data.message}`);
      console.log("add techno success");
      setTitre("");
      setNiveau("");
      setImageApercuUrl("");
      setAlt_img("");
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
        {/* Champ titre */}
        <input
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="input w-full"
          type="text"
          placeholder="Entrez la compétence"
          required
        />

        {/* Champ image */}
        <div id="image_row">
          <label htmlFor="image">
            <FaFileDownload size={40} color="gray" />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              const objectUrl = URL.createObjectURL(e.target.files[0]);
              setImageApercuUrl(objectUrl);
            }}
          />
          <div id="image_container">
            <img src={imageApercuUrl ? imageApercuUrl : apercuDefault} alt="Image représentant la techno" />
          </div>
        </div>

        {/* Champ alt_img */}
        <input
          type="text"
          value={alt_img}
          onChange={(e) => setAlt_img(e.target.value)}
          placeholder="Description de l'image"
          className="input w-full"
          required
        />

        {/* Champ categorie */}
        <select onChange={(e) => setCategorie(e.target.value)} value={categorie}>
          <option value="" disabled>
            --Categorie--
          </option>
          <option value="Langage / Framework">Langage / Framework</option>
          <option value="Outil de développement">Outil de développement</option>
          <option value="Design / Organisation">Organisation / Design</option>
        </select>

        {/* Champ niveau */}
        <select onChange={(e) => setNiveau(e.target.value)} value={niveau}>
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
